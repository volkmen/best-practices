import React from 'react';
import { BaklansStationModel } from 'types/Baklans';
import TooltipOfLayer from './TooltipOfLayer';
import classNames from 'classnames';
import { ConnectionType } from 'types';
import Tooltip from '../../Tooltip';
import { FaKiwiBird } from 'react-icons/fa';
import { COLORS } from 'consts';

interface BaklansStationLayerProps {
  station: BaklansStationModel;
  customTooltipOverlay: React.ReactNode | null;
}

const BaklanStationLayer: React.FC<BaklansStationLayerProps> = ({ station, customTooltipOverlay }) => (
  <Tooltip overlay={customTooltipOverlay || <TooltipOfLayer station={station} />}>
    <div
      className={classNames('relative baklans-layer-marker', {
        blinking: station.connectionStatus === ConnectionType.Disconnected
      })}
    >
      <FaKiwiBird
        size={24}
        color={station.connectionStatus === ConnectionType.Disconnected ? COLORS.danger : COLORS.purple}
        className='absolute-centered'
      />
      <div className='layer-marker__multiple-label' />
    </div>
  </Tooltip>
);

export default BaklanStationLayer;
