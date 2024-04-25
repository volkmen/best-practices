import React from 'react';
import FeatureLine, { FeatureLineData } from './features/FeatureLine';
import IconMarker, { FeatureIconMarkerData } from './features/IconMarker';
import { FeatureType } from './MapComponent';

interface MapFeaturesProps {
  features?: {
    type: FeatureType;
    data: FeatureLineData | FeatureIconMarkerData;
  }[];
  children: React.ReactNode;
}

const MapFeatures: React.FC<MapFeaturesProps> = ({ features, children }) => {
  const featuresData = React.useMemo<{ [key: string]: (FeatureLineData | FeatureIconMarkerData)[] }>(
    () =>
      (features || []).reduce<{ [key: string]: (FeatureLineData | FeatureIconMarkerData)[] }>(
        (acc, feature) => {
          const key = feature.type;

          if (acc[key]) {
            acc[feature.type].push(feature.data);
          }

          return acc;
        },
        { line: [], marker: [] }
      ),
    [features]
  );

  return (
    <>
      {featuresData.line?.map(featuredData => (
        <FeatureLine key={featuredData.id} data={featuredData as FeatureLineData} />
      ))}
      {featuresData.marker?.map(featuredData => (
        <IconMarker key={featuredData.id} data={featuredData as FeatureIconMarkerData} />
      ))}
      {children}
    </>
  );
};

export default MapFeatures;
