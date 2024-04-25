import React from 'react';
import { Option } from './types';
import { IoMdClose } from 'react-icons/io';
import './MultiSelect.scss';
import Text, { TextColor, TextSize } from '../Text';

interface OptionChipsProps {
  option: Option;
  onClose: (option: Option) => void;
}

const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const OptionChips: React.FC<OptionChipsProps> = ({ option, onClose }) => {
  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(option);
  }, []);

  return (
    <div className='flex multi-select__chips' onClick={stopPropagation}>
      <Text className='mr-2' color={TextColor.Light} size={TextSize.Sm}>
        {option.label}
      </Text>
      <IoMdClose onMouseDown={onClick} size={14} className='multi-select__chips__close' />
    </div>
  );
};

export default React.memo(OptionChips);
