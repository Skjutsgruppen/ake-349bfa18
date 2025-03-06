
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: MessageProps) => {
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
            {role === 'assistant' && <MessageActions />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
