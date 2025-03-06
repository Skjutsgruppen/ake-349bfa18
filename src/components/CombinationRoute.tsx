
import React from 'react';
import TravelOption from './TravelOption';

type RouteStep = {
  type: 'bus' | 'carpool' | 'walk';
  title: string;
  description: string;
  mapUrl?: string;
};

interface CombinationRouteProps {
  steps: RouteStep[];
}

const CombinationRoute: React.FC<CombinationRouteProps> = ({ steps }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4 mb-6">
      {steps.map((step, index) => (
        <div key={index} className="w-full relative">
          <TravelOption 
            type={step.type} 
            title={step.title} 
            description={step.description}
            mapUrl={step.mapUrl}
          />
          
          {index < steps.length - 1 && (
            <div className="absolute left-[22px] top-full h-8 border-l-2 border-dashed border-gray-500"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CombinationRoute;
