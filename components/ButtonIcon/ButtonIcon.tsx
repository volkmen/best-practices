import React from 'react';
import Button, { ButtonProps } from '../Button';

import './ButtonIcon.scss';

const ButtonIcon: React.FC<ButtonProps> = ({ className, ...props }) => (
  <Button {...props} className={`button-icon size-${props.size} ${className}`} />
);

export default ButtonIcon;
