
import React from 'react';
import MessageList from './MessageList';
import TravelOption from './TravelOption';
import StepByStepRoute from './StepByStepRoute';
import CombinationRoute from './CombinationRoute';
import CalendarInfo from './CalendarInfo';
import ChatInput from './ChatInput';
import { Message } from '@/hooks/useChat';

type TransportStep = {
  type: 'walk' | 'bus' | 'carpool';
  description: string;
};

interface ChatContentProps {
  messages: Message[];
  isLoading: boolean;
  showTravelOptions: boolean;
  showAssociationMap: boolean;
  showRouteSteps: boolean;
  showCombinationRoute: boolean;
  showCalendarInfo: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoading,
  showTravelOptions,
  showAssociationMap,
  showRouteSteps,
  showCombinationRoute,
  showCalendarInfo,
  onSendMessage
}) => {
  // Define the steps for the route
  const routeSteps = [
    {
      type: 'walk' as const,
      description: 'Gå 5 minuter till Bollebygd Centrum (350m)'
    },
    {
      type: 'bus' as const,
      description: 'Ta buss 101 mot Borås kl 19:15'
    },
    {
      type: 'carpool' as const,
      description: 'Byt vid Borås Resecentrum till samåkning med Erika som kör till Sjöbo kl 19:45'
    },
    {
      type: 'walk' as const,
      description: 'Promenad sista 400m till Orkestervägen (5 min)'
    }
  ];

  // Define the steps for the combination route
  const combinationSteps = [
    {
      type: 'walk' as const,
      title: 'Promenad till busshållplats',
      description: 'Gå 5 minuter till Korsvägen (350m)'
    },
    {
      type: 'bus' as const,
      title: 'Buss 50 mot Centrum',
      description: 'Avgår 08:15, ankomst Brunnsparken 08:30'
    },
    {
      type: 'carpool' as const,
      title: 'Samåkning med Johan',
      description: 'Möt vid Brunnsparken kl 08:40, framme vid arbetsplatsen 09:00'
    }
  ];

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <MessageList 
          messages={messages} 
          showTravelOptions={showTravelOptions}
          showAssociationMap={showAssociationMap}
          showRouteSteps={showRouteSteps}
          showCombinationRoute={showCombinationRoute}
          showCalendarInfo={showCalendarInfo}
          routeSteps={routeSteps}
          combinationSteps={combinationSteps}
        />
      </div>
      
      <div className="w-full max-w-3xl mx-auto px-4 py-2">
        <ChatInput onSend={onSendMessage} isLoading={isLoading} />
      </div>
      <div className="text-xs text-center text-gray-500 py-2">
        Det här är en prototyp av Åke
      </div>
    </>
  );
};

export default ChatContent;
