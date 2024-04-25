import toaster, { Toaster as HotToaster, ToastOptions } from 'react-hot-toast';
import { ToastContainer, toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import TextResourceContext from 'contexts/TextResource';
import { isObject } from 'lodash';
import { COLORS } from 'consts';
import './Toaster.scss';
import { useSelector } from 'react-redux';
import { getCurrentUserLogin } from 'store/authReducer';
import ToastNotification from './ToastNotification';

const toasterOptions = {
  duration: 3000
};

export const MyToaster = () => {
  const userLoggedIn = useSelector(getCurrentUserLogin);

  if (!userLoggedIn) {
    return null;
  }

  return (
    <>
      <HotToaster toastOptions={toasterOptions} />
      <ToastContainer newestOnTop style={{ overflow: 'auto', maxHeight: '84vh', top: '8vh' }} />
    </>
  );
};

const getLocalizedString = (message: string, options?: object) => (): string => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);

  return (getTextResourceByKey(message, options) || message) as string;
};

export const toastSuccess = (message: string, { duration }: ToastOptions = {}) =>
  toaster.success(getLocalizedString(message), {
    duration,
    style: {
      fontSize: '14px'
    }
  });

export const toastError = (
  message: string | { message: string; options?: object },
  { duration }: ToastOptions = {}
) => {
  const parsedMsg = isObject(message) ? message.message : message;
  const parsedOptions = isObject(message) ? message.options : undefined;

  return toaster.error(getLocalizedString(parsedMsg, parsedOptions), {
    duration,
    style: {
      fontSize: '14px'
    }
  });
};

export const toastNotification = (
  messageData: {
    title: string;
    message: React.ReactNode;
    description?: React.ReactNode;
    type: 'success' | 'error';
    date?: string;
  },
  options: ToastOptions & { closeEnabled?: boolean; IconComponent?: React.ReactElement } = {}
) => {
  const { IconComponent, duration } = options;
  const date = messageData.date || new Date().toLocaleString();

  return toastify(
    <div className='position-relative'>
      <ToastNotification {...messageData} date={date} />
    </div>,
    {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: true,
      ...(IconComponent
        ? {
            icon: React.cloneElement(IconComponent, {
              size: 20,
              color: messageData.type === 'success' ? COLORS.success : COLORS.danger
            })
          }
        : {})
    }
  );
};
