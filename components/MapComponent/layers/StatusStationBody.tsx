import React from 'react';
import { StatusStationModel } from 'types';
import Text, { TextColor, TextSize } from 'components/Text';

interface LabelBodyComponentProps {
  station: StatusStationModel;
}

const StatusStationBody: React.FC<LabelBodyComponentProps> = ({ station }) =>
  station.stationData ? (
    <div className='mb-0'>
      <Text size={TextSize.Sm} color={TextColor.White}>
        {station.stationData.currentCount || '-'}
      </Text>
      <Text size={TextSize.Sm}>{station.stationData.normalCount || '-'}</Text>
    </div>
  ) : null;

export default React.memo(StatusStationBody);
