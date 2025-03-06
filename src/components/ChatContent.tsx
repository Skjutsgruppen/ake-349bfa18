
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
        <MessageList messages={messages} />
        
        {showTravelOptions && (
          <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:gap-4 justify-center items-center">
              <TravelOption
                type="bus"
                title="Buss från Orkestervägen"
                description="Från Orkestervägen kl 06.30"
                mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2132.743946285806!2d12.809598277112915!3d57.71898857503214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0b11ae6a52f%3A0xe20e4d28a17b46f9!2sOkesterv%C3%A4gen%2C%20506%2030%20Bor%C3%A5s!5e0!3m2!1ssv!2sse!4v1714571582726!5m2!1ssv!2sse"
              />
              
              <div className="py-2 text-center">eller</div>
              
              <TravelOption
                type="carpool"
                title="Samåkning med Filippa"
                description="Från Borås C till Göteborg C kl 07.00. Filippa från Friluftsfrämjandet."
                mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2131.8453814670745!2d12.930329577113534!3d57.72124517502991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0873a5efbcb%3A0xd02cc1aca5728a2f!2sBor%C3%A5s%20C!5e0!3m2!1ssv!2sse!4v1714572046398!5m2!1ssv!2sse"
              />
            </div>
          </div>
        )}

        {showAssociationMap && (
          <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 mx-auto max-w-md">
              <div className="relative w-full h-64 overflow-hidden rounded-md mb-3">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d133999.46764172407!2d12.629131499999999!3d57.642073400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x465aa767a79be4b5%3A0x8d5de1841af730d7!2sOrkesterv%C3%A4gen%2C%20Bor%C3%A5s!3m2!1d57.72343!2d12.8946699!4m5!1s0x46500531216f1b07%3A0xdda2c3d4949082d6!2sScoutg%C3%A5rden%20Apelhult%2C%20Apelhultsv%C3%A4gen%2030%2C%20511%2070%20Rydal!3m2!1d57.5623101!2d12.6620986!5m1!1e2!5m1!1e2"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karta till Scoutgården Apelhult"
                ></iframe>
              </div>
              <div className="flex justify-end">
                <button 
                  className="border border-gray-600 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full"
                >
                  Välj
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showCalendarInfo && (
          <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <CalendarInfo />
          </div>
        )}
        
        {showRouteSteps && (
          <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <StepByStepRoute steps={routeSteps} />
          </div>
        )}

        {showCombinationRoute && (
          <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <h3 className="text-xl font-medium mb-4 text-center">Här är ett kombinationsalternativ:</h3>
            <CombinationRoute steps={combinationSteps} />
          </div>
        )}
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
