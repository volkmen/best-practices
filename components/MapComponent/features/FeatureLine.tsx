import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { MapServiceContext } from 'contexts/MapServiceContext';

export interface FeatureLineData {
  coords: Coordinate[];
  id: string;
  color: string;
  label: string;
  radius?: number;
}

interface FeatureLineProps {
  data: FeatureLineData;
}

const FeatureLine: React.FC<FeatureLineProps> = ({ data }) => {
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (data.coords) {
      mapService?.addOrUpdateLine({ id: data.id, coords: data.coords, color: data.color });
      mapService?.addStartEndPointForLine(data);

      return () => mapService?.removeFeature(data.id, 'line');
    }
  }, [data]);

  return null;
};

export default React.memo(FeatureLine);
