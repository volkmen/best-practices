import React from 'react';
import { ElescopeStationModel, isElescopeStation, StationStatusType } from 'types';
import Tooltip from 'components/Tooltip';
import TooltipOfLayer from './TooltipOfLayer';
import classNames from 'classnames';
import { getStationIsDisconnected, getStationIsNotFound, getStationBackgroundStatusColor } from 'utils/stations';
import { RiPlaneLine } from 'react-icons/ri';
import { COLORS } from 'consts';
import { TbPlugConnectedX } from 'react-icons/tb';
import { RxQuestionMark } from 'react-icons/rx';
import EleronMarker from './EleronMarker';

import '../MapComponent.scss';

interface ElescopeStationLayerProps {
  station: ElescopeStationModel;
  customTooltipOverlay: React.ReactNode | null;
}

const ElescopeStationLayer: React.FC<ElescopeStationLayerProps> = ({ station, customTooltipOverlay }) => {
  const isDisconnected = getStationIsDisconnected(station);
  const notFound = getStationIsNotFound(station);
  const stationIsNotEnabled = isDisconnected || notFound;

  const notEnabledLabel = stationIsNotEnabled && (
    <>
      {isDisconnected && <TbPlugConnectedX size={20} color={COLORS.white} />}
      {notFound && <RxQuestionMark size={16} color={COLORS.white} />}
    </>
  );

  const stationLabelBody = <RiPlaneLine size={20} color={COLORS.white} />;

  const eleronMarkersData = React.useMemo(
    () =>
      station.stationData?.drones.map(drone => ({
        id: drone.droneId,
        coords: [+drone.currentLocation.latitude, +drone.currentLocation.longitude]
      })),
    [station]
  );

  return (
    <>
      <Tooltip overlay={customTooltipOverlay || <TooltipOfLayer station={station} />}>
        <div
          className={classNames(
            'layer-marker rounded-circle',
            `background-${getStationBackgroundStatusColor(station) || 'success'}`,
            {
              blinking: station.stationData?.status === StationStatusType.Alarm
            }
          )}
          style={{ width: isElescopeStation(station) ? '2rem' : undefined }}
        >
          <div className='layer-marker__inner absolute-centered d-flex align-items-center flex-justify-center mr-2'>
            {stationIsNotEnabled ? notEnabledLabel : stationLabelBody}
          </div>
          <Tooltip overlay='I am tooltip' trigger='click'>
            <div className='layer-marker__multiple-label' />
          </Tooltip>
        </div>
      </Tooltip>
      {eleronMarkersData?.map(({ id, coords }) => <EleronMarker id={id} coords={coords} key={id} />)}
    </>
  );
};

export default React.memo(ElescopeStationLayer);
