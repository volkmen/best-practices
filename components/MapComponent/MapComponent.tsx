import React from 'react';
import { MapServiceContext } from 'contexts/MapServiceContext';
import { Coordinate } from 'ol/coordinate';
import { FeatureLineData } from './features/FeatureLine';
import { FeatureIconMarkerData } from './features/IconMarker';
import classNames from 'classnames';

import './MapComponent.scss';
import MapInstruments from 'pages/shared/MapIntsruments';
import { StyledComponent } from 'types';
import MapLayers from 'pages/shared/MapLayers';

const ELEM_ID = 'oi-map-id';

export interface MapLayerProp {
  coords: Coordinate;
  component: React.ReactNode;
  id: string;
  priority: number;
}

export enum FeatureType {
  Line = 'line',
  Marker = 'marker',
  Circle = 'circle',
  Polygon = 'polygon'
}

interface MapComponentProps extends StyledComponent {
  layers?: MapLayerProp[];
  children?: React.ReactNode;
  features?: {
    type: FeatureType;
    data: FeatureLineData | FeatureIconMarkerData;
  }[];
}

const BOTTOM_OFFSET = 12;

const MapComponent: React.FC<MapComponentProps> = ({ children, className }) => {
  const mapService = React.useContext(MapServiceContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      const { top } = ref.current.getBoundingClientRect();

      setContainerHeight(isFullScreen ? window.innerHeight + 17 : window.innerHeight - top - BOTTOM_OFFSET);
    }
  }, [isFullScreen]);

  React.useEffect(() => {
    if (mapService) {
      const setIsFullScreenCb = () => setTimeout(() => setIsFullScreen(true), 100);
      const setIsNotFullScreenCb = () => setTimeout(() => setIsFullScreen(false), 100);

      mapService.fullScreenControl.on('enterfullscreen', setIsFullScreenCb);
      mapService.fullScreenControl.on('leavefullscreen', setIsNotFullScreenCb);

      return () => {
        mapService.fullScreenControl.un('enterfullscreen', setIsFullScreenCb);
        mapService.fullScreenControl.un('leavefullscreen', setIsNotFullScreenCb);
      };
    }
  }, [mapService]);

  React.useEffect(
    () => () => {
      mapService?.removeAllFeatures();
      mapService?.removeAllOverlays();
      mapService?.destroy();
    },
    []
  );

  React.useEffect(() => {
    if (containerHeight && mapService && ref.current && !isMounted) {
      mapService.show(ELEM_ID);
      setIsMounted(true);
    }
  }, [containerHeight, isMounted]);

  const style = React.useMemo(
    () => ({
      height: containerHeight
    }),
    [containerHeight]
  );

  return (
    <div className={className}>
      <MapInstruments>
        <div id='fullscreen' className='fullscreen'>
          <div id={ELEM_ID} ref={ref} style={style} className={classNames('overflow-hidden rounded-05')}>
            {children}
          </div>
        </div>
      </MapInstruments>
      <MapLayers className='position-absolute bottom-2 bg-dark right-2 p-2 px-3 border-radius-05' />
    </div>
  );
};

export default MapComponent;
