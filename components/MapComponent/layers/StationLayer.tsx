import React from 'react';
import { isBaklansStation, isElescopeStation, isStatusStation, PageRoutes, StationModel } from 'types';
import ElescopeStationLayer from './ElescopeStationLayer';
import StatusStationLayer from './StatusStationLayer';
import { MapServiceContext } from 'contexts/MapServiceContext';
import { getStationIsNavigatable, getStationPriority, getStationStatus } from 'utils/stations';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import { OverlayTooltipDetails } from 'services/types';
import Text, { TextColor, TextSize } from 'components/Text';
import { COLORS } from 'consts';
import StationLabel from 'components/StationLabel/';
import { HiOutlineEye } from 'react-icons/hi';
import classNames from 'classnames';
import BaklanStationLayer from './BaklanStationLayer';
import { getStatusTooltipTextColor } from './utils';

interface StationLayerProps {
  station: StationModel;
}

const StationLayer: React.FC<StationLayerProps> = ({ station }) => {
  const mapService = React.useContext(MapServiceContext);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [customTooltipDetails, setCustomTooltipDetails] = React.useState<OverlayTooltipDetails[] | null>(null);

  React.useEffect(() => {
    const stationIsNavigatable = getStationIsNavigatable(station);

    mapService?.addOverlay({
      coords: [+station.latitude, +station.longitude],
      id: station.id,
      priority: getStationPriority(station),
      elem: parentRef.current as HTMLElement,
      tooltipDetails: {
        body: (
          <div className={classNames('d-flex align-items-center flex-space-between gap-2')}>
            <div className='d-flex align-items-center gap-2'>
              <StationLabel stationType={station.type} size={15} />
              <Text size={TextSize.Sm} color={TextColor.White}>
                {station.name}
              </Text>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <Text size={TextSize.Sm} color={getStatusTooltipTextColor(getStationStatus(station))}>
                {getStationStatus(station)}
              </Text>
              <HiOutlineEye
                size={15}
                color={COLORS.warning}
                className='cursor-pointer'
                onClick={stationIsNavigatable ? () => navigate(`${PageRoutes.Stations}/${station.id}`) : undefined}
              />
            </div>
          </div>
        )
      },
      tooltipCb: setCustomTooltipDetails
    });

    return () => mapService?.removeOverlay(station.id);
  }, [station]);

  const customTooltipBody = React.useMemo(
    () =>
      customTooltipDetails ? (
        <Card className='bg-dark p-2'>
          {customTooltipDetails?.map((tooltipDetails, i) => (
            <div key={i} className='multiple-tooltip-item'>
              {tooltipDetails.body}
            </div>
          ))}
        </Card>
      ) : null,
    [customTooltipDetails]
  );

  return (
    <div>
      <div ref={parentRef} id={station.id.toString()}>
        {isElescopeStation(station) && (
          <ElescopeStationLayer station={station} customTooltipOverlay={customTooltipBody} />
        )}
        {isStatusStation(station) && <StatusStationLayer station={station} customTooltipOverlay={customTooltipBody} />}
        {isBaklansStation(station) && <BaklanStationLayer station={station} customTooltipOverlay={customTooltipBody} />}
      </div>
    </div>
  );
};

export default React.memo(StationLayer);
