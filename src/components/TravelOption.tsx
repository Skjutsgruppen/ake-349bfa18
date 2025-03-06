
import React from 'react';
import { Bus, Car, PersonStanding } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TravelOptionProps {
  type: 'bus' | 'carpool' | 'walk';
  title: string;
  description: string;
  mapUrl?: string;
}

const TravelOption: React.FC<TravelOptionProps> = ({ type, title, description, mapUrl }) => {
  const getIcon = () => {
    switch (type) {
      case 'bus':
        return <Bus className="h-5 w-5 text-blue-400 mr-2" />;
      case 'carpool':
        return <Car className="h-5 w-5 text-green-400 mr-2" />;
      case 'walk':
        return <PersonStanding className="h-5 w-5 text-purple-400 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 w-full">
      <div className="flex items-center mb-2">
        {getIcon()}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-gray-300 mb-3 text-sm">{description}</p>
      {mapUrl && (
        <div className="relative w-full h-32 overflow-hidden rounded-md mb-3">
          <iframe 
            src={mapUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map for ${title}`}
          ></iframe>
        </div>
      )}
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          className="border-gray-600 hover:bg-gray-700 text-gray-200 rounded-full"
        >
          Välj
        </Button>
      </div>
    </div>
  );
};

export default TravelOption;
