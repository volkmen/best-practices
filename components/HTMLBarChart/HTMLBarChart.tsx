import React from 'react';
import Pagination from '../Pagination';
import Text, { TextColor, TextSize } from '../Text';
import Bar, { BarColor } from './Bar';
import Spinner from '../Spinner';
import EmptyState from '../EmptyState';

import './HTMLBarChart.scss';

interface DataItemProps {
  x: number | string;
  y: number | string;
  tooltip?: React.ReactNode;
  id?: number | string;
  color?: BarColor;
  extraElement?: (getHeightFunc: (val: number) => string) => void;
  getLabel?: () => React.ReactNode;
}
interface HtmlBarChartProps {
  data: DataItemProps[];
  barSpaceWidth?: number;
  barWidth?: number;
  height?: number;
  paginationCallback?: () => void;
  minValue?: number; //  [0, 1],
  xUnit: string;
  yUnit: string;
  maxYValue?: number;
  isLoading?: boolean;
}

const TOP_PAD = 3; // in percentage

const HtmlBarChart: React.FC<HtmlBarChartProps> = ({
  data,
  paginationCallback,
  minValue = 0.1,
  xUnit,
  yUnit,
  maxYValue: maxValueFromProps,
  isLoading
}) => {
  const maxValue = React.useMemo<number>(() => {
    if (data.length === 0) {
      return 0;
    }

    return Math.max.apply(null, [...data.map(d => +d.y), maxValueFromProps || 0]);
  }, [data, maxValueFromProps]);

  const getHeight = React.useCallback(
    (value: number) => `${Math.max(value / maxValue, minValue) * (100 - TOP_PAD)}%`,
    [maxValue]
  );

  const axisYValues = React.useMemo(
    (minValueLoc = 0) => {
      const amount = 10;

      if (maxValue) {
        const arr = Array.from(new Array(amount)).map((_, i) => ((i + 1) * amount * maxValue) / (100 - TOP_PAD));

        arr.unshift(minValueLoc);

        return arr.map(val => val.toFixed(2));
      }

      return [];
    },
    [maxValue]
  );

  const PaginationWrapper = paginationCallback ? Pagination : React.Fragment;

  const initialLoading = isLoading && data.length === 0;
  const isEmptyResult = !isLoading && data.length === 0;
  const isRegularState = !initialLoading && !isEmptyResult;

  return (
    <div className='html-bar-graphic'>
      <div className='d-flex h-100'>
        {initialLoading && (
          <div className='flex-justify-center w-100'>
            <Spinner isFullSize />
          </div>
        )}
        {isEmptyResult && <EmptyState />}
        {isRegularState && (
          <>
            <div className='html-bar-graphic__y-axis'>
              {axisYValues.map(val => (
                <span key={val}>{val}</span>
              ))}
            </div>
            <PaginationWrapper callback={paginationCallback as () => void} isHorizontal loading={isLoading}>
              <div className='html-bar-graphic__chart'>
                {data.map((dataItem, i) => (
                  <div className='h-100 flex-align-end relative' key={i}>
                    <>
                      <Bar
                        height={getHeight(+dataItem.y)}
                        label={dataItem.getLabel?.() || dataItem.y}
                        xAxisValue={dataItem.x}
                        tooltipBody={dataItem.tooltip}
                        withAnimation
                      />
                      {dataItem.extraElement?.(getHeight)}
                    </>
                  </div>
                ))}
              </div>
            </PaginationWrapper>
            <Text
              size={TextSize.Sm}
              color={TextColor.HalfLight}
              relative={false}
              className='html-bar-graphic__chart__x-unit'
            >
              {xUnit}
            </Text>
            <Text
              size={TextSize.Sm}
              color={TextColor.HalfLight}
              relative={false}
              className='html-bar-graphic__chart__y-unit'
            >
              {yUnit}
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default HtmlBarChart;
