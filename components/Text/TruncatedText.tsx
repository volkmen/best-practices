import React from 'react';
import Text, { TextColor, TextProps, TextSize } from './Text';
import Tooltip from '../Tooltip';
import { throttle } from 'lodash';
import classNames from 'classnames';

interface TruncatedTextProps extends TextProps {
  children: React.ReactNode;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ children, className, ...textProps }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, rerender] = React.useState({});

  React.useEffect(() => {
    const onResize = throttle(() => {
      rerender({});
    }, 100);

    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    setTimeout(() => rerender({}), 100);
  }, []);

  const tooltipIsEnabled = Boolean(ref.current && ref.current?.scrollWidth !== ref.current?.clientWidth);

  const tooltipProps = React.useMemo(
    () => ({
      overlay: children,
      mouseEnterDelay: 0.75,
      placement: 'top',
      mode: 'hint',
      ...(tooltipIsEnabled ? {} : { visible: false })
    }),
    [children, tooltipIsEnabled]
  );

  return (
    <div className='relative w-100 h-100 align-self-center'>
      <Text {...textProps} className='h-100'>
        {/*@ts-ignore*/}
        <Tooltip {...tooltipProps}>
          <div className='w-100 h-100'>
            <span
              ref={ref}
              className={classNames(
                'absolute-centered-y w-100 no-white-space overflow-hidden text-overflow-elipsis d-inline',
                className
              )}
            >
              {children}
            </span>
          </div>
        </Tooltip>
      </Text>
    </div>
  );
};

export default React.memo(TruncatedText);
