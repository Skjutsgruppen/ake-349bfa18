
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

  // Reset messages and return to the start page
  const resetChat = () => {
    console.log("Reset chat triggered");
    setMessages([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAnalysisClick = () => {
    setIsLoading(true);
    
    // First, add a user action message
    const userMessage: Message = {
      role: 'user',
      content: 'Visa min reseanalys.'
    };
    
    setMessages([userMessage]);
    
    // Then simulate a delay before assistant response
    setTimeout(() => {
      const analysisMessage: Message = {
        role: 'assistant',
        content: `Jag har med din tillåtelse analyserat ditt resemönster de senaste två månaderna. Det här har jag kommit fram till så här långt:

- Lennart som är medlem i Svenska Turistföreningen har fyllt i att han jobbar på Schenker i Torslanda, som är nära ditt jobb. Han bor också i Borås och pendlar till Torslanda liknande tider som dig. Här finns potential för samåkning.

- Du brukar mathandla på tisdagar. Två av dina grannar mathandlar en timme senare än dig, också på tisdagar. Även här finns potential för samåkning.

- Eftersom du jobbar i skift kan du vissa dagar komma till jobbet med en kombination av Linje 100, Styr & Ställ och samåkning.

Vill du att vi går vidare med någon av dessa?`
      };
      
      setMessages(prevMessages => [...prevMessages, analysisMessage]);
      setIsLoading(false);
    }, 1000);
  };

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar}
        onApiKeyChange={() => {}}
        resetChat={resetChat}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-0'} flex flex-col h-screen`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} resetChat={resetChat} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4 overflow-hidden`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">Hej {userName}!</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons onAnalysisClick={handleAnalysisClick} />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} />
              </div>
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
