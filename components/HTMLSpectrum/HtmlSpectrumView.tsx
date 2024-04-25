import React from 'react';
import { CanvasContext } from 'contexts/CanvasContext';

interface DataItem {
  xValue: number;
  yValue: number;
  minWidth: number;
  maxWidth: number;
  yValueExtra: number;
  overlay: React.ReactNode;
}

interface HtmlSpectrumViewProps {
  frequencies: DataItem[];
  minFrequency: number;
  maxFrequency: number;
  maxAmplitude: number;
  padLeft: number;
  padBottom: number;
}

const mainColor = 'rgba(255, 255, 255, 0.5)';

const HtmlSpectrumView: React.FC<HtmlSpectrumViewProps> = ({
  frequencies,
  minFrequency,
  maxFrequency,
  maxAmplitude,
  padLeft = 0,
  padBottom = 0
}) => {
  const { ctx, bounds } = React.useContext(CanvasContext);
  const { width: canvasWidth, height: canvasHeight } = bounds;
  const graphicWidth = canvasWidth - padLeft;
  const graphicHeight = canvasHeight - padBottom;

  const drawAxises = React.useCallback(() => {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(padLeft, 0);
      ctx.lineTo(padLeft, canvasHeight - padBottom);
      ctx.moveTo(padLeft, canvasHeight - padBottom);
      ctx.lineTo(canvasWidth, canvasHeight - padBottom);
      ctx.strokeStyle = mainColor;
      ctx.stroke();
    }
  }, [ctx, canvasWidth, canvasHeight, padLeft, padBottom]);

  const spectrumWidth = maxFrequency - minFrequency;
  const getXPosition = React.useCallback(
    (freq: number) => padLeft + ((freq - minFrequency) * graphicWidth) / spectrumWidth,
    [minFrequency, canvasWidth, spectrumWidth]
  );

  const getHeight = React.useCallback(
    (yValue: number) => (yValue / maxAmplitude) * graphicHeight,
    [maxAmplitude, graphicHeight]
  );

  const freq2Px = React.useCallback(
    (freq: number) => (graphicWidth / spectrumWidth) * freq,
    [spectrumWidth, graphicWidth]
  );

  const drawBars = React.useCallback(() => {
    if (ctx) {
      frequencies.forEach(frequencyItem => {
        ctx.beginPath();
        const x = getXPosition(frequencyItem.xValue);
        const height = getHeight(frequencyItem.yValue);
        const heightExtra = getHeight(frequencyItem.yValueExtra);

        const maxWidth = Math.max(freq2Px(frequencyItem.maxWidth), 1);
        const minWidth = Math.max(freq2Px(frequencyItem.minWidth), 1);

        ctx.beginPath();
        ctx.rect(x - maxWidth / 2, graphicHeight - height, maxWidth, height);
        ctx.fillStyle = 'rgba(79, 17, 237, 0.25)';
        ctx.strokeStyle = 'rgba(79, 17, 237, 0.25)';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(10, 255, 0, 0.25)';
        ctx.strokeStyle = 'rgba(10, 255, 0, 0.25)';
        ctx.rect(x - minWidth / 2, graphicHeight - heightExtra, minWidth, heightExtra);

        ctx.stroke();
        ctx.fill();
      });
    }
  }, [frequencies, spectrumWidth, graphicWidth]);

  const drawLabelsFrequencies = React.useCallback(() => {
    const amountLabels = 15;
    const distanceBetweenLabels = spectrumWidth / amountLabels;
    const freqs = Array.from(new Array(amountLabels)).map(
      (_, i) => +(minFrequency + i * distanceBetweenLabels).toFixed(3)
    );

    freqs.forEach(freq => {
      ctx?.beginPath();
      const x = getXPosition(freq);
      const y = canvasHeight - padBottom;

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y - 3);
        ctx.lineTo(x, y + 3);
        ctx.fillStyle = mainColor;
        ctx.fillText(`${freq} MHz`, x - 30, y + 15);
        ctx.stroke();
      }
    });
  }, [spectrumWidth, canvasHeight, padBottom, freq2Px]);

  const drawAmplitudeLabels = React.useCallback(() => {
    const amount = 10;

    if (maxAmplitude && ctx) {
      const amplitudeValues = Array.from(new Array(amount)).map((_, i) => ((i + 1) * amount * maxAmplitude) / 100);

      amplitudeValues.unshift(0);

      amplitudeValues.forEach(val => {
        const y = graphicHeight - (val / maxAmplitude) * graphicHeight;

        ctx.beginPath();
        ctx.fillStyle = mainColor;
        ctx.moveTo(padLeft - 3, y);
        ctx.lineTo(padLeft + 3, y);
        ctx.fillText(val.toFixed(2), 0, y + 7);
        ctx.stroke();
      });
    }
  }, [maxAmplitude, graphicHeight]);

  React.useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawAxises();
      drawBars();
      drawLabelsFrequencies();
      drawAmplitudeLabels();
    }
  }, [ctx, graphicWidth, graphicHeight, minFrequency, maxFrequency]);

  return <div className='p-absolute' style={{ height: canvasHeight, width: canvasWidth }} />;
};

export default HtmlSpectrumView;
