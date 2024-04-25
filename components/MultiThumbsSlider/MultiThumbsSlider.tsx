import React, { ChangeEvent } from 'react';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import { COLOR_MIXIN_VARIABLES } from 'consts';
import Text, { TextColor, TextSize } from 'components/Text';

import './MultiThumbsSlider.scss';

interface MultiThumbSliderProps extends StyledComponent {
  options: number[];
  preElement?: React.ReactNode | null;
  title?: React.ReactNode | string;
  color?: string;
  onChange: (val: number) => void;
  selectedValue: number;
  getSelectedValueTittle?: (value: number) => React.ReactNode;
  radioBtnName: string;
}

const MultiThumbsSlider: React.FC<MultiThumbSliderProps> = ({
  options,
  preElement,
  title,
  className,
  color = COLOR_MIXIN_VARIABLES.White,
  onChange,
  selectedValue,
  getSelectedValueTittle,
  radioBtnName
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value);
  };

  return (
    <div className={classNames('d-flex gap-2 mb-3', className)}>
      <div className='flex-align-center'>{preElement}</div>
      <div className='d-flex flex-column'>
        <div className='mb-1'>
          <Text size={TextSize.Sm} color={color as TextColor}>
            {title}
          </Text>
        </div>
        <div className='d-flex flex-row gap-4'>
          {options.map((option, index) => (
            <div className='flex-align-center'>
              <div
                className={classNames('radio-btn-wrapper slider-colors', 'background-' + color, {
                  'is-selected': selectedValue === option
                })}
              >
                <input
                  className='cursor-pointer'
                  onChange={handleChange}
                  name={radioBtnName}
                  type='radio'
                  value={option}
                  required
                />
              </div>
              {options.length - 1 !== index && (
                <hr className={classNames('lines-between-thumbs slider-colors', 'background-' + color)} />
              )}
            </div>
          ))}
          <Text color={color as TextColor} className='d-flex ml-2 gap-1'>
            {getSelectedValueTittle?.(selectedValue) || selectedValue}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MultiThumbsSlider;
