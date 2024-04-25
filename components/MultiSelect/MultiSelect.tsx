import React from 'react';
import RCTooltip from 'rc-tooltip';
import TextResourceContext from 'contexts/TextResource';
import Text, { TextColor } from '../Text';
import MenuDropdown from './MenuDropdown';
import { uniqBy, xorBy } from 'lodash';
import OptionChips from './OptionChips';
import { useBoolean } from 'usehooks-ts';
import { Option } from './types';

interface MultiSelectProps {
  options?: Option[];
  initialOptions?: Option[];
  onChange: (options: Option[]) => void;
}

const testOptions = [
  { value: 'name', label: 'name' },
  { value: 'name1', label: 'name1' },
  { value: 'name2', label: 'name2' },
  { value: 'name3', label: 'name3' }
];

const MultiSelect: React.FC<MultiSelectProps> = ({ options = testOptions, initialOptions = [], onChange }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>(initialOptions);
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const { value: dropdownIsOpen, toggle: toggleDropdown, setFalse: closeDropdown } = useBoolean(false);

  const onSelect = React.useCallback((option: Option) => {
    setSelectedOptions(optionsL => {
      const result = uniqBy([...optionsL, option], 'value');

      onChange(result);

      return result;
    });
  }, []);

  const onRemove = React.useCallback((option: Option) => {
    setSelectedOptions(optionsL => {
      const result = optionsL.filter(opt => opt.value !== option.value);

      onChange(result);

      return result;
    });
  }, []);

  const availableOptions = xorBy(options, selectedOptions, 'value');

  const ontToggleDropdown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown();
  }, []);

  const overlay = React.useMemo(
    () => <MenuDropdown options={availableOptions} onSelect={onSelect} onClose={closeDropdown} />,
    [availableOptions]
  );

  return (
    <RCTooltip overlay={overlay} visible={dropdownIsOpen} placement='bottomLeft' destroyTooltipOnHide={true}>
      <div className='flex-wrap gap-3' onMouseDown={ontToggleDropdown}>
        {selectedOptions.length > 0 ? (
          selectedOptions.map(option => <OptionChips key={option.value} option={option} onClose={onRemove} />)
        ) : (
          <Text color={TextColor.HalfLight}>{getTextResourceByKey('selectStation')}</Text>
        )}
      </div>
    </RCTooltip>
  );
};

export default React.memo(MultiSelect);
