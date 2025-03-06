
import { Car, MapPin, Briefcase, Home, Users, Sparkles, Calendar } from "lucide-react";

interface ActionButtonsProps {
  onAnalysisClick: () => void;
  onOfferSeatClick: () => void;
  onToWorkClick: () => void;
  onFromHereClick?: () => void;
  onAssociationActivityClick?: () => void;
  onToHomeClick?: () => void;
}

const ActionButtons = ({ 
  onAnalysisClick, 
  onOfferSeatClick, 
  onToWorkClick, 
  onFromHereClick,
  onAssociationActivityClick,
  onToHomeClick
}: ActionButtonsProps) => {
  const actions = [
    { 
      icon: <Car className="h-4 w-4 text-purple-400" />, 
      label: "Erbjud plats",
      onClick: onOfferSeatClick
    },
    { 
      icon: <MapPin className="h-4 w-4 text-red-400" />, 
      label: "Härifrån",
      onClick: onFromHereClick
    },
    {
      icon: <Calendar className="h-4 w-4 text-blue-400" />,
      label: (
        <div className="flex flex-col items-start text-left">
          <span className="text-xs">Jag ser i din kalender att ni har Scoutmöte på Scoutgården i Apelhult imorgon. Vill du se vilka resealternativ som finns dit?</span>
          <div className="mt-1">
            <span className="text-xs text-gray-400">Åke hittade denna uppgift i din kalender.</span>
            <a href="#" className="text-xs underline ml-1">Här är dina inställningar</a>
          </div>
        </div>
      ),
      onClick: onAssociationActivityClick,
      custom: true
    },
    { 
      icon: <Briefcase className="h-4 w-4 text-green-400" />, 
      label: "Till jobbet",
      onClick: onToWorkClick
    },
    { 
      icon: <Home className="h-4 w-4 text-yellow-400" />, 
      label: "Till hem",
      onClick: onToHomeClick
    },
    { 
      icon: <Sparkles className="h-4 w-4 text-amber-400" />, 
      label: "Analys",
      onClick: onAnalysisClick
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      {actions.map((action) => (
        <button 
          key={typeof action.label === 'string' ? action.label : 'calendar-event'} 
          className={`relative flex ${action.custom ? 'flex-row w-full max-w-md' : 'h-[42px]'} items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]`}
          onClick={action.onClick}
        >
          <span className={`${action.custom ? 'mt-0.5' : ''}`}>
            {action.icon}
          </span>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
