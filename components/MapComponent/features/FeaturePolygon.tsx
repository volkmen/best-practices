import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { MapServiceContext } from 'contexts/MapServiceContext';

export interface FeaturePolygonData {
  coords?: Coordinate[];
  id: string;
  color: string;
}

type FeaturePolygonProps = FeaturePolygonData;

const FeaturePolygon: React.FC<FeaturePolygonProps> = ({ id, coords }) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (coords) {
      // mapService?.addPolygonCircles({id: `polygon-${id}`, coords, color, radius: 5000});

      return () => {
        mapService?.removeFeature(`polygon-${id}`, 'line');
      };
    }
  }, [coords]);

  return null;
};

export default React.memo(FeaturePolygon);
