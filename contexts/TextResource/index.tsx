import React from 'react';
import localizationResources from './resources.json';
import config from 'config.json';
import LocalizedStrings, { LocalizedStrings as LocalizedStringsType } from 'react-localization';
import { LocalizationLanguage } from 'types';
import { useSelector } from 'react-redux';
import { getAuthData } from 'store/authReducer';

interface TextResourceContextProps {
  getTextResourceByKey: (key: string, params?: object) => React.ReactNode | null;
  language: string;
  setLocalLanguage: (lang: string) => void;
  availableLanguages: LocalizationLanguage[];
}
const setLocalStorageLanguage = (lang: string) => {
  localStorage.setItem('language', lang);
};

const TextResourceContext = React.createContext<TextResourceContextProps>({
  getTextResourceByKey: () => null,
  language: 'en',
  setLocalLanguage: setLocalStorageLanguage,
  availableLanguages: []
});

interface TextResourceProviderProps {
  children: React.ReactNode;
}

const localizedString: LocalizedStringsType<any> = new LocalizedStrings(localizationResources);

export const getLocalizedTextValue = (key: string, params?: object) => {
  if (localizedString) {
    const localizedValue = localizedString[key] || key;

    return !params ? localizedValue : localizedString.formatString(localizedValue, params);
  }
};

function getDefaultLanguage() {
  return localStorage.getItem('language') || (config.defaultLanguage as LocalizationLanguage);
}

export const TextResourceProvider: React.FC<TextResourceProviderProps> = ({ children }) => {
  const authData = useSelector(getAuthData);
  const language = authData?.language;
  const [localLanguage, setLocalLanguage] = React.useState<string>(getDefaultLanguage());

  const updateLanguage = React.useCallback((lang: string) => {
    setLocalLanguage(lang);
    localizedString?.setLanguage(lang);
    setLocalStorageLanguage(lang);
  }, []);

  React.useEffect(() => {
    if (language) {
      updateLanguage(language);
      document.title = getTextResourceByKey('documentTitle');
    }
  }, [language]);

  const getTextResourceByKey = React.useCallback(getLocalizedTextValue, [localLanguage]);

  const memoValue = React.useMemo(
    () => ({
      getTextResourceByKey,
      language: localLanguage,
      setLocalLanguage: updateLanguage,
      availableLanguages: config.availableLanguages as LocalizationLanguage[]
    }),
    [getTextResourceByKey, config, localLanguage]
  );

  return <TextResourceContext.Provider value={memoValue}>{children}</TextResourceContext.Provider>;
};

export default TextResourceContext;
