
import { Car, MapPin, Briefcase, Home, Users, Sparkles } from "lucide-react";

interface ActionButtonsProps {
  onAnalysisClick: () => void;
}

const ActionButtons = ({ onAnalysisClick }: ActionButtonsProps) => {
  const actions = [
    { icon: <Car className="h-4 w-4 text-purple-400" />, label: "Erbjud plats" },
    { icon: <MapPin className="h-4 w-4 text-red-400" />, label: "Härifrån" },
    { icon: <Users className="h-4 w-4 text-blue-400" />, label: "Föreningsaktivitet" },
    { icon: <Briefcase className="h-4 w-4 text-green-400" />, label: "Till jobbet" },
    { icon: <Home className="h-4 w-4 text-yellow-400" />, label: "Till hem" },
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
          key={action.label} 
          className="relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
