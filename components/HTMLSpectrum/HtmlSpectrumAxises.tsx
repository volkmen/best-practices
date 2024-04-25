import React from 'react';
import { CanvasContext } from 'contexts/CanvasContext';

interface HtmlSpectrumAxisesProps {
  xShift: number;
  yShift: number;
}

const HtmlSpectrumAxises: React.FC<HtmlSpectrumAxisesProps> = ({ xShift, yShift }) => {
  const { ctx, bounds } = React.useContext(CanvasContext);
  const { width: canvasWidth, height: canvasHeight } = bounds;

  const drawAxises = React.useCallback(() => {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(xShift, 0);
      ctx.lineTo(xShift, canvasHeight - yShift);
      ctx.moveTo(xShift, canvasHeight - yShift);
      ctx.lineTo(canvasWidth, canvasHeight - yShift);
      ctx.stroke();
    }
  }, [ctx, canvasWidth, canvasHeight, xShift, yShift]);

  React.useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, xShift, canvasHeight - yShift);
      ctx.clearRect(xShift, canvasHeight - yShift, canvasWidth - xShift, yShift);
      drawAxises();
    }
  }, [ctx, drawAxises]);

  return null;
};

export default HtmlSpectrumAxises;
