
import { Message } from '@/hooks/useChat';
import { ActionHandlerProps } from './actionTypes';

export const useLocationActions = ({
  setMessages,
  setIsLoading,
  setShowTravelOptions,
  setShowAssociationMap,
  setShowRouteSteps
}: ActionHandlerProps) => {

  const handleFromHereClick = () => {
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    setShowRouteSteps(false);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa mig resealternativ härifrån.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const fromHereMessage: Message = {
        role: 'assistant',
        content: `Jag ser att du befinner dig vid Bollebygd station och vill se resealternativ härifrån. Här är en rutt till Orkestervägen i Borås:`,
        includeRouteSteps: true
      };
      
      setMessages(prevMessages => [...prevMessages, fromHereMessage]);
      setIsLoading(false);
      setShowRouteSteps(true);
    }, 1000);
  };

  return {
    handleFromHereClick
  };
};
