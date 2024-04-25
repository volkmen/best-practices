import React from 'react';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import classNames from 'classnames';
import './Dropdown.scss';
import { useOnClickOutside } from 'usehooks-ts';
import { noop } from 'lodash';

interface DropdownProps {
  items: React.ReactNode[];
  placement?: string;
  children?: React.ReactElement;
  onClose?: () => void;
  align?: { offset: number[] };
  overlayClassName?: string;
}
const Dropdown: React.FC<DropdownProps> = ({
  items,
  placement = 'bottomRight',
  children,
  onClose,
  overlayClassName,
  ...restProps
}) => {
  const [isCloseForce, setIsCloseForce] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose || noop);

  const closeDropdown = React.useCallback(() => {
    setIsCloseForce(true);

    setTimeout(() => {
      setIsCloseForce(false);
    });
    onClose?.();
  }, []);

  const dropdownOverlay = React.useMemo(
    () => (
      <div className={classNames('dropdown')} onClick={closeDropdown} ref={ref}>
        {items}
      </div>
    ),
    [items, ref.current]
  );

  return (
    <RCTooltip
      overlay={dropdownOverlay}
      placement={placement}
      trigger='click'
      overlayClassName={classNames('dropdown-overlay', overlayClassName)}
      showArrow={false}
      {...(isCloseForce ? { visible: false } : {})}
      {...restProps}
    >
      {children || <span />}
    </RCTooltip>
  );
};

export default React.memo(Dropdown);
