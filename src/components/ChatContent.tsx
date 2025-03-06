import React from 'react';
import MessageList from './MessageList';
import CombinationRoute from './CombinationRoute';
import CalendarInfo from './CalendarInfo';
import ChatInput from './ChatInput';
import { Message as MessageType } from '@/hooks/useChat';

interface ChatContentProps {
  messages: MessageType[];
  isLoading: boolean;
  showTravelOptions: boolean;
  showAssociationMap: boolean;
  showRouteSteps: boolean;
  showCombinationRoute: boolean;
  showCalendarInfo: boolean;
  onSendMessage: (message: string) => void;
  onAnalysisClick: () => void;
  onOfferSeatClick: () => void;
  onToWorkClick: () => void;
  onFromHereClick: () => void;
  onAssociationActivityClick: () => void;
  onToHomeClick: () => void;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isLoading,
  showTravelOptions,
  showAssociationMap,
  showCalendarInfo,
  showCombinationRoute,
  onSendMessage,
  onAnalysisClick,
  onOfferSeatClick,
  onToWorkClick,
  onFromHereClick,
  onAssociationActivityClick,
  onToHomeClick
}) => {
  // Define the steps for the combination route
  const combinationSteps = [{
    type: 'walk' as const,
    title: 'Promenad till busshållplats',
    description: 'Gå 5 minuter till Korsvägen (350m)'
  }, {
    type: 'bus' as const,
    title: 'Buss 50 mot Centrum',
    description: 'Avgår 08:15, ankomst Brunnsparken 08:30'
  }, {
    type: 'carpool' as const,
    title: 'Samåkning med Johan',
    description: 'Möt vid Brunnsparken kl 08:40, framme vid arbetsplatsen 09:00'
  }];

  return <>
      <div className="flex-1 overflow-y-auto">
        <MessageList 
          messages={messages} 
          onAnalysisClick={onAnalysisClick}
          onOfferSeatClick={onOfferSeatClick}
          onToWorkClick={onToWorkClick}
          onFromHereClick={onFromHereClick}
          onAssociationActivityClick={onAssociationActivityClick}
          onToHomeClick={onToHomeClick}
        />
        
        {showAssociationMap && <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 mx-auto max-w-md">
              <div className="relative w-full h-64 overflow-hidden rounded-md mb-3">
                <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d133999.46764172407!2d12.629131499999999!3d57.642073400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x465aa767a79be4b5%3A0x8d5de1841af730d7!2sOrkesterv%C3%A4gen%2C%20Bor%C3%A5s!3m2!1d57.72343!2d12.8946699!4m5!1s0x46500531216f1b07%3A0xdda2c3d4949082d6!2sScoutg%C3%A5rden%20Apelhult%2C%20Apelhultsv%C3%A4gen%2030%2C%20511%2070%20Rydal!3m2!1d57.5623101!2d12.6620986!5m1!1e2!5m1!1e2" className="absolute top-0 left-0 w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Karta till Scoutgården Apelhult"></iframe>
              </div>
              <div className="flex justify-end">
                <button className="border border-gray-600 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full">
                  Välj
                </button>
              </div>
            </div>
          </div>}
        
        {showCalendarInfo && <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <CalendarInfo />
          </div>}

        {showCombinationRoute && <div className="w-full max-w-3xl mx-auto px-4 py-4">
            <h3 className="text-xl font-medium mb-4 text-center">Här är ett kombinationsalternativ:</h3>
            <CombinationRoute steps={combinationSteps} />
          </div>}
      </div>
      
      <div className="w-full max-w-3xl mx-auto px-4 py-2">
        <ChatInput onSend={onSendMessage} isLoading={isLoading} />
      </div>
      <div className="text-xs text-center text-gray-500 py-2">
        Det här är en prototyp av Åke
      </div>
    </>;
};

export default ChatContent;
