import React from 'react';
import classNames from 'classnames';
import { StyledComponent } from 'types';
import './Dropdown.scss';

export interface DropdownItemProps extends StyledComponent {
  children: React.ReactNode;
  isTitle?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, className, onClick }) => (
  <div className={classNames('dropdown__item', className)} onClick={onClick}>
    {children}
  </div>
);

export default DropdownItem;
