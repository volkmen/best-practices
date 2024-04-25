import React, { PropsWithChildren } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { COLORS } from 'consts';
import classNames from 'classnames';
import './Carousel.scss';

interface CarouselProps extends PropsWithChildren {
  children: React.ReactNode[];
  defaultItemIndex?: number;
  arrowsClassname?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, defaultItemIndex = 0, arrowsClassname }) => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(defaultItemIndex);

  const onIncrease = React.useCallback(() => {
    setSelectedItemIndex((selectedItemIndex + 1) % children.length);
  }, [selectedItemIndex]);

  const onDecrease = React.useCallback(() => {
    setSelectedItemIndex(selectedItemIndex - 1 < 0 ? children.length - 1 : selectedItemIndex - 1);
  }, [selectedItemIndex]);

  const onSetIndex = (index: number) => () => {
    setSelectedItemIndex(index);
  };

  const indicatorsAreEnabled = children.length > 1;

  return (
    <div className='relative'>
      <div className='relative'>{children[selectedItemIndex]}</div>
      {selectedItemIndex !== 0 && (
        <RxCaretLeft
          onClick={onDecrease}
          className={classNames(
            arrowsClassname,
            'absolute-centered-y left-0 rounded-circle cursor-pointer carousel__caret'
          )}
          size={20}
          color={COLORS.white}
        />
      )}
      {selectedItemIndex !== children.length - 1 && (
        <RxCaretRight
          onClick={onIncrease}
          className={classNames(
            arrowsClassname,
            'absolute-centered-y right-0 rounded-circle cursor-pointer carousel__caret'
          )}
          size={20}
          color={COLORS.white}
        />
      )}
      {indicatorsAreEnabled && (
        <div className='carousel__indicators absolute-centered-x'>
          {children.map((child, i) => (
            <div
              key={i}
              className={classNames(
                'carousel__indicators__item',
                i === selectedItemIndex && 'carousel__indicators__item__selected'
              )}
              onClick={onSetIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
