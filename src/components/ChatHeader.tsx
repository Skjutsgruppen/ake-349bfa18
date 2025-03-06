
import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${!isSidebarOpen ? 'ml-24' : ''}`}>Åke</span>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Birgit, Scouterna</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
