
import { Message } from '@/hooks/useChat';
import { ActionHandlerProps } from './actionTypes';

export const useSocialActions = ({
  setMessages,
  setIsLoading,
  setShowTravelOptions,
  setShowAssociationMap,
  setShowCalendarInfo
}: ActionHandlerProps) => {

  const handleAssociationActivityClick = () => {
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    setShowCalendarInfo(true);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa mig information om föreningsaktivitet.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const associationMessage: Message = {
        role: 'assistant',
        content: `Jag ser i din kalender att ni har Scoutmöte på Scoutgården i Apelhult imorgon. Vill du se vilka resealternativ som finns dit?`
      };
      
      setMessages(prevMessages => [...prevMessages, associationMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return {
    handleAssociationActivityClick
  };
};
