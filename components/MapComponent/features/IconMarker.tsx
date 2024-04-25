import React from 'react';
import { MapServiceContext } from 'contexts/MapServiceContext';
import { Coordinate } from 'ol/coordinate';
import { COLORS } from 'consts';

export interface FeatureIconMarkerData {
  id: string;
  coords: Coordinate;
  color?: string;
  srcIcon: string;
}

interface DroneMarkerProps {
  data: FeatureIconMarkerData;
}

const IconMarker: React.FC<DroneMarkerProps> = ({ data: { id, coords, srcIcon, color = COLORS.danger } }) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (mapService && coords) {
      mapService?.addMarker({ id, coords, color, srcIcon });

      return () => mapService?.removeMarker(id);
    }
  }, [mapService, coords, id]);

  return null;
};

export default React.memo(IconMarker);
