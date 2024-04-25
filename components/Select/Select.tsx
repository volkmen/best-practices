import React from 'react';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import { StyledComponent } from 'types';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';

import './Select.scss';

export interface SelectOption {
  value: string | number;
  label: string | number | React.ReactNode;
}

interface SelectProps extends StyledComponent, Partial<StateManagerProps> {
  optionsData: SelectOption[];
  value?: string | number | (string | number)[];
  label?: string | React.ReactNode;
  labelClassName?: string;
  onChange: (val: any) => void;
  defaultValue?: SelectOption;
  isMulti?: boolean;
  maxMenuHeight?: number;
  placeholder?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  optionsData,
  label,
  labelClassName,
  onChange,
  defaultValue,
  className,
  isMulti,
  maxMenuHeight,
  value,
  ...rest
}) => {
  const optionValue = React.useMemo(() => {
    if (typeof value !== 'object') {
      return optionsData.find(opt => opt.value === value);
    }

    return value;
  }, [value]);

  return (
    <div className={classNames('flex-align-center', className)}>
      {label && <span className={classNames(labelClassName, 'mr-2')}>{label}</span>}
      <div className='w-100'>
        <ReactSelect
          options={optionsData}
          classNamePrefix='customize-select'
          onChange={onChange}
          defaultValue={defaultValue}
          isMulti={isMulti}
          hideSelectedOptions={false}
          closeMenuOnSelect={!isMulti}
          maxMenuHeight={maxMenuHeight}
          value={optionValue}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Select;
