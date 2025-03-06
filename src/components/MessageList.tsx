
import React from 'react';
import Message from './Message';
import { Message as MessageType } from '@/hooks/useChat';

interface MessageListProps {
  messages: MessageType[];
  onAnalysisClick?: () => void;
  onOfferSeatClick?: () => void;
  onToWorkClick?: () => void;
  onFromHereClick?: () => void;
  onAssociationActivityClick?: () => void;
  onToHomeClick?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onAnalysisClick,
  onOfferSeatClick,
  onToWorkClick,
  onFromHereClick,
  onAssociationActivityClick,
  onToHomeClick
}) => {
  return (
    <div className="mx-auto max-w-3xl px-4">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          role={message.role} 
          content={message.content} 
          includeRouteSteps={message.includeRouteSteps}
          showActionButtons={message.showActionButtons}
          onAnalysisClick={onAnalysisClick}
          onOfferSeatClick={onOfferSeatClick}
          onToWorkClick={onToWorkClick}
          onFromHereClick={onFromHereClick}
          onAssociationActivityClick={onAssociationActivityClick}
          onToHomeClick={onToHomeClick}
        />
      ))}
    </div>
  );
};

export default MessageList;
