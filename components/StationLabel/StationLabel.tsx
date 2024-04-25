import React from 'react';
import { COLORS } from 'consts';
import { StationType, StyledComponent } from 'types';
import { MdWifiTethering, MdOutlineSend } from 'react-icons/md';
import { GiBirdMask, GiInsectJaws } from 'react-icons/gi';
import classNames from 'classnames';

export const stationIconComponent = {
  [StationType.Elescope]: <MdOutlineSend color={COLORS.primary} className='rotate--45 ml-2' />,
  [StationType.Status]: <MdWifiTethering color={COLORS.success} />,
  [StationType.Baklans]: <GiBirdMask color={COLORS.warning} />,
  [StationType.Hrushch]: <GiInsectJaws color={COLORS.pink} />
};

interface StationLabelProps extends StyledComponent {
  stationType: StationType;
  size?: number;
  color?: string;
}

const StationLabel: React.FC<StationLabelProps> = ({ stationType, size = 30, color, className }) => {
  const LabelComponent = stationIconComponent[stationType];

  if (!LabelComponent) {
    return null;
  }

  return React.cloneElement(LabelComponent, {
    color: color || LabelComponent.props.color,
    size,
    className: classNames(LabelComponent.props.className, className)
  });
};

export default React.memo(StationLabel);
