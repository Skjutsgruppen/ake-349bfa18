
import { useState, useEffect } from 'react';
import { useTransportActions } from './useTransportActions';
import { useLocationActions } from './useLocationActions';
import { useAnalyticsActions } from './useAnalyticsActions';
import { useSocialActions } from './useSocialActions';
import { ActionHandlerProps } from './actionTypes';

export const useActionHandlers = (props: ActionHandlerProps) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const { 
    handleOfferSeatClick, 
    handleToWorkClick,
    handleToHomeClick 
  } = useTransportActions(props);
  
  const { handleFromHereClick } = useLocationActions(props);
  const { handleAnalysisClick } = useAnalyticsActions(props);
  const { handleAssociationActivityClick } = useSocialActions(props);

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
