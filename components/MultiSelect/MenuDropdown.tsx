import React from 'react';
import Text, { TextColor, TextSize } from '../Text';
import './MultiSelect.scss';
import { useOnClickOutside } from 'usehooks-ts';
import { Option } from './types';
import { noop } from 'lodash';
import classNames from 'classnames';

interface MenuDropdownProps {
  options: Option[];
  onSelect?: (option: Option) => void;
  emptyPlaceHolder?: string;
  onClose?: () => void;
  theme?: 'dark' | 'light';
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  options,
  onSelect,
  emptyPlaceHolder = 'empty',
  onClose,
  theme
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onSelectOption = (option: Option) => () => {
    onSelect?.(option);
    option.onClick?.();
  };

  useOnClickOutside(ref, onClose || noop);

  return (
    <div className={classNames('multi-select__menu', `theme-${theme}`)} ref={ref}>
      {options.length > 0 ? (
        options.map(option => (
          <div className='multi-select__menu__item' key={option.value} onClick={onSelectOption(option)}>
            {option.label}
          </div>
        ))
      ) : (
        <Text size={TextSize.Sm} color={TextColor.HalfLight}>
          {emptyPlaceHolder}
        </Text>
      )}
    </div>
  );
};

export default MenuDropdown;
