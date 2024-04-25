import React from 'react';
import Text, { TextSize } from 'components/Text';
import SpectrumMap from './SpectrumMap';
import Button, { ButtonSize } from '../Button';
import { Frequency } from 'types';
import FrequencyCard from 'pages/station/shared/Frequencies/FrequencyCard';
import CanvasContextProvider, { CanvasContext } from 'contexts/CanvasContext';
import HtmlSpectrumView from './HtmlSpectrumView';
import HtmlSpectrumDragging from './HtmlSpectrumDragging';
import { SpectrumContainer } from './SpectrumContainer';
import Spinner from '../Spinner';
import EmptyState from '../EmptyState';
import { TextColor } from 'components/Text';

import './HTMLSpectrum.scss';

interface HTMLSpectrumProps {
  dataFrequency: Frequency[];
  scale: number;
  xUnit: string;
  yUnit: string;
  isLoading?: boolean;
}

interface DataItem {
  xValue: number;
  yValue: number;
  minWidth: number;
  maxWidth: number;
  yValueExtra: number;
  overlay: React.ReactNode;
}

const MAX_SCALE = 1000;

const getDivider = (scale: number) => {
  if (scale < 5) {
    return 0.25;
  } else if (scale < 11) {
    return 1;
  } else if (scale < 26) {
    return 10;
  } else if (scale < 51) {
    return 25;
  }

  return 50;
};

const AXIS_PAD = 30;

