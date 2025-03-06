
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    } else {
      // Redirect to welcome page if no name is set
      navigate('/');
    }
  }, [navigate]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen skriv ett meddelande",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a response based on the user's message
      let response = "Jag förstår inte riktigt din fråga. Kan du försöka omformulera den?";
      
      if (content.toLowerCase().includes("samåk") || content.toLowerCase().includes("skjuts")) {
        response = "Vi har flera samåkningsmöjligheter från Skjutsgruppen! Det finns resor mellan Göteborg och Stockholm på fredag. Vill du veta mer om tillgängliga samåkningsalternativ?";
      } else if (content.toLowerCase().includes("buss") || content.toLowerCase().includes("spårvagn") || content.toLowerCase().includes("västtrafik")) {
        response = "Västtrafik har flera avgångar som kan passa dig. Buss 16 avgår var 10:e minut från centralen. Vill du se hela tidtabellen?";
      } else if (content.toLowerCase().includes("kombination") || content.toLowerCase().includes("både och")) {
        response = "För en kombinerad resa rekommenderar jag att ta samåkning till Korsvägen och sedan buss 50 till ditt slutmål. Detta sparar både tid och pengar samtidigt som det minskar miljöpåverkan!";
      } else if (content.toLowerCase().includes("hej") || content.toLowerCase().includes("hallå")) {
        response = `Hej ${userName}! Jag är Åke, din reseassistent. Jag kan hjälpa dig med både kollektivtrafik via Västtrafik och samåkning via Skjutsgruppen. Vad behöver du hjälp med idag?`;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Fel",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">Hej {userName}!</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons />
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="text-xs text-center text-gray-500 py-2">
                Det här är en prototyp av Åke
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
