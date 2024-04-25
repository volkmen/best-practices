import React from 'react';
import { StatusStationModel } from 'types';
import Tooltip from 'components/Tooltip';
import TooltipOfLayer from './TooltipOfLayer';
import classNames from 'classnames';
import {
  getStationBackgroundStatusColor,
  getStationIsAlarm,
  getStationIsConnected,
  getStationStatusIconComponent
} from 'utils/stations';
import { COLORS } from 'consts';

import StatusStationBody from './StatusStationBody';
import '../MapComponent.scss';

interface StatusStationLayerProps {
  station: StatusStationModel;
  customTooltipOverlay: React.ReactNode | null;
}

const StatusStationLayer: React.FC<StatusStationLayerProps> = ({ station, customTooltipOverlay }) => {
  const isConnected = getStationIsConnected(station) && station.stationData;
  const IconComponent = getStationStatusIconComponent(station);

  return (
    <Tooltip overlay={customTooltipOverlay || <TooltipOfLayer station={station} />}>
      <div
        className={classNames('layer-marker', `background-${getStationBackgroundStatusColor(station) || 'success'}`, {
          blinking: getStationIsAlarm(station)
        })}
      >
        <div className='layer-marker__inner absolute-centered d-flex align-items-center flex-justify-center'>
          {isConnected ? <StatusStationBody station={station} /> : <IconComponent size={20} color={COLORS.white} />}
        </div>
        <div className='layer-marker__multiple-label' />
      </div>
    </Tooltip>
  );
};

export default React.memo(StatusStationLayer);
