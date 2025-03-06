
import React from 'react';
import { Walking, Bus, Car } from 'lucide-react';

type TransportStep = {
  type: 'walk' | 'bus' | 'carpool';
  description: string;
};

interface StepByStepRouteProps {
  steps: TransportStep[];
}

const StepByStepRoute: React.FC<StepByStepRouteProps> = ({ steps }) => {
  const getIcon = (type: TransportStep['type']) => {
    switch (type) {
      case 'walk':
        return <Walking className="h-5 w-5 text-blue-400" />;
      case 'bus':
        return <Bus className="h-5 w-5 text-green-400" />;
      case 'carpool':
        return <Car className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4 mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="bg-gray-800/50 rounded-lg p-4 w-full">
            <div className="flex items-center">
              {getIcon(step.type)}
              <span className="ml-2">{step.description}</span>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="h-8 border-l-2 border-dashed border-gray-500 my-1"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepByStepRoute;
