import React from 'react';
import { CanvasContext } from 'contexts/CanvasContext';

interface HtmlSpectrumBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const HtmlSpectrumBar: React.FC<HtmlSpectrumBarProps> = ({ x, y, width, height }) => {
  const { ctx } = React.useContext(CanvasContext);

  React.useMemo(() => {
    if (ctx) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fill();
      ctx.stroke();
    }
  }, [ctx]);

  return null;
};

export default HtmlSpectrumBar;
