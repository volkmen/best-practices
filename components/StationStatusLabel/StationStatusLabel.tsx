import React from 'react';
import { StationModel, StyledComponent } from 'types';
import classNames from 'classnames';
import { getStationBackgroundStatusColor, getStationStatus, getStationStatusIconComponent } from 'utils/stations';
import { COLORS } from 'consts';
import './StationStatusLabel.scss';
import Tooltip from '../Tooltip';

interface AlarmLabelProps extends StyledComponent {
  station: StationModel;
}

const StationStatusLabel: React.FC<AlarmLabelProps> = ({ station, className }) => {
  const IconComponent = getStationStatusIconComponent(station);
  const overlay = getStationStatus(station);

  return (
    <div
      className={classNames(
        'station-status-label uppercase d-flex align-items-center relative no-white-space',
        className,
        'background-' + getStationBackgroundStatusColor(station)
      )}
    >
      <Tooltip overlay={overlay}>
        <div>
          <IconComponent size={35} color={COLORS.white} />
        </div>
      </Tooltip>
    </div>
  );
};

export default React.memo(StationStatusLabel);
