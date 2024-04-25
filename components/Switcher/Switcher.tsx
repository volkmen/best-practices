import React from 'react';
import classNames from 'classnames';
import { StyledComponent } from 'types';

import './Switcher.scss';

interface SwitcherProps extends StyledComponent {
  variants: [string, string];
  variant: string;
  setVariant: (variant: string) => void;
}

const Switcher: React.FC<SwitcherProps> = ({ variant, variants, setVariant, className }) => {
  const onClick = React.useCallback(
    (variantL: string) => () => {
      setVariant(variantL);
    },
    []
  );

  return (
    <div className={classNames('switcher', { active: variant === variants[1] }, className)}>
      <div className='switcher__runner' />
      <div className='switcher__wrap h-100'>
        {variants.map((variantIterator, i) => (
          <div
            key={variantIterator}
            className={classNames('switcher__item', { 'switcher-active': variant === variantIterator })}
            onClick={onClick(variantIterator)}
            tabIndex={i}
            role='button'
          >
            {variantIterator}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Switcher;
