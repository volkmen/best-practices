import React from 'react';
import TextResourceContext from 'contexts/TextResource';
import { StyledComponent } from 'types';
import Text, { TextColor } from '../Text';

const LocalizationSwitcher: React.FC<StyledComponent> = ({ className }) => {
  const { language, availableLanguages, getTextResourceByKey, setLocalLanguage } =
    React.useContext(TextResourceContext);

  return (
    <div className={`d-flex gap-3 ${className}`}>
      {availableLanguages.map(lang => (
        <Text
          key={lang}
          className='cursor-pointer'
          onClick={() => setLocalLanguage(lang)}
          color={language === lang ? TextColor.Success : TextColor.HalfLight}
        >
          {getTextResourceByKey(lang)}
        </Text>
      ))}
    </div>
  );
};

export default LocalizationSwitcher;
