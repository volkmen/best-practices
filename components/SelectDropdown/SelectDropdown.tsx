import React from 'react';
import classNames from 'classnames';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import { StyledComponent } from 'types';
import './SelectDropdown.scss';

interface DropdownProps extends StyledComponent, ReactDropdownProps {}

const SelectDropdown: React.FC<DropdownProps> = ({ className, ...props }) => (
  <ReactDropdown
    {...props}
    controlClassName='select-dropdown__control'
    menuClassName='select-dropdown__menu'
    className={classNames('select-dropdown', className)}
  />
);

export default React.memo(SelectDropdown);
