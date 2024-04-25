import React from 'react';
import Text, { TextColor, TextSize } from '../Text';
import './MultiSelect.scss';
import { Option } from './types';
import Input from 'components/Input';
import TextResourceContext from 'contexts/TextResource';
import { noop } from 'lodash';

export interface MenuDropdownCheckBoxesProps {
  options: Option[];
  onToggleCheckBox: (option: Option) => void;
  emptyPlaceHolder?: string;
  selectedOptionValues: (string | number)[];
  onClickAll?: () => void;
  theme?: 'dark' | 'light';
}

const MenuCheckBoxes: React.FC<MenuDropdownCheckBoxesProps> = ({
  options,
  onToggleCheckBox,
  emptyPlaceHolder = 'empty',
  selectedOptionValues,
  onClickAll
}) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const [searchOptions, setSearchOptions] = React.useState<Option[]>(options);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const withSearch = options[0]?.searchValue;

  const onSearchForOption = (value: string) => {
    if (value === '') {
      setSearchValue(value);
      setSearchOptions(options);

      return;
    }

    const valueLowercase = value.toString().toLowerCase();
    const filterOptions = options.filter(option => option?.searchValue?.toLowerCase().includes(valueLowercase));

    setSearchValue(value);
    setSearchOptions(filterOptions);
  };

  const onSelectOption = (option: Option) => () => {
    onToggleCheckBox(option);
  };

  return (
    <div>
      {searchOptions.length > 0 || options.length > 0 ? (
        <>
          {withSearch && (
            <Input
              value={searchValue}
              onSetValue={onSearchForOption}
              placeholder={getTextResourceByKey('search') as string}
              withEmptyStringValidation={false}
              className='mr-3'
            />
          )}
          {onClickAll && (
            <div className='flex multi-select__menu__item gap-2 cursor-pointer' onClick={onClickAll}>
              <input
                className={'multi-select__checkboxes__checked cursor-pointer'}
                type='checkbox'
                checked={selectedOptionValues.length === options.length}
                name='option'
                value='All'
                onChange={noop} // to avoid console warns
              />
              <Text className='d-block cursor-pointer'>
                <label className='cursor-pointer'>ALL</label>
              </Text>
            </div>
          )}
          {searchOptions.map(option => (
            <div
              className='flex multi-select__menu__item gap-2 cursor-pointer'
              key={option.value}
              onClick={onSelectOption(option)}
            >
              <input
                className={'multi-select__checkboxes__checked cursor-pointer'}
                type='checkbox'
                checked={selectedOptionValues.includes(option.value)}
                name='option'
                value={option.value}
                onChange={noop}
              />

              <Text className='d-block cursor-pointer'>
                <label className='cursor-pointer' key={option.value}>
                  {option.label}
                </label>
              </Text>
            </div>
          ))}
        </>
      ) : (
        <Text size={TextSize.Sm} color={TextColor.HalfLight}>
          {emptyPlaceHolder}
        </Text>
      )}
    </div>
  );
};

export default MenuCheckBoxes;
