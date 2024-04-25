import React from 'react';

import MenuCheckBoxes, { MenuDropdownCheckBoxesProps } from './MenuCheckBoxes';
import { useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames';

interface MenuDropdownCheckBoxesDropdownProps extends MenuDropdownCheckBoxesProps {
  onClose: () => void;
  theme?: 'light' | 'dark';
}

const MenuDropdownCheckBoxes: React.FC<MenuDropdownCheckBoxesDropdownProps> = ({ theme, onClose, ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);

  return (
    <div className={classNames('multi-select__menu', `theme-${theme}`)} ref={ref}>
      <MenuCheckBoxes {...props} theme='light' />
    </div>
  );
};

export default MenuDropdownCheckBoxes;
