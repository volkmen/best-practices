import React from 'react';
import RCTooltip from 'rc-tooltip';
import TextResourceContext from 'contexts/TextResource';
import Text, { TextColor } from '../Text';
import MenuDropdownCheckBoxes from './MenuDropdownCheckBoxes';
import { Option } from './types';
import { xor } from 'lodash';
import { useBoolean } from 'usehooks-ts';

interface MultiSelectCheckBoxesProps {
  options: Option[];
  onChange: (option: Option) => void;
  initialSelectedValues?: string[];
  onSetAllOptions?: () => void;
  placeholder?: string;
}

const MultiSelectCheckBoxes: React.FC<MultiSelectCheckBoxesProps> = ({
  options,
  initialSelectedValues = [],
  onChange,
  onSetAllOptions,
  placeholder = 'select'
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<(string | number)[]>(initialSelectedValues);

  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const { value: dropdownIsOpen, toggle: toggleDropdown, setFalse: closeDropdown } = useBoolean(false);

  const allSelected = options.length === selectedOptions.length;
  const onClickAll = () => {
    if (onSetAllOptions) {
      setSelectedOptions(allSelected ? [] : options.map(opt => opt.value));
      onSetAllOptions?.();
    }
  };

  const onToggleCheckBox = (option: Option) => {
    setSelectedOptions(xor(selectedOptions, [option.value]));
    onChange(option);
  };

  const onToggleDropdown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown();
  }, []);

  const overlay = React.useMemo(
    () => (
      <MenuDropdownCheckBoxes
        selectedOptionValues={selectedOptions}
        options={options}
        onToggleCheckBox={onToggleCheckBox}
        onClose={closeDropdown}
        theme='light'
        onClickAll={onClickAll}
      />
    ),
    [selectedOptions]
  );

  if (options.length === 0) {
    return null;
  }

  return (
    <div ref={ref}>
      <RCTooltip
        overlay={overlay}
        visible={dropdownIsOpen}
        placement='bottomLeft'
        destroyTooltipOnHide={true}
        showArrow={false}
        getTooltipContainer={() => ref.current as HTMLDivElement}
      >
        <div className='flex-wrap gap-3 cursor-pointer' onMouseDown={onToggleDropdown}>
          <Text color={TextColor.HalfLight}>{getTextResourceByKey(placeholder)}</Text>
        </div>
      </RCTooltip>
    </div>
  );
};

export default React.memo(MultiSelectCheckBoxes);
