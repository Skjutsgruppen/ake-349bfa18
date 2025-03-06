
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import WelcomeView from '@/components/WelcomeView';
import ChatContent from '@/components/ChatContent';
import { useChat } from '@/hooks/useChat';
import { useSidebar } from '@/hooks/useSidebar';
import { useActionHandlers } from '@/hooks/useActionHandlers';

const Chat = () => {
  const navigate = useNavigate();
  const { 
    messages, 
    isLoading, 
    showTravelOptions, 
    showAssociationMap, 
    showRouteSteps,
    setMessages,
    setIsLoading,
    setAwaitingSeatsInput,
    setShowTravelOptions,
    setShowAssociationMap,
    setShowRouteSteps,
    resetChat, 
    handleSendMessage 
  } = useChat();
  
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  
  const { 
    userName,
    handleOfferSeatClick,
    handleToWorkClick,
    handleFromHereClick,
    handleAssociationActivityClick,
    handleAnalysisClick,
    handleToHomeClick
  } = useActionHandlers({
    setMessages,
    setIsLoading,
    setAwaitingSeatsInput,
    setShowTravelOptions,
    setShowAssociationMap,
    setShowRouteSteps
  });

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (!savedName) {
      navigate('/');
    }
  }, [navigate]);

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
            <WelcomeView 
              userName={userName}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onAnalysisClick={handleAnalysisClick}
              onOfferSeatClick={handleOfferSeatClick}
              onToWorkClick={handleToWorkClick}
              onFromHereClick={handleFromHereClick}
              onAssociationActivityClick={handleAssociationActivityClick}
              onToHomeClick={handleToHomeClick}
            />
          ) : (
            <ChatContent 
              messages={messages}
              isLoading={isLoading}
              showTravelOptions={showTravelOptions}
              showAssociationMap={showAssociationMap}
              showRouteSteps={showRouteSteps}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
