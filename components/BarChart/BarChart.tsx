import React from 'react';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { ImplicitLabelType } from 'recharts/src/component/Label';
import Text, { TextColor, TextSize } from '../Text';
import useGetElementIsOnViewPort from 'hooks/useGetElementIsOnViewPort';
import { StyledComponent } from 'types';
import './BarChart.scss';

interface BarOptions {
  dataKey: string | number;
  color?: string;
  label?: ImplicitLabelType;
}
interface BarChartProps extends StyledComponent {
  barOptions: BarOptions[];
  data: object[];
  dataKeyX: string;
  barColors?: string[];
  axisColor?: string;
  sortType?: string;
  title?: string;
  withTooltip?: boolean;
  minPointSize?: number;
}

const GRAPH_STYLES = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5
};

const height = 500;

const DEFAULT_AXIS_COLOR = '#D0CFCF';
const DEFAULT_BAR_COLORS = ['#005F89', '#616263'];
const BAR_RADIUS: [number, number, number, number] = [5, 5, 0, 0];
const WIDTH_MULTIPLIER = 75;

const tooltipContentStyle = {
  backgroundColor: '#D0CFCF',
  border: 'none',
  borderRadius: '0.25rem',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
};

const styleLabel = {
  color: '#ff0000'
};

const BarChart: React.FC<BarChartProps> = ({
  className,
  data,
  barOptions,
  dataKeyX,
  sortType,
  title,
  withTooltip,
  minPointSize = 20
}) => {
  const width = React.useMemo(() => data.length * WIDTH_MULTIPLIER, []);
  const ref = React.useRef(null);
  const componentIsOnViewPort = useGetElementIsOnViewPort(ref);

  const sortedData = React.useMemo(() => {
    if (sortType) {
      return [...data].sort(
        (dataValue1: { [key: typeof sortType]: any }, dataValue2: { [key: typeof sortType]: any }) => {
          try {
            return +dataValue2[sortType] - +dataValue1[sortType];
          } catch (e) {
            return dataValue2[sortType] - dataValue1[sortType];
          }
        }
      );
    }

    return data;
  }, [sortType, data]);

  return (
    <div ref={ref} className={className}>
      <Text size={TextSize.MdLg} color={TextColor.Success} className='text-center mb-3 uppercase'>
        {title}
      </Text>
      {componentIsOnViewPort ? (
        <>
          <div className='graph-bar-chart'>
            <RechartsBarChart width={width} height={height} data={sortedData} margin={GRAPH_STYLES}>
              <CartesianGrid strokeDasharray='1 5' />
              <XAxis dataKey={dataKeyX} stroke={DEFAULT_AXIS_COLOR} />
              <YAxis stroke={DEFAULT_AXIS_COLOR} />
              {withTooltip && (
                <Tooltip
                  wrapperClassName='graph-bar-chart__tooltip'
                  labelStyle={styleLabel}
                  contentStyle={tooltipContentStyle}
                />
              )}
              {barOptions.map((barOption, i) => (
                <Bar
                  dataKey={barOption.dataKey}
                  key={i}
                  fill={barOption.color || DEFAULT_BAR_COLORS[barOptions.length - (i + 1)]}
                  label={barOption.label}
                  minPointSize={minPointSize}
                  radius={BAR_RADIUS}
                  // isAnimationActive={false}
                />
              ))}
            </RechartsBarChart>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(BarChart);
