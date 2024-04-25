import React from 'react';
import { MapServiceContext } from 'contexts/MapServiceContext';
import { Coordinate } from 'ol/coordinate';

const useAddStationRadiusCircle = ({
  id,
  coords,
  color,
  radius
}: {
  id: string | number;
  coords: Coordinate;
  color: string;
  radius: number;
}) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    mapService?.addCircle({ id, coords, color, radius: radius * 1000 });

    return () => mapService?.removeFeature(id, 'circle');
  }, [mapService]);
};

export default useAddStationRadiusCircle;
