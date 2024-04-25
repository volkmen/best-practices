import React from 'react';
import { CanvasContext } from 'contexts/CanvasContext';
import { throttle } from 'lodash';

interface HtmlSpectrumDraggingProps {
  onUpdateX: (deltaPx: number) => void;
  onScaleUp: () => void;
  onScaleDown: () => void;
  padStart: number;
  padBottom: number;
}

const HtmlSpectrumDragging: React.FC<HtmlSpectrumDraggingProps> = ({
  onUpdateX,
  onScaleUp,
  onScaleDown,
  padStart = 0,
  padBottom = 0
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const prevPointRef = React.useRef<number | null>(null);
  const { bounds } = React.useContext(CanvasContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    setIsActive(true);
    prevPointRef.current = e.clientX;
  }, []);

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (isActive && prevPointRef.current) {
        const difference = e.clientX - prevPointRef.current;

        prevPointRef.current = e.clientX;
        onUpdateX(difference);
      }
    },
    [isActive, prevPointRef.current, onUpdateX]
  );

  const onMouseUp = React.useCallback(() => {
    setIsActive(false);
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const scrollCallback = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          throttleUpdate(e);

          return false;
        }
      };

      const throttleUpdate = throttle((e: WheelEvent) => {
        if (e.deltaY === 0) {
          return;
        }
        e.deltaY < 0 ? onScaleDown() : onScaleUp();
      }, 100);

      ref.current.addEventListener('wheel', e => scrollCallback(e), { passive: false, capture: true });

      return ref.current?.removeEventListener('wheel', scrollCallback);
    }
  }, [onScaleUp, onScaleDown]);

  return (
    <div
      ref={ref}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      className='p-absolute'
      style={{ marginLeft: `${padStart}px`, width: bounds.width - padStart, height: bounds.height - padBottom }}
    />
  );
};

export default HtmlSpectrumDragging;
