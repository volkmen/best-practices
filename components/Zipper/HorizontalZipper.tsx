import React, { CSSProperties } from 'react';
import './Zipper.scss';
import classNames from 'classnames';
import { StyledComponent } from '../../types';

interface HorizontalZipperProps extends StyledComponent {
  zipperSt: number;
  switcherStyle: CSSProperties;
}

const HorizontalZipper: React.FC<HorizontalZipperProps> = ({ className, switcherStyle }) => (
  <div className={classNames('horizontal-zipper', className)}>
    <div className='horizontal-zipper__switcher' style={switcherStyle} />
  </div>
);

export default HorizontalZipper;
