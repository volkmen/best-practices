import React from 'react';
import { MapServiceContext } from 'contexts/MapServiceContext';
import { Coordinate } from 'ol/coordinate';
import { OverlayTooltipDetails } from 'services/types';

interface OverlayComponentProps {
  id: string;
  coords: Coordinate;
  priority: number;
  children: React.ReactNode;
  tooltipCb?: (args: OverlayTooltipDetails[]) => void;
  tooltipDetails?: OverlayTooltipDetails;
}

const OverlayComponent: React.FC<OverlayComponentProps> = ({
  id,
  coords,
  children,
  priority = 0,
  tooltipCb,
  tooltipDetails
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const mapService = React.useContext(MapServiceContext);

  React.useEffect(() => {
    if (parentRef.current) {
      mapService?.addOverlay({
        elem: parentRef.current,
        id,
        coords,
        priority,
        tooltipCb,
        tooltipDetails
      });
    }

    return () => mapService?.removeOverlay(id);
  }, []);

  return (
    <div>
      <div ref={parentRef} id={id}>
        {children}
      </div>
    </div>
  );
};

export default OverlayComponent;
