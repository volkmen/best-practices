import React from 'react';
import { StyledComponent } from 'types';

import './Label.scss';

export enum LabelType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Success = 'success',
  Light = 'light',
  Transparent = 'transparent'
}

interface LabelProps extends StyledComponent {
  type: LabelType;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, className, style, type }) => (
  <div className={`label color-${type} ${className}`} style={style}>
    {children}
  </div>
);

export default Label;
