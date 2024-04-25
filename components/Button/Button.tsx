import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import SmallLoader from '../SmallLoader';
import './Button.scss';
import { ReactSVG } from 'react-svg';

export enum ButtonType {
  Primary = 'primary',
  Warning = 'warning',
  Secondary = 'secondary',
  Danger = 'danger',
  Success = 'success',
  Dark = 'dark',
  Light = 'light',
  Transparent = 'transparent'
}

export enum ButtonMode {
  Regular = 'regular',
  Outline = 'outline'
}

export enum ButtonSize {
  Small = 'small',
  SmallMedium = 'small-medium',
  Medium = 'medium',
  Large = 'large'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  mode?: ButtonMode;
  size?: ButtonSize;
  iconSize?: 'small' | 'small-medium' | 'medium' | 'large';
  loading?: boolean;
  icon?: string;
  reactIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonType = ButtonType.Primary,
  size = ButtonSize.Medium,
  iconSize,
  className,
  disabled,
  loading,
  icon,
  reactIcon,
  ...atrs
}) => (
  <button
    className={classNames(`button color-${buttonType} size-${size} ${className}`, { disabled })}
    disabled={disabled}
    {...atrs}
  >
    {loading && (
      <span className='button__loader-container cursor-none'>
        <SmallLoader />
      </span>
    )}
    {
      <div className={classNames('d-flex align-items-center w-100', { transparent: loading })}>
        {reactIcon}
        {icon && (
          <ReactSVG
            src={`${process.env.PUBLIC_URL}/text-icons/${icon}.svg`}
            className={classNames(
              'mr-2 button__icon',
              iconSize && `icon-size-${iconSize}`,
              !iconSize && size && `icon-font-size-${size}`
            )}
          />
        )}
        {children}
      </div>
    }
  </button>
);

export default Button;
