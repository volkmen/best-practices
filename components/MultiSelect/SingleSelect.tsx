import React from 'react';
import RCTooltip from 'rc-tooltip';
import Text, { TextColor } from '../Text';
import MenuDropdown from './MenuDropdown';
import { useBoolean } from 'usehooks-ts';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import { Option } from './types';

interface SingleSelectProps extends StyledComponent {
  options: Option[];
  initialOption?: Option;
  onChange: (option: string) => void;
  renderOption?: (option: Option | null) => React.ReactElement;
  labelColor?: TextColor;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  initialOption = null,
  onChange,
  renderOption,
  labelColor,
  className
}) => {
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(initialOption);
  const { value: dropdownIsOpen, toggle: toggleDropdown, setFalse: closeDropdown } = useBoolean(false);

  const onSelect = React.useCallback((option: Option) => {
    setSelectedOption(option);
    onChange(option.value as string);
    closeDropdown();
  }, []);

  const ontToggleDropdown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown();
  }, []);

  const overlay = React.useMemo(
    () => <MenuDropdown options={options} onSelect={onSelect} onClose={closeDropdown} />,
    [options]
  );

  return (
    <RCTooltip overlay={overlay} visible={dropdownIsOpen} placement='bottomLeft' destroyTooltipOnHide showArrow={false}>
      <div className={classNames('flex-wrap gap-3', className)} onMouseDown={ontToggleDropdown}>
        {renderOption ? (
          renderOption(selectedOption)
        ) : (
          <Text color={labelColor}>{selectedOption?.label || 'Select label'}</Text>
        )}
      </div>
    </RCTooltip>
  );
};

export default React.memo(SingleSelect);
