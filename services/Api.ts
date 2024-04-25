import { AuthResponse } from 'store/types';
import camelcaseKeys from 'camelcase-keys';
import { omit } from 'lodash';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const UNAUTHORISED_KEY = 'UNAUTHORISED_KEY';

class Api {
  baseUrl: string;
  reconnectAuthUrl: string;
  AuthorizationToken: null | string = null;
  abortControllers: { [key: string]: AbortController } = {};

  constructor(apiHost: string, reconnectAuthUrl: string) {
    this.baseUrl = apiHost;
    this.reconnectAuthUrl = reconnectAuthUrl;

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.setTokens({ accessToken });
    }

    this.addBearerTokenToRequest();
  }

  addBearerTokenToRequest() {
    axios.interceptors.request.use(
      config => {
        if (this.AuthorizationToken) {
          config.headers.Authorization = `Bearer ${this.AuthorizationToken}`;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  private cleanTokens = () => {
    this.setTokens({ accessToken: null });
    localStorage.removeItem('accessToken');
  };

  private createSignal(signalKey?: string) {
    if (signalKey) {
      const controller = new AbortController();
      const signal = controller.signal;

      this.abortControllers[signalKey] = controller;

      return signal;
    }
  }

  public abortController(signalKey: string) {
    const abortController = this.abortControllers[signalKey];

    abortController?.abort();
    omit(this.abortControllers, signalKey);
  }

  private options({ contentType, signalKey }: { contentType?: string; signalKey?: string } = {}) {
    if (signalKey) {
      this.createSignal(signalKey);
    }

    const headers = {
      'Content-Type': contentType || 'application/json'
    };

    return { headers: headers, signal: this.createSignal(signalKey) };
  }

  public auth(url: string, body: { login: string; password: string }) {
    return this.post<AuthResponse, { login: string; password: string }>(url, body).then(
      ({ accessToken, ...userData }) => {
        this.setTokens({ accessToken });

        return userData;
      }
    );
  }

  private handleResponse = (response: AxiosResponse) => {
    if (response.data) {
      return camelcaseKeys(response.data);
    }

    return response.data;
  };

  private handleError = async (error: AxiosError<{ message: string }>) => {
    if (error.response?.status === 401) {
      this.cleanTokens();

      return Promise.reject(UNAUTHORISED_KEY);
    }
    console.log(error.response);

    return Promise.reject(error.response?.data?.message || error.response?.data || error.message || error);
  };

  private removeSignalKey = (signalKey?: string) => {
    if (signalKey) {
      omit(this.abortControllers, signalKey);
    }
  };

  get<T>(url: string, signalKey?: string) {
    return (
      axios
        .get<T>(`${this.baseUrl}/${url}`, this.options({ signalKey }))
        .then(this.handleResponse)
        .catch(this.handleError)

        // @ts-ignore
        .finally((data: T | Error) => {
          this.removeSignalKey(signalKey);

          return data;
        })
    );
  }

  post<Resp, Body>(url: string, body: Body, { contentType }: { contentType?: string } = {}) {
    return axios
      .post<Resp>(`${this.baseUrl}/${url}`, body, this.options({ contentType }))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  put<Resp, Body>(url: string, body: Body, { contentType }: { contentType?: string } = {}) {
    return axios
      .put<Resp>(`${this.baseUrl}/${url}`, body, this.options({ contentType }))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  patch<Resp, Body>(url: string, body: Body, { contentType }: { contentType?: string } = {}) {
    return axios
      .patch<Resp>(`${this.baseUrl}/${url}`, body, this.options({ contentType }))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delete<Resp>(url: string, { contentType }: { contentType?: string } = {}) {
    return axios
      .delete<Resp>(`${this.baseUrl}/${url}`, this.options({ contentType }))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  setTokens = ({ accessToken }: { accessToken: string | null }) => {
    this.AuthorizationToken = accessToken;
    localStorage.setItem('accessToken', accessToken || '');

    return { accessToken };
  };
}

export default Api;
