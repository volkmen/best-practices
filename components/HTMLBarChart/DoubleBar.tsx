import React from 'react';
import classNames from 'classnames';

import './HTMLBarChart.scss';

interface SingleBarProps {
  height: string;
  label: string | number;
  withAnimation?: boolean;
  xAxisValue: string | number;
}

const SingleBar: React.FC<SingleBarProps> = ({ height, label, withAnimation, xAxisValue }) => {
  const [inited, setInited] = React.useState(!withAnimation);

  React.useEffect(() => {
    setInited(true);
  }, []);

  return (
    <div className={classNames('html-bar-graphic__chart__item', { animated: inited })} style={{ maxHeight: height }}>
      <span className='html-bar-graphic__chart__item__value'>{label}</span>
      <span className='html-bar-graphic__chart__item__x-axis'>{xAxisValue}</span>
    </div>
  );
};

export default React.memo(SingleBar);
