
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import StepByStepRoute from './StepByStepRoute';
import ActionButtons from './ActionButtons';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
  includeRouteSteps?: boolean;
  showActionButtons?: boolean;
  onAnalysisClick?: () => void;
  onOfferSeatClick?: () => void;
  onToWorkClick?: () => void;
  onFromHereClick?: () => void;
  onAssociationActivityClick?: () => void;
  onToHomeClick?: () => void;
};

const Message = ({ 
  role, 
  content, 
  includeRouteSteps, 
  showActionButtons,
  onAnalysisClick,
  onOfferSeatClick,
  onToWorkClick,
  onFromHereClick,
  onAssociationActivityClick,
  onToHomeClick
}: MessageProps) => {
  
  // Define the steps for the route
  const routeSteps = [{
    type: 'walk' as const,
    description: 'Gå 5 minuter till Bollebygd Centrum (350m)'
  }, {
    type: 'bus' as const,
    description: 'Ta buss 101 mot Borås kl 19:15'
  }, {
    type: 'carpool' as const,
    description: 'Byt vid Borås Resecentrum till samåkning med Erika som kör till Sjöbo kl 19:45'
  }, {
    type: 'walk' as const,
    description: 'Promenad sista 400m till Orkestervägen (5 min)'
  }];

  // Function to format message content with proper bullet points
  const formatContent = (text: string) => {
    // Split the text by newlines
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Check if the line starts with a bullet point
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 list-disc text-gray-200 my-2">
            {line.trim().substring(2)}
          </li>
        );
      }
      // Return regular paragraph for non-bullet lines (if not empty)
      else if (line.trim()) {
        return <p key={index} className="my-1">{line}</p>;
      }
      // Return line break for empty lines
      return <br key={index} />;
    });
  };

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block' : ''}`}>
            {role === 'assistant' ? (
              <div className="message-content">
                {formatContent(content)}
                {includeRouteSteps && (
                  <div className="mt-4">
                    <StepByStepRoute steps={routeSteps} />
                  </div>
                )}
                {showActionButtons && (
                  <ActionButtons 
                    onAnalysisClick={onAnalysisClick}
                    onOfferSeatClick={onOfferSeatClick}
                    onToWorkClick={onToWorkClick}
                    onFromHereClick={onFromHereClick}
                    onAssociationActivityClick={onAssociationActivityClick}
                    onToHomeClick={onToHomeClick}
                    className="mt-6" // Add extra margin at the top
                    alignment="start" // Left alignment for chat message buttons
                  />
                )}
              </div>
            ) : (
              content
            )}
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;
