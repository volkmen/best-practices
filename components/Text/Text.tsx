import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { StyledComponent } from 'types';

import './Text.scss';

export enum TextSize {
  XXs = 'extra-small',
  XSm = 'x-small',
  Sm = 'small',
  SmMd = 'small-medium',
  Md = 'medium',
  MdLg = 'medium-large',
  Lg = 'large',
  Hg = 'huge',
  ExtraHg = 'extra-huge',
  Default = 'default'
}

export enum TextColor {
  White = 'white',
  Light = 'light',
  HalfLight = 'half-light',
  Gray = 'gray',
  Success = 'success',
  Primary = 'primary',
  Danger = 'danger',
  Dark = 'dark',
  Orange = 'orange',
  Silver = 'silver',
  Warning = 'warning',
  Inherit = 'inherit'
}

export enum Display {
  Block = 'block',
  Inline = 'inline',
  InlineBlock = 'inline-block'
}

export interface TextProps extends StyledComponent, HTMLAttributes<HTMLElement> {
  display?: Display;
  size?: TextSize;
  color?: TextColor;
  children?: React.ReactNode;
  relative?: boolean;
}

const Text: React.FC<TextProps> = ({
  size = TextSize.Default,
  color = TextColor.Gray,
  display = Display.Block,
  children,
  className,
  onClick,
  relative = true,
  ...rest
}) => (
  <span
    className={classNames(relative && 'relative', 'text', `size-${size}`, `text-color-${color}`, className)}
    onClick={onClick}
    {...rest}
  >
    {children}
  </span>
);

export default React.memo(Text);
