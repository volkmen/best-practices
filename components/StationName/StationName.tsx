import React from 'react';
import Text, { TextColor, TextSize } from '../Text/Text';
import { StationModel, StyledComponent } from 'types';
import './StationModel.scss';
import classNames from 'classnames';

interface StationNameProps extends StyledComponent {
  station: StationModel;
}

const StationName: React.FC<StationNameProps> = ({ station, className }) => (
  <div className={classNames('align-self-center d-inline-block uppercase', className)}>
    <Text color={TextColor.White} size={TextSize.MdLg} className='d-inline-block'>
      {station.name}
    </Text>
  </div>
);

export default React.memo(StationName);
