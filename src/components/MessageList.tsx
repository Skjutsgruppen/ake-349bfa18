
import React, { useEffect, useRef } from 'react';
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
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
      {/* This empty div serves as a scroll target */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
