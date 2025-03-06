
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import StepByStepRoute from './StepByStepRoute';
import CombinationRoute from './CombinationRoute';
import { Message as MessageType } from '@/hooks/useChat';

interface MessageProps extends MessageType {
  showRouteSteps?: boolean;
  showCombinationRoute?: boolean;
  routeSteps?: any[];
  combinationSteps?: any[];
}

const Message = ({ 
  role, 
  content, 
  showRouteSteps, 
  showCombinationRoute,
  routeSteps,
  combinationSteps
}: MessageProps) => {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 list-disc text-gray-200 my-2">
            {line.trim().substring(2)}
          </li>
        );
      }
      else if (line.trim()) {
        return <p key={index} className="my-1">{line}</p>;
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block' : ''}`}>
            <div className="message-content">
              {formatContent(content)}
            </div>
            
            {role === 'assistant' && showRouteSteps && routeSteps && (
              <div className="mt-4">
                <StepByStepRoute steps={routeSteps} />
              </div>
            )}
            
            {role === 'assistant' && showCombinationRoute && combinationSteps && (
              <div className="mt-4">
                <h3 className="text-xl font-medium mb-4">Här är ett kombinationsalternativ:</h3>
                <CombinationRoute steps={combinationSteps} />
              </div>
            )}
            
            {role === 'assistant' && <MessageActions />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