const HTMLSpectrum: React.FC<HTMLSpectrumProps> = ({ dataFrequency, isLoading, xUnit, yUnit }) => {
  const [scale, setScale] = React.useState(1);
  const { bounds } = React.useContext(CanvasContext);

  const data = React.useMemo<DataItem[]>(
    () =>
      dataFrequency.map(freq => ({
        xValue: +freq.frequency,
        yValue: +freq.maxDb,
        yValueExtra: +freq.minDb,
        minWidth: freq.minBand,
        maxWidth: freq.maxBand,
        overlay: <FrequencyCard frequency={freq} />
      })),
    [dataFrequency]
  );

  const {
    minXValue: minXValueWOPad,
    maxXValue: maxXValueWOPad,
    maxYValue
  } = React.useMemo(
    () =>
      data.reduce(
        ({ minXValue, maxXValue, maxYValue: maxYValueL }, dataItem) => {
          if (minXValue === 0 || minXValue > dataItem.xValue) {
            minXValue = dataItem.xValue;
          }
          if (maxXValue === 0 || maxXValue < dataItem.xValue) {
            maxXValue = dataItem.xValue;
          }
          if (maxYValueL === 0 || maxYValueL < dataItem.yValue) {
            maxYValueL = dataItem.yValue;
          }

          return { minXValue: minXValue, maxXValue, maxYValue: maxYValueL };
        },
        { minXValue: 0, maxXValue: 0, maxYValue: 0 }
      ),
    [data]
  );

  const minXValue = +(minXValueWOPad * 0.98).toFixed(3);
  const maxXValue = +(maxXValueWOPad * 1.02).toFixed(3);

  const initialCentralFrequency = (minXValue + maxXValue) / 2;
  const [shiftedCentralFrequency, setShiftedCentralFrequency] = React.useState<number | null>(null);
  const centralFrequency = shiftedCentralFrequency ? shiftedCentralFrequency : initialCentralFrequency;

  const mult = 1 / Math.max(scale, 1);
  const maxSpectrumWidth = maxXValue - minXValue;

  const halfWidth = (maxSpectrumWidth / 2) * mult;

  const minFrequency = centralFrequency - halfWidth;
  const maxFrequency = centralFrequency + halfWidth;
  const currentSpectrumWidthFr = maxFrequency - minFrequency;
  const maxWidthInPx = bounds.width;

  const frequencies = data.reduce<DataItem[]>((acc, dataItem) => {
    if (dataItem.xValue > minFrequency && dataItem.xValue < maxFrequency) {
      acc.push(dataItem);
    }

    return acc;
  }, []);
  const zipperWidth = (currentSpectrumWidthFr / maxSpectrumWidth) * 100;

  const getMapPosition = (freq: number) => ((freq - minXValue) * (maxWidthInPx - AXIS_PAD)) / maxSpectrumWidth;

  React.useEffect(() => {
    setShiftedCentralFrequency(initialCentralFrequency);
  }, [initialCentralFrequency]);

  const [mapPosition, setMapPosition] = React.useState(50); // centralPosition in percents

  React.useEffect(() => {
    setShiftedCentralFrequency(+(minXValue + maxSpectrumWidth * (mapPosition / 100)).toFixed(3));
  }, [mapPosition]);

  const onScaleUp = React.useCallback(() => {
    setScale(scaleL => Math.min(MAX_SCALE, scaleL + getDivider(scaleL)));
  }, []);

  const onScaleDown = React.useCallback(() => {
    setScale(scaleL => {
      const newScale = scaleL - getDivider(scaleL);

      return newScale >= 1 ? newScale : scaleL;
    });
  }, []);

  const onUpdateX = React.useCallback(
    (deltaPx: number) => {
      const hzInOnePx = currentSpectrumWidthFr / maxWidthInPx;
      const deltaFr = hzInOnePx * deltaPx;
      const newFreq = centralFrequency - deltaFr;
      const currentHalfWidth = currentSpectrumWidthFr / 2;

      if (newFreq + currentHalfWidth > maxXValue || newFreq - currentHalfWidth < minXValue) {
        return;
      }
      setMapPosition(((newFreq - minXValue) / maxSpectrumWidth) * 100);
    },
    [currentSpectrumWidthFr, maxWidthInPx, centralFrequency, maxXValue, minXValue, maxSpectrumWidth]
  );

  const reset = React.useCallback(() => {
    setMapPosition(50);
    setScale(1);
  }, []);

  // there is needed for scaling purposes
  React.useEffect(() => {
    if (mapPosition + zipperWidth / 2 > 100) {
      setMapPosition(100 - zipperWidth / 2);
    } else if (mapPosition - zipperWidth / 2 < 0) {
      setMapPosition(zipperWidth / 2);
    }
  }, [mapPosition, zipperWidth]);

  const getHeight = React.useCallback((yValue: number) => (yValue / maxYValue) * 100, [bounds, maxYValue]);

  const initialLoading = isLoading && dataFrequency.length === 0;
  const isEmptyResult = !isLoading && dataFrequency.length === 0;
  const isRegularState = !initialLoading && !isEmptyResult;

  return (
    <>
      {initialLoading && <Spinner isFullSize />}
      {isEmptyResult && <EmptyState />}
      {isRegularState && (
        <>
          <HtmlSpectrumView
            frequencies={frequencies}
            minFrequency={minFrequency}
            maxFrequency={maxFrequency}
            maxAmplitude={maxYValue}
            padLeft={AXIS_PAD}
            padBottom={AXIS_PAD}
          />
          <HtmlSpectrumDragging
            onUpdateX={onUpdateX}
            onScaleDown={onScaleDown}
            onScaleUp={onScaleUp}
            padBottom={AXIS_PAD}
            padStart={AXIS_PAD}
          />
          <SpectrumContainer />
          <Text
            style={{ top: '-20px', left: 0 }}
            size={TextSize.Sm}
            color={TextColor.HalfLight}
            relative={false}
            className='p-absolute'
          >
            {yUnit}
          </Text>
          <Text
            size={TextSize.Sm}
            color={TextColor.HalfLight}
            relative={false}
            className='p-absolute'
            style={{ bottom: '145px', right: 0 }}
          >
            {xUnit}
          </Text>
          <div>
            <Text size={TextSize.Sm} className='absolute-centered-x' style={{ top: '-10px' }}>
              {centralFrequency}MHz
            </Text>
            <div className='absolute-centered-x spectrum__center-line' />

            <div className='spectrum__details grid-table-2-1'>
              <Text size={TextSize.Sm}>spectrum width</Text>
              <Text size={TextSize.Sm}>{(maxXValue - minXValue).toFixed(3)}MHz</Text>
              <Text size={TextSize.Sm}>current spectrum width</Text>
              <Text size={TextSize.Sm}>{(maxFrequency - minFrequency).toFixed(3)}MHz</Text>
              <Text size={TextSize.Sm}>scale</Text>
              <Text size={TextSize.Sm}>{scale}</Text>
              <Text size={TextSize.Sm}>frequency</Text>
              <Text size={TextSize.Sm} className='mb-2'>
                {shiftedCentralFrequency || initialCentralFrequency}MHz
              </Text>
              <Text></Text>
              <Button size={ButtonSize.Small} onClick={reset}>
                reset
              </Button>
            </div>
          </div>
          <div style={{ paddingLeft: `${AXIS_PAD}px`, bottom: 0, marginBottom: '35px' }} className='w-100 p-absolute'>
            <SpectrumMap
              className='spectrum__map'
              zipperWidth={zipperWidth}
              onSetPosition={setMapPosition}
              zipperPosition={mapPosition}
            >
              {data.map(mapItem => (
                <div
                  className='spectrum__bar__item'
                  key={`map-${mapItem.xValue}`}
                  style={{
                    left: getMapPosition(mapItem.xValue) + 'px',
                    height: `${getHeight(mapItem.yValue)}%`,
                    width: '1px',
                    background: 'red'
                  }}
                />
              ))}
            </SpectrumMap>
          </div>
        </>
      )}
    </>
  );
};

export default (props: HTMLSpectrumProps) => (
  <div className='relative' style={{ height: '650px' }}>
    <CanvasContextProvider height={500}>
      <HTMLSpectrum {...props} />
    </CanvasContextProvider>
  </div>
);
