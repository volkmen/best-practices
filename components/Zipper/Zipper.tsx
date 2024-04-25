import React from 'react';
import './Zipper.scss';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import { throttle } from 'lodash';

interface ZipperProps extends StyledComponent {
  initialPosition: number;
  onChange: (val: number) => void;
}

const Zipper: React.FC<ZipperProps> = ({ className, initialPosition = 0, onChange }) => {
  const [isMoving, setIsMoving] = React.useState(false);
  const [switcherPosition, setSwitcherPosition] = React.useState<number | null>(initialPosition);
  const refContainer = React.useRef<HTMLDivElement>(null);

  const onMouseDown = React.useCallback(() => {
    setIsMoving(true);
  }, [refContainer.current]);

  const onMouseUp = React.useCallback(() => {
    setIsMoving(false);
  }, []);

  const onUpdatePosition = React.useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const element = e.target as HTMLDivElement;

      if (refContainer.current && element) {
        const containerBounds = refContainer.current.getBoundingClientRect();

        const minValue = containerBounds.top;
        const maxValue = containerBounds.top + containerBounds.height;

        let positionYInPercents = ((e.clientY - minValue) / (maxValue - minValue)) * 100;

        if (positionYInPercents < 0) {
          positionYInPercents = 0;
        } else if (positionYInPercents > 100) {
          positionYInPercents = 100;
        }

        const percent = 100 - positionYInPercents;

        setSwitcherPosition(percent);
        onChange(percent / 100);
      }
    }, 50),
    []
  );

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMoving) {
        return;
      }
      onUpdatePosition(e);
    },
    [isMoving]
  );

  return (
    <div
      className={classNames('zipper', className)}
      ref={refContainer}
      onClick={onUpdatePosition}
      onMouseMove={onMouseMove}
    >
      <div
        className='zipper__switcher'
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseUp={onMouseUp}
        style={{ bottom: `${switcherPosition}%` }}
      />
    </div>
  );
};

export default Zipper;
