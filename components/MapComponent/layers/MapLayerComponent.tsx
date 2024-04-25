import React from 'react';
import { MapLayerProp } from '../MapComponent';
import { MapServiceContext } from 'contexts/MapServiceContext';

interface MapLayerProps {
  layer: MapLayerProp;
}

const MapLayerComponent: React.FC<MapLayerProps> = ({ layer }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (parentRef.current) {
      mapService?.addOverlay({ elem: parentRef.current, ...layer });
    }

    return () => mapService?.removeOverlay(layer.id);
  }, []);

  return (
    <div>
      <div ref={parentRef} id={layer.id}>
        {layer.component}
      </div>
    </div>
  );
};

export default MapLayerComponent;
