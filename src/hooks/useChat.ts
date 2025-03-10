
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  includeRouteSteps?: boolean;
  showActionButtons?: boolean;
  showTravelOptions?: boolean;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingSeatsInput, setAwaitingSeatsInput] = useState(false);
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const [showAssociationMap, setShowAssociationMap] = useState(false);
  const [showRouteSteps, setShowRouteSteps] = useState(false);
  const [showCombinationRoute, setShowCombinationRoute] = useState(false);
  const [showCalendarInfo, setShowCalendarInfo] = useState(false);
  const { toast } = useToast();

  const resetChat = () => {
    console.log("Reset chat triggered");
    setMessages([]);
    setAwaitingSeatsInput(false);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    setShowRouteSteps(false);
    setShowCombinationRoute(false);
    setShowCalendarInfo(false);
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      let response = "Jag är bara en prototyp än så länge, så jag är lite begränsad i mina svar. Här är några saker du kan prova:";
      let includeRouteSteps = false;
      let showActionButtons = true;
      
      if (awaitingSeatsInput) {
        response = "Vill du erbjuda platser din vanligaste sträcka, från hemmet till jobbet?";
        setAwaitingSeatsInput(false);
        showActionButtons = false;
      } else if (content.toLowerCase().includes("samåk") || content.toLowerCase().includes("skjuts")) {
        response = "Det finns massa samåkningsmöjligheter just nu! Vill du ha en sammanfattad lista utifrån din GPS-position eller ett specifikt datum och plats?";
        showActionButtons = false;
      } else if (content.toLowerCase().includes("buss") || content.toLowerCase().includes("spårvagn") || content.toLowerCase().includes("västtrafik")) {
        response = "Västtrafik har flera avgångar som kan passa dig. Buss 16 avgår var 10:e minut från centralen. Vill du se hela tidtabellen?";
        showActionButtons = false;
      } else if (content.toLowerCase().includes("kombination") || content.toLowerCase().includes("både och")) {
        response = "För en kombinerad resa rekommenderar jag att ta samåkning till Korsvägen och sedan buss 50 till ditt slutmål. Detta sparar både tid och pengar samtidigt som det minskar miljöpåverkan!";
        includeRouteSteps = true;
        setShowCombinationRoute(true);
        showActionButtons = false;
      } else if (content.toLowerCase().includes("hej") || content.toLowerCase().includes("hallå")) {
        response = `Hej! Jag är Åke, din reseassistent. Jag kan hjälpa dig med både kollektivtrafik via Västtrafik och samåkning via Skjutsgruppen. Vad behöver du hjälp med idag?`;
        showActionButtons = true; // Show buttons for greeting
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        includeRouteSteps,
        showActionButtons
      };

      setMessages([...newMessages, assistantMessage]);
      setShowTravelOptions(false);
      setShowAssociationMap(false);
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

  return {
    messages,
    isLoading,
    awaitingSeatsInput,
    showTravelOptions,
    showAssociationMap,
    showRouteSteps,
    showCombinationRoute,
    showCalendarInfo,
    setMessages,
    setIsLoading,
    setAwaitingSeatsInput,
    setShowTravelOptions,
    setShowAssociationMap,
    setShowRouteSteps,
    setShowCombinationRoute,
    setShowCalendarInfo,
    resetChat,
    handleSendMessage
  };
};
