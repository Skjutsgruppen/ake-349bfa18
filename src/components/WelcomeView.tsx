
import React from 'react';
import ChatInput from './ChatInput';
import ActionButtons from './ActionButtons';

interface WelcomeViewProps {
  userName: string;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onAnalysisClick: () => void;
  onOfferSeatClick: () => void;
  onToWorkClick: () => void;
  onFromHereClick: () => void;
  onAssociationActivityClick: () => void;
  onToHomeClick: () => void;
}

const WelcomeView: React.FC<WelcomeViewProps> = ({
  userName,
  isLoading,
  onSendMessage,
  onAnalysisClick,
  onOfferSeatClick,
  onToWorkClick,
  onFromHereClick,
  onAssociationActivityClick,
  onToHomeClick
}) => {
  return (
    <div className="w-full max-w-3xl px-4 space-y-4">
      <div>
        <h1 className="mb-8 text-4xl font-semibold text-center">Hej {userName}!</h1>
        <ChatInput onSend={onSendMessage} isLoading={isLoading} />
      </div>
      <ActionButtons 
        onAnalysisClick={onAnalysisClick} 
        onOfferSeatClick={onOfferSeatClick}
        onToWorkClick={onToWorkClick}
        onFromHereClick={onFromHereClick}
        onAssociationActivityClick={onAssociationActivityClick}
        onToHomeClick={onToHomeClick}
        alignment="center" // Center alignment for welcome page
      />
    </div>
  );
};

export default WelcomeView;
