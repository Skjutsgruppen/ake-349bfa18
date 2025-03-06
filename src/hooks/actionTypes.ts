
import { Message } from '@/hooks/useChat';

export interface ActionHandlerProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: (isLoading: boolean) => void;
  setAwaitingSeatsInput: (awaiting: boolean) => void;
  setShowTravelOptions: (show: boolean) => void;
  setShowAssociationMap: (show: boolean) => void;
  setShowRouteSteps: (show: boolean) => void;
  setShowCombinationRoute: (show: boolean) => void;
  setShowCalendarInfo: (show: boolean) => void;
  resetChat?: () => void;
}
