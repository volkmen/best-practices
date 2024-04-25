import React from 'react';
import { ReactSVG } from 'react-svg';
import './IconSVG.scss';
import classNames from 'classnames';
import { StyledComponent } from 'types';

interface IconSvgProps extends StyledComponent {
  icon: string;
  size?: 'small' | 'medium' | 'large' | 'x-large';
  fontSize?: string;
  color?: string;
}

const IconSvg: React.FC<IconSvgProps> = ({ icon, size, fontSize, className, color }) => (
  <ReactSVG
    src={`${process.env.PUBLIC_URL}/text-icons/${icon}.svg`}
    className={classNames(
      'icon-svg d-flex justify-content-center',
      className,
      size && `icon-size-${size}`,
      fontSize && `icon-font-size-${fontSize}`,
      color && `text-color-${color}`
    )}
  />
);

export default IconSvg;
