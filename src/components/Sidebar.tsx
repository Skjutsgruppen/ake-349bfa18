
import { Menu, Globe, ChevronDown, Clock, Car, Bus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onApiKeyChange: (apiKey: string) => void;
  resetChat: () => void;
}

const Sidebar = ({ isOpen, onToggle, onApiKeyChange, resetChat }: SidebarProps) => {
  const [apiKey, setApiKey] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const timeframes = [
    { title: "Igår", items: ["Kollektivtrafik till Göteborg"] },
    { 
      title: "Senaste 7 dagarna", 
      items: [
        "Samåkning till Stockholm",
        "Västtrafik tidtabell",
        "Buss 16 hållplatser",
        "Pendlingsinformation"
      ] 
    },
    {
      title: "Senaste 30 dagarna",
      items: [
        "Kombinerad resa till Landvetter",
        "Hitta samåkning Borås",
        "Miljövänligt resande",
        "Kollektivtrafik Mölndal",
        "Billig transport Lerum"
      ]
    }
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };
  
  // Calculate sidebar width based on screen size and isOpen state
  const sidebarWidth = isOpen ? (screenWidth < 768 ? screenWidth * 0.8 : 256) : 0;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-chatgpt-sidebar transition-all duration-300",
        isOpen ? "" : "w-0"
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chatthistorik">
        <div className="flex justify-between flex h-[60px] items-center">
          <button onClick={onToggle} className="h-10 rounded-lg px-2 text-token-text-secondary hover:bg-token-sidebar-surface-secondary">
            <Menu className="h-5 w-5" />
          </button>
          {isOpen && (
            <button onClick={resetChat} className="flex items-center gap-2 rounded-lg px-3 py-1 text-sm hover:bg-token-sidebar-surface-secondary">
              <Pencil className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          {isOpen && (
            <div className="p-2 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Platsinställningar</span>
              </div>
              <Input
                type="text"
                placeholder="Ange din hemort"
                value={apiKey}
                onChange={handleApiKeyChange}
                className="bg-[#2F2F2F] border-none"
              />
            </div>
          )}

          <div className="bg-token-sidebar-surface-primary pt-0">
            <div className="flex flex-col gap-2 px-2 py-2">
              <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                <div className="h-6 w-6 flex items-center justify-center">
                  <Car className="h-4 w-4" />
                </div>
                <span className="text-sm">Samåkning</span>
              </div>
              <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                <div className="h-6 w-6 flex items-center justify-center">
                  <Bus className="h-4 w-4" />
                </div>
                <span className="text-sm">Kollektivtrafik</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {timeframes.map((timeframe) => (
                <div key={timeframe.title}>
                  <div className="px-3 py-2 text-xs text-gray-500">{timeframe.title}</div>
                  {timeframe.items.map((item) => (
                    <div key={item} className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
