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

  // Helper function to extract coordinates from any GeoJSON geometry
  const extractCoordinates = (geometry: any): number[][] => {
    if (!geometry || !geometry.type || !geometry.coordinates) {
      return [];
    }

    switch (geometry.type) {
      case 'Point':
        return [geometry.coordinates];
      case 'LineString':
        return geometry.coordinates;
      case 'Polygon':
        return geometry.coordinates.flat();
      case 'MultiPoint':
        return geometry.coordinates;
      case 'MultiLineString':
        return geometry.coordinates.flat();
      case 'MultiPolygon':
        return geometry.coordinates.flat(2);
      default:
        return [];
    }
  };

  // Helper function to validate coordinate
  const isValidCoordinate = (coord: number[]): boolean => {
    return coord.length >= 2 &&
           !isNaN(coord[0]) && !isNaN(coord[1]) &&
           isFinite(coord[0]) && isFinite(coord[1]) &&
           coord[0] >= -180 && coord[0] <= 180 &&
           coord[1] >= -90 && coord[1] <= 90;
  };

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const queryUrl = `${url}/0/query?where=1%3D1&outFields=*&f=geojson&returnGeometry=true`;
        const response = await fetch(queryUrl);
        const data = await response.json();
        setGeoJsonData(data);

        // Calculate bounds from features
        if (data.features && data.features.length > 0) {
          let validCoordinates: number[][] = [];

          // Extract and validate coordinates from all features
          data.features.forEach((feature: any) => {
            if (feature.geometry) {
              const coords = extractCoordinates(feature.geometry);
              validCoordinates.push(...coords.filter(isValidCoordinate));
            }
          });

          // Only set bounds if we have valid coordinates
          if (validCoordinates.length > 0) {
            const minLat = Math.min(...validCoordinates.map(c => c[1]));
            const maxLat = Math.max(...validCoordinates.map(c => c[1]));
            const minLng = Math.min(...validCoordinates.map(c => c[0]));
            const maxLng = Math.max(...validCoordinates.map(c => c[0]));

            setBounds([[minLat, minLng], [maxLat, maxLng]]);
          }
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