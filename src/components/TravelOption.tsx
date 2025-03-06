
import React from 'react';
import { Bus, Car } from 'lucide-react';

interface TravelOptionProps {
  type: 'bus' | 'carpool';
  title: string;
  description: string;
  mapUrl: string;
}

const TravelOption: React.FC<TravelOptionProps> = ({ type, title, description, mapUrl }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 mb-4 max-w-md w-full">
      <div className="flex items-center mb-2">
        {type === 'bus' ? (
          <Bus className="h-5 w-5 text-blue-400 mr-2" />
        ) : (
          <Car className="h-5 w-5 text-green-400 mr-2" />
        )}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-gray-300 mb-3 text-sm">{description}</p>
      <div className="relative w-full h-32 overflow-hidden rounded-md">
        <iframe 
          src={mapUrl}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map for ${title}`}
        ></iframe>
      </div>
    </div>
  );
};

export default TravelOption;
