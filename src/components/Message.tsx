
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import StepByStepRoute from './StepByStepRoute';
import ActionButtons from './ActionButtons';
import TravelOption from './TravelOption';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
  includeRouteSteps?: boolean;
  showActionButtons?: boolean;
  showTravelOptions?: boolean;
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
  showTravelOptions,
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
                
                {showTravelOptions && (
                  <div className="mt-4">
                    <div className="flex flex-col md:flex-row md:gap-4 justify-center items-center mt-4">
                      <TravelOption type="bus" title="Buss från Orkestervägen" description="Från Orkestervägen kl 06.30" mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2132.743946285806!2d12.809598277112915!3d57.71898857503214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0b11ae6a52f%3A0xe20e4d28a17b46f9!2sOkesterv%C3%A4gen%2C%20506%2030%20Bor%C3%A5s!5e0!3m2!1ssv!2sse!4v1714571582726!5m2!1ssv!2sse" />
                      
                      <div className="py-2 text-center">eller</div>
                      
                      <TravelOption type="carpool" title="Samåkning med Filippa" description="Från Borås C till Göteborg C kl 07.00. Filippa från Friluftsfrämjandet." mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2131.8453814670745!2d12.930329577113534!3d57.72124517502991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa0873a5efbcb%3A0xd02cc1aca5728a2f!2sBor%C3%A5s%20C!5e0!3m2!1ssv!2sse!4v1714572046398!5m2!1ssv!2sse" />
                    </div>
                  </div>
                )}
                
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
