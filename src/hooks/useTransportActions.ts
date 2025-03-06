
import { useState, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { ActionHandlerProps } from './actionTypes';

export const useTransportActions = ({
  setMessages,
  setIsLoading,
  setAwaitingSeatsInput,
  setShowTravelOptions,
  setShowAssociationMap,
  setShowRouteSteps,
  setShowCombinationRoute,
  setShowCalendarInfo,
  resetChat
}: ActionHandlerProps) => {
  
  const handleOfferSeatClick = () => {
    // Reset chat if the function exists
    if (resetChat) resetChat();
    
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
    // Reset chat if the function exists
    if (resetChat) resetChat();
    
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

  const handleToHomeClick = () => {
    // Reset chat if the function exists
    if (resetChat) resetChat();
    
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
        content: `Jag ser att du befinner dig vid Bollebygd station och vill åka hem till Orkestervägen i Borås. Här är ett kombinationsalternativ:`,
        includeRouteSteps: true
      };
      
      setMessages(prevMessages => [...prevMessages, toHomeMessage]);
      setIsLoading(false);
      setShowRouteSteps(true);
    }, 1000);
  };

  return {
    handleOfferSeatClick,
    handleToWorkClick,
    handleToHomeClick
  };
};
