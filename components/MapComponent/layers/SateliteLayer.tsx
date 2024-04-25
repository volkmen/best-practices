import React from 'react';
import { RiBaseStationFill } from 'react-icons/ri';
import { Coordinate } from 'ol/coordinate';
import { COLORS } from 'consts';
import useAddStationRadiusCircle from './useAddStationRadiusCircle';

interface SateliteLayerProps {
  coords: Coordinate;
  id: number;
  color?: string;
}

const SateliteLayer: React.FC<SateliteLayerProps> = ({ coords, id, color = COLORS.primary }) => {
  useAddStationRadiusCircle({ id: `${id}-20`, coords, color: COLORS.white, radius: 10 });
  useAddStationRadiusCircle({ id: `${id}-40`, coords, color: COLORS.warning, radius: 20 });
  useAddStationRadiusCircle({ id: `${id}-60`, coords, color: COLORS.success, radius: 30 });

  return <RiBaseStationFill color={color} size={20} />;
};

export default React.memo(SateliteLayer);
