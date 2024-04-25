import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import './Card.scss';

interface CardV2Props extends PropsWithChildren, StyledComponent, HTMLAttributes<HTMLDivElement> {
  rightBar?: React.ReactElement;
  leftBar?: React.ReactElement;
  topBar?: React.ReactElement;
  bottomBar?: React.ReactElement;
  bodyClassName?: string;
}

const Card: React.FC<CardV2Props> = ({
  className,
  children,
  rightBar,
  leftBar,
  topBar,
  bottomBar,
  bodyClassName,
  ...attr
}) => (
  <div
    className={classNames(
      'card-2 relative m-2',
      (rightBar || leftBar) && 'flex',
      (topBar || bottomBar) && 'flex-column',
      className
    )}
    {...attr}
  >
    {topBar}
    {leftBar}
    <div className={classNames(bodyClassName, 'p-1 w-100 h-100')}>{children}</div>
    {rightBar}
    {bottomBar}
  </div>
);

export default Card;
