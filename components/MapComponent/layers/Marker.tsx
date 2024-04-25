import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { MapServiceContext } from 'contexts/MapServiceContext';

interface MarkerProps {
  id: string | number;
  coords: Coordinate;
  src: string;
}

const Marker: React.FC<MarkerProps> = ({ id, coords, src }) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (mapService && coords) {
      mapService?.addIconMarker({
        id,
        coords,
        srcIcon: `${process.env.PUBLIC_URL}/${src}`
      });

      return () => mapService?.removeIconMarker(id);
    }
  }, [mapService, id, coords]);

  return null;
};

export default Marker;
