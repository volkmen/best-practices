import React from 'react';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import './Separator.scss';

interface SeparatorProps extends StyledComponent {
  color?: 'white' | 'light-gray' | 'gray';
}
const Separator: React.FC<SeparatorProps> = ({ className, color = 'light-gray' }) => (
  <div className={classNames('separator', className, { [`color__${color}`]: color })} />
);

export default Separator;
