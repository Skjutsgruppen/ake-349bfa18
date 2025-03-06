
import { Menu, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
  resetChat: () => void;
}

const ChatHeader = ({ isSidebarOpen = true, resetChat }: ChatHeaderProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleReset = () => {
    resetChat();
  };

  return (
    <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <Menu className="h-5 w-5 cursor-pointer" onClick={handleReset} />
          )}
          <span 
            className="font-semibold cursor-pointer"
            onClick={handleReset}
          >
            Åke
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{userName}, Scouterna</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
