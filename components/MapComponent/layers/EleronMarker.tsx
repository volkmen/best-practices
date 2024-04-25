import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { MapServiceContext } from 'contexts/MapServiceContext';

export interface EleronMarkerProps {
  id: string;
  coords: Coordinate;
  color?: string;
}

const EleronMarker: React.FC<EleronMarkerProps> = ({ id, coords, color = '#ffffff' }) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (mapService && coords) {
      mapService?.addMarker({ id, coords, color, srcIcon: `${process.env.PUBLIC_URL}/plane.svg`, label: 'ELERON' });

      return () => mapService?.removeMarker(id);
    }
  }, [mapService, coords, id]);

  return null;
};

export default EleronMarker;
