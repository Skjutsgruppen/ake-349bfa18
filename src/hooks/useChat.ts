
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingSeatsInput, setAwaitingSeatsInput] = useState(false);
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const [showAssociationMap, setShowAssociationMap] = useState(false);
  const [showRouteSteps, setShowRouteSteps] = useState(false);
  const [showCombinationRoute, setShowCombinationRoute] = useState(false);
  const { toast } = useToast();

  const resetChat = () => {
    console.log("Reset chat triggered");
    setMessages([]);
    setAwaitingSeatsInput(false);
    setShowTravelOptions(false);
    setShowAssociationMap(false);
    setShowRouteSteps(false);
    setShowCombinationRoute(false);
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

      let response = "Jag är bara en prototyp än så länge, så jag kan inte chatta längre än så här";
      
      if (awaitingSeatsInput) {
        response = "Vill du erbjuda platser din vanligaste sträcka, från hemmet till jobbet?";
        setAwaitingSeatsInput(false);
      } else if (content.toLowerCase().includes("samåk") || content.toLowerCase().includes("skjuts")) {
        response = "Vi har flera samåkningsmöjligheter från Skjutsgruppen! Det finns resor mellan Göteborg och Stockholm på fredag. Vill du veta mer om tillgängliga samåkningsalternativ?";
      } else if (content.toLowerCase().includes("buss") || content.toLowerCase().includes("spårvagn") || content.toLowerCase().includes("västtrafik")) {
        response = "Västtrafik har flera avgångar som kan passa dig. Buss 16 avgår var 10:e minut från centralen. Vill du se hela tidtabellen?";
      } else if (content.toLowerCase().includes("kombination") || content.toLowerCase().includes("både och")) {
        response = "För en kombinerad resa rekommenderar jag att ta samåkning till Korsvägen och sedan buss 50 till ditt slutmål. Detta sparar både tid och pengar samtidigt som det minskar miljöpåverkan!";
        setShowCombinationRoute(true);
      } else if (content.toLowerCase().includes("hej") || content.toLowerCase().includes("hallå")) {
        response = `Hej! Jag är Åke, din reseassistent. Jag kan hjälpa dig med både kollektivtrafik via Västtrafik och samåkning via Skjutsgruppen. Vad behöver du hjälp med idag?`;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response
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
    setMessages,
    setIsLoading,
    setAwaitingSeatsInput,
    setShowTravelOptions,
    setShowAssociationMap,
    setShowRouteSteps,
    setShowCombinationRoute,
    resetChat,
    handleSendMessage
  };
};
