
import { Message } from '@/hooks/useChat';
import { ActionHandlerProps } from './actionTypes';

export const useAnalyticsActions = ({
  setMessages,
  setIsLoading,
  setShowTravelOptions,
  setShowAssociationMap,
  resetChat
}: ActionHandlerProps) => {

  const handleAnalysisClick = () => {
    // Reset chat if the function exists
    if (resetChat) resetChat();
    
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa min reseanalys.'
    };
    
    setMessages([userMessage]);
    
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

  return {
    handleAnalysisClick
  };
};
