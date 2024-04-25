import React from 'react';
import './Spinner.scss';
import classNames from 'classnames';
import { StyledComponent } from 'types';

interface SpinnerProps extends StyledComponent {
  isFullSize?: boolean;
  size?: {
    width: number;
    height: number;
  };
}

const Spinner: React.FC<SpinnerProps> = ({ isFullSize, className, style }) => (
  <div className={classNames('spinner', { 'spinner-full-size': isFullSize }, className)} style={style}>
    <div className={classNames('lds-roller')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
