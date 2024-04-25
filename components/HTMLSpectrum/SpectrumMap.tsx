import React from 'react';
import classNames from 'classnames';
import { StyledComponent } from 'types';

import './HTMLSpectrum.scss';

interface HorizontalZipperProps extends StyledComponent {
  children: React.ReactNode;
  onSetPosition: (valInPercents: number) => void;
  zipperWidth: number; // in percents,
  zipperPosition: number; // in percents,
}

const SpectrumMap: React.FC<HorizontalZipperProps> = ({
  className,
  zipperWidth,
  zipperPosition = 50,
  children,
  onSetPosition
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onClickMap = React.useCallback(
    (e: React.MouseEvent) => {
      if (containerRef.current) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        let xRelativePosition = ((e.clientX - left) / width) * 100;
        const minimum = zipperWidth / 2;
        const maximum = 100 - zipperWidth / 2;

        if (xRelativePosition < minimum) {
          xRelativePosition = minimum;
        } else if (xRelativePosition > maximum) {
          xRelativePosition = maximum;
        }

        onSetPosition(Math.round(xRelativePosition)); // in percents
      }
    },
    [onSetPosition, zipperWidth]
  );

  return (
    <div ref={containerRef} className={classNames('spectrum-map', className)} onClick={onClickMap}>
      <div className='spectrum-map__switcher' style={{ width: `${zipperWidth}%`, left: `${zipperPosition}%` }} />
      {children}
    </div>
  );
};

export default SpectrumMap;
