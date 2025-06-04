import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import esriConfig from '@arcgis/core/config';

interface MapPreviewProps {
  url: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({ url }) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const view = useRef<MapView | null>(null);

  useEffect(() => {
    if (mapDiv.current && !view.current) {
      // Configure CORS
      esriConfig.apiKey = "YOUR_API_KEY"; // Optional: Add your ArcGIS API key if needed

      // Create the map
      const map = new Map({
        basemap: "streets-vector"
      });

      // Create the view
      view.current = new MapView({
        container: mapDiv.current,
        map: map,
        zoom: 12
      });

      // Add the feature layer
      const featureLayer = new FeatureLayer({
        url: url
      });

      map.add(featureLayer);

      // Zoom to the feature layer's extent when loaded
      featureLayer.when(() => {
        if (featureLayer.fullExtent && view.current) {
          view.current.goTo(featureLayer.fullExtent);
        }
      });
    }

    return () => {
      if (view.current) {
        view.current.destroy();
        view.current = null;
      }
    };
  }, [url]);

  return (
    <div ref={mapDiv} className="w-full h-[400px] rounded-lg overflow-hidden" />
  );
};

export default MapPreview;