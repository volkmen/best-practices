import React from 'react';
import { ButtonType, ButtonProps } from '../Button';
import { useBoolean } from 'usehooks-ts';
import ButtonIcon from './ButtonIcon';

interface SwitchButtonIconProps extends ButtonProps {
  activeType?: ButtonType;
  passiveType?: ButtonType;
}

const SwitchButtonIcon: React.FC<SwitchButtonIconProps> = props => {
  const { value: isVisible, toggle: toggleVisible } = useBoolean(false);

  return (
    <ButtonIcon buttonType={isVisible ? ButtonType.Success : ButtonType.Secondary} onClick={toggleVisible} {...props} />
  );
};

export default React.memo(SwitchButtonIcon);
