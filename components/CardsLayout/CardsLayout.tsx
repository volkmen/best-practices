import React, { HTMLAttributes } from 'react';
import { StyledComponent } from 'types';
import classNames from 'classnames';

import './CardsLayout.scss';

interface CardsLayoutProps extends StyledComponent, HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cardMinWidth?: string;
}

const CardsLayout: React.FC<CardsLayoutProps> = ({ children, className, cardMinWidth = '150px', ...rest }) => (
  <div
    style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${cardMinWidth}, auto))` }}
    className={classNames('cards-layout', className)}
    {...rest}
  >
    {children}
  </div>
);

export default CardsLayout;
