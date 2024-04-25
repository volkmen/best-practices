import React from 'react';
import Text, { TextColor, TextSize } from 'components/Text';
import Card from 'components/Card';
import { isBaklansStation, PageRoutes, StationModel } from 'types';
import { useNavigate } from 'react-router-dom';
import StationLabel from 'components/StationLabel';
import { HiOutlineEye } from 'react-icons/hi';
import { COLORS } from 'consts';
import { CiLocationOn } from 'react-icons/ci';
import { HiLink } from 'react-icons/hi';
import classNames from 'classnames';
import { getStationIsNavigatable, getStationStatus, getStationUrl } from 'utils/stations';
import { getStatusTooltipTextColor } from './utils';
import { visualizeCoordinate } from 'utils/common';

interface TooltipLayerProps {
  station: StationModel;
}

const TooltipOfLayer: React.FC<TooltipLayerProps> = ({ station }) => {
  const navigate = useNavigate();
  const stationIsNavigatable = getStationIsNavigatable(station);

  const onNavigate = React.useCallback(() => {
    navigate(`${PageRoutes.Stations}/${station.id}`);
  }, [station.id]);

  return (
    <Card className='map__tooltip p-2 bg-dark'>
      <div className={classNames('d-flex align-items-center flex-space-between mb-1')}>
        <div className='d-flex align-items-center'>
          <StationLabel stationType={station.type} size={15} className='mr-2' />
          <Text className='no-white-space' color={TextColor.White}>
            {station.name}
          </Text>
        </div>
        <div className='d-flex align-items-center'>
          <Text size={TextSize.Sm} color={getStatusTooltipTextColor(getStationStatus(station))}>
            {getStationStatus(station)}
          </Text>
        </div>
      </div>
      <div className='flex flex-space-between'>
        <Text className='flex-align-center' color={TextColor.White} size={TextSize.Sm}>
          <CiLocationOn className='mr-2' size={16} color={COLORS.gray} />
          {visualizeCoordinate(station.latitude)}, {visualizeCoordinate(station.longitude)}
        </Text>
        {stationIsNavigatable && (
          <HiOutlineEye size={20} color={COLORS.warning} className='cursor-pointer mr-3' onClick={onNavigate} />
        )}
        {isBaklansStation(station) && (
          <Text className='flex-align-center' color={TextColor.White} size={TextSize.Sm}>
            <HiLink size={16} color={COLORS.gray} />
            {getStationUrl(station)}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default React.memo(TooltipOfLayer);
