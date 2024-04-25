import React from 'react';
import classNames from 'classnames';
import './HTMLBarChart.scss';
import { StyledComponent } from 'types';
import Tooltip from '../Tooltip';

export enum BarColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success'
}

interface BarProps extends StyledComponent {
  height: string;
  width?: string;
  label?: string | React.ReactNode;
  bottomLabel?: string | React.ReactNode;
  withAnimation?: boolean;
  xAxisValue?: string | number;
  color?: BarColor;
  tooltipBody?: string | React.ReactNode;
}

const Bar: React.FC<BarProps> = ({
  height,
  width,
  label,
  color = BarColor.Primary,
  withAnimation,
  xAxisValue,
  className,
  bottomLabel,
  tooltipBody
}) => {
  const [inited, setInited] = React.useState(!withAnimation);

  React.useEffect(() => {
    setInited(true);
  }, []);

  const TooltipWrapper = tooltipBody
    ? Tooltip
    : ({ children }: { children: React.ReactNode }) => <React.Fragment>{children}</React.Fragment>;

  const parsedWidth = width ? +width.replace('px', '') : undefined;

  return (
    <TooltipWrapper overlay={tooltipBody} mouseEnterDelay={1} trigger='click'>
      <div
        className={classNames('html-bar-graphic__chart__item', className, color && `color-${color}`, {
          animated: inited
        })}
        style={{ maxHeight: height, width }}
      >
        <span
          className={classNames('html-bar-graphic__chart__item__value', {
            'rotate-90': parsedWidth && parsedWidth < 30
          })}
        >
          {label}
        </span>
        {xAxisValue && <span className='html-bar-graphic__chart__item__x-axis'>{xAxisValue}</span>}
        {bottomLabel && (
          <span
            className={classNames('html-bar-graphic__chart__item__bottom-label', {
              'rotate-90': parsedWidth && parsedWidth < 30
            })}
          >
            {bottomLabel}
          </span>
        )}
      </div>
    </TooltipWrapper>
  );
};

export default Bar;
