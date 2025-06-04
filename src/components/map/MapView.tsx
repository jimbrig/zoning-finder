import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix Leaflet default icon path issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = Icon.Default.prototype;
DefaultIcon.imagePath = '';
Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow
});

interface MapPreviewProps {
  url: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({ url }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [bounds, setBounds] = useState<[[number, number], [number, number]] | null>(null);

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const queryUrl = `${url}/0/query?where=1%3D1&outFields=*&f=geojson&returnGeometry=true`;
        const response = await fetch(queryUrl);
        const data = await response.json();
        setGeoJsonData(data);

        // Calculate bounds from features
        if (data.features && data.features.length > 0) {
          let minLat = Infinity, maxLat = -Infinity;
          let minLng = Infinity, maxLng = -Infinity;

          data.features.forEach((feature: any) => {
            if (feature.geometry && feature.geometry.coordinates) {
              feature.geometry.coordinates[0].forEach((coord: number[]) => {
                minLng = Math.min(minLng, coord[0]);
                maxLng = Math.max(maxLng, coord[0]);
                minLat = Math.min(minLat, coord[1]);
                maxLat = Math.max(maxLat, coord[1]);
              });
            }
          });

          setBounds([[minLat, minLng], [maxLat, maxLng]]);
        }
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoJson();
  }, [url]);

  if (!bounds) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading map data...</p>
      </div>
    );
  }

  return (
    <MapContainer
      bounds={bounds}
      className="w-full h-[400px] rounded-lg z-0"
      style={{ background: '#f8f9fa' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={{
            fillColor: '#3B82F6',
            fillOpacity: 0.3,
            color: '#2563EB',
            weight: 2
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapPreview;