import { useState, useEffect } from 'react';
import { Message } from '@/hooks/useChat';

interface ActionHandlersProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: (isLoading: boolean) => void;
  setAwaitingSeatsInput: (awaiting: boolean) => void;
  setShowTravelOptions: (show: boolean) => void;
  setShowAssociationMap: (show: boolean) => void;
  setShowRouteSteps: (show: boolean) => void;
  setShowCombinationRoute: (show: boolean) => void;
  setShowCalendarInfo: (show: boolean) => void;
}

export const useActionHandlers = ({
  setMessages,
  setIsLoading,
  setAwaitingSeatsInput,
  setShowTravelOptions,
  setShowAssociationMap,
  setShowRouteSteps,
  setShowCombinationRoute,
  setShowCalendarInfo
}: ActionHandlersProps) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleOfferSeatClick = () => {
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Jag vill erbjuda platser i min bil.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Hur många lediga platser har du?'
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
      setAwaitingSeatsInput(true);
    }, 1000);
  };

  const handleToWorkClick = () => {
    setIsLoading(true);
    setAwaitingSeatsInput(false);
    setShowAssociationMap(false);
    
    const hours = "19";
    const minutes = "07";
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa mig resa till jobbet.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const workTripMessage: Message = {
        role: 'assistant',
        content: `Jag ser att klockan nu är ${hours}.${minutes} så jag gissar att du funderar på resor till jobbet imorgon? Här är två alternativ mellan ditt hem och Volvo`
      };
      
      setMessages(prevMessages => [...prevMessages, workTripMessage]);
      setIsLoading(false);
      setShowTravelOptions(true);
    }, 1000);
  };

  const handleFromHereClick = () => {
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa mig resealternativ härifrån.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const fromHereMessage: Message = {
        role: 'assistant',
        content: `Jag ser att du befinner dig vid Bollebygd station. Här är olika resealternativ:

1. Buss 101 mot Landvetter avgår om 5 minuter från hållplats A
2. X3 mot Göteborg avgår om 12 minuter från hållplats B
3. Karin erbjuder samåkning till Borås med avgång om 15 minuter
4. Cykelpool har 2 lediga elcyklar vid stationens norra entré
5. Sven från Friluftsfrämjandet har plats i bilen till Ulricehamn med avgång kl 19.30`
      };
      
      setMessages(prevMessages => [...prevMessages, fromHereMessage]);
      setIsLoading(false);
    }, 1000);
  };

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

  const handleAnalysisClick = () => {
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

  const handleToHomeClick = () => {
    setIsLoading(true);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    
    const userMessage: Message = {
      role: 'user',
      content: 'Visa mig resealternativ till hem.'
    };
    
    setMessages([userMessage]);
    
    setTimeout(() => {
      const toHomeMessage: Message = {
        role: 'assistant',
        content: `Jag ser att du befinner dig vid Bollebygd station och vill åka hem till Orkestervägen i Borås. Här är ett kombinationsalternativ:`
      };
      
      setMessages(prevMessages => [...prevMessages, toHomeMessage]);
      setIsLoading(false);
      
      // Show the route steps UI
      setShowRouteSteps(true);
    }, 1000);
  };

  return {
    userName,
    handleOfferSeatClick,
    handleToWorkClick,
    handleFromHereClick,
    handleAssociationActivityClick,
    handleAnalysisClick,
    handleToHomeClick
  };
};
