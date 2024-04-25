import React from 'react';
import classNames from 'classnames';
import { throttle } from 'lodash';
import Spinner from '../Spinner';

interface PaginationProps {
  children: React.ReactNode;
  callback: () => void;
  isHorizontal?: boolean;
  forwardRef?: React.ForwardedRef<HTMLDivElement>;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ children, callback, isHorizontal, loading, forwardRef }) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const refCb = React.useRef<(() => void) | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    refCb.current = throttle(callback, 100);
  }, [callback]);

  React.useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio > 0) {
          refCb.current?.();
        }
      });

      observer.observe(ref.current);

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, []);

  return (
    <div
      className={classNames({ 'flex overflow-x-auto w-100 pagination': isHorizontal, 'flex-column': !isHorizontal })}
      ref={forwardRef}
    >
      {children}
      <div ref={ref} className='invisible'>
        a
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Pagination;
