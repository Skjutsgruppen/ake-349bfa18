
import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: MessageProps) => {
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
