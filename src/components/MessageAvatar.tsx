
const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative h-8 w-8 flex items-center justify-center rounded-full bg-[#00aeef] text-white">
        <span className="text-sm font-semibold">Å</span>
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;
