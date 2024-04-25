import React from 'react';
import Text, { Display, TextProps } from './Text';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

import './Text.scss';

interface TextWithIconProps extends TextProps {
  icon: string;
}

const TextWithIcon: React.FC<TextWithIconProps> = ({ children, icon, ...rest }) => (
  <div className='d-flex align-items-center'>
    <ReactSVG
      src={`${process.env.PUBLIC_URL}/text-icons/${icon}.svg`}
      className={classNames(
        'text-icon',
        rest.size && `icon-size-${rest.size}`,
        rest.color && `text-color-${rest.color}`,
        rest.size === 'small' ? 'mr-1' : 'mr-2'
      )}
    />
    <Text {...rest} display={Display.Inline} className='mb-0'>
      {children}
    </Text>
  </div>
);

export default TextWithIcon;
