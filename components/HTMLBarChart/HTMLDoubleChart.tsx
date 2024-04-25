import React from 'react';
import Pagination from '../Pagination';
import Bar, { BarColor } from './Bar';
import Text, { TextColor, TextSize } from '../Text';
import classNames from 'classnames';

import './HTMLBarChart.scss';

interface YAxis {
  axisValue: number;
  label: string | number;
  width?: number;
  bottomLabel?: string | number;
  tooltip: string | React.ReactNode;
}

interface DataBarCharts {
  x: number | string;
  y: YAxis[];
  tooltip?: string | React.ReactNode;
}

interface HtmlBarChartProps {
  data: DataBarCharts[];
  barSpaceWidth?: number;
  barWidth?: number;
  height?: number;
  paginationCallback?: () => void;
  minValue?: number; //  [0, 1],
  xUnit: number | string;
  yUnit: number | string;
  legend?: string[];
}

const maxWidthInPx = 300;
const minWidthInPx = 1;
const standardWidth = '35px';

const HtmlBarChart: React.FC<HtmlBarChartProps> = ({
  data,
  paginationCallback,
  minValue = 0.1,
  xUnit,
  yUnit,
  legend
}) => {
  const { maxValue, maxWidth } = React.useMemo<{ maxValue: number; maxWidth: number | null }>(() => {
    if (data.length === 0) {
      return { maxValue: 0, maxWidth: null };
    }
    const formattedData = data.reduce<YAxis[]>((acc, item) => {
      acc = acc.concat(item.y);

      return acc;
    }, []);

    const maxValueL = Math.max.apply(
      null,
      formattedData.map(d => +d.axisValue)
    );
    const maxWidthL = formattedData[0].width
      ? Math.max.apply(
          null,
          formattedData.map(d => +(d.width || 0))
        )
      : null;

    return { maxValue: maxValueL, maxWidth: maxWidthL };
  }, [data]);

  const getHeight = React.useCallback((value: number) => `${Math.max(value / maxValue, minValue) * 100}%`, [maxValue]);

  const getWidth = React.useCallback(
    (value?: number) => {
      if (maxWidth && value) {
        return Math.floor(Math.max((value * maxWidthInPx) / maxWidth, minWidthInPx));
      }

      return standardWidth;
    },
    [maxWidth]
  );

  const axisYValues = React.useMemo(
    (minValueProp = 0) => {
      const amount = 10;

      if (maxValue) {
        const arr = Array.from(new Array(amount)).map((_, i) => ((i + 1) * amount * maxValue) / 100);

        arr.unshift(minValueProp);

        return arr.map(val => val.toFixed(2));
      }

      return [];
    },
    [maxValue]
  );

  const PaginationWrapper = paginationCallback ? Pagination : React.Fragment;

  return (
    <div className='html-bar-graphic'>
      <div className='flex h-100'>
        <div className='html-bar-graphic__y-axis'>
          {axisYValues.map(val => (
            <span key={val}>{val}</span>
          ))}
        </div>
        <PaginationWrapper callback={paginationCallback as () => void} isHorizontal>
          <div className='html-bar-graphic__chart'>
            {data.map((dataItem, i) => (
              <div
                key={i}
                className='h-100 flex-align-end flex-justify-center ml-2'
                style={{ position: 'relative', minWidth: '75px' }}
              >
                {dataItem.y.map((yAxis, j) => (
                  <Bar
                    key={j}
                    height={getHeight(+yAxis.axisValue)}
                    width={getWidth(yAxis.width) + 'px'}
                    label={yAxis.label}
                    bottomLabel={yAxis.bottomLabel}
                    tooltipBody={yAxis.tooltip}
                    withAnimation
                    color={j % 2 ? BarColor.Primary : BarColor.Success}
                    className={classNames(j % 2 ? 'mx-3' : '', 'ml-0')}
                  />
                ))}
                <div className='html-bar-graphic__chart__item__x-axis'>{dataItem.x}</div>
              </div>
            ))}
          </div>
        </PaginationWrapper>
        <Text size={TextSize.Sm} color={TextColor.HalfLight} className='html-bar-graphic__chart__x-unit'>
          {xUnit}
        </Text>
        <Text size={TextSize.Sm} color={TextColor.HalfLight} className='html-bar-graphic__chart__y-unit'>
          {yUnit}
        </Text>
        <div className='html-bar-graphic__legend'>
          {legend &&
            legend.map((leg, i) => (
              <div key={leg} className='relative flex-align-center'>
                <span
                  className={`html-bar-graphic__legend--icon mr-2 color-${i % 2 === 0 ? 'success' : 'primary'}`}
                ></span>
                <Text size={TextSize.Sm} color={TextColor.HalfLight}>
                  {leg}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(HtmlBarChart);
