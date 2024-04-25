import React, { ReactElement } from 'react';
import RCTooltip from 'rc-tooltip';
import { isString } from 'lodash';

import './Tolltip.scss';
import classNames from 'classnames';
import Text, { TextColor, TextSize } from '../Text';

export type Placement =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'rightTop'
  | 'rightBottom'
  | 'leftTop'
  | 'leftBottom';

interface TooltipProps {
  placement?: Placement;
  children?: ReactElement;
  overlay: React.ReactNode;
  trigger?: 'click' | 'hover';
  visible?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  align?: {
    offset: [number, number];
  };
  mode?: 'hint';
  getTooltipContainer?: () => HTMLDivElement;
}

const Tooltip: React.FC<TooltipProps> = ({ children, overlay, placement = 'top', mode, ...rest }) => {
  const overlayElement = React.useMemo(
    () =>
      isString(overlay) ? (
        <Text size={TextSize.Sm} color={TextColor.Dark} className='tooltip-text text-center bg-light'>
          {overlay}
        </Text>
      ) : (
        overlay
      ),
    [overlay]
  );

  return (
    <RCTooltip
      overlay={overlayElement}
      placement={placement}
      overlayClassName={classNames('tooltip-overlay', { 'is-hint': mode === 'hint' })}
      destroyTooltipOnHide={true}
      showArrow={false}
      {...rest}
    >
      {children}
    </RCTooltip>
  );
};

export default Tooltip;
