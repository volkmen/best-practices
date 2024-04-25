import React from 'react';
import MenuDropdown from '../MultiSelect/MenuDropdown';
import RCTooltip from 'rc-tooltip';
import TextResourceContext from 'contexts/TextResource';
import { useDispatch } from 'react-redux';
import { updateSettings } from 'store/authReducer';
import { LocalizationLanguage } from 'types';
import { Option } from '../MultiSelect/types';
import { AppDispatch } from 'store/types';
import { FaCheck } from 'react-icons/fa6';
import { COLORS } from 'consts';

const DropdownLabel: React.FC<{ label: React.ReactNode; isSelected: boolean }> = ({ label, isSelected }) => (
  <span className='d-inline-flex align-items-center'>
    {isSelected && <FaCheck className='mr-2' color={COLORS.success} />}
    <span>{label}</span>
  </span>
);

const ChangeLanguage = () => {
  const { getTextResourceByKey, language } = React.useContext(TextResourceContext);
  const dispatch = useDispatch() as AppDispatch;

  const onSelectLanguage = (option: Option) => {
    dispatch(updateSettings({ language: option.value as string }));
  };

  const overlay = (
    <MenuDropdown
      theme='light'
      options={[
        {
          value: LocalizationLanguage.English,
          label: (
            <DropdownLabel
              label={getTextResourceByKey('English')}
              isSelected={language === LocalizationLanguage.English}
            />
          )
        },
        {
          value: LocalizationLanguage.Ukrainian,
          label: (
            <DropdownLabel
              label={getTextResourceByKey('Ukrainian')}
              isSelected={language === LocalizationLanguage.Ukrainian}
            />
          )
        }
      ]}
      onSelect={onSelectLanguage}
    />
  );

  if (!language) {
    return null;
  }

  return (
    <div>
      <RCTooltip overlay={overlay} trigger='hover' align={{ offset: [12, 10] }} showArrow={false}>
        <div className='text-uppercase'>{getTextResourceByKey('language')}</div>
      </RCTooltip>
    </div>
  );
};

export default ChangeLanguage;
