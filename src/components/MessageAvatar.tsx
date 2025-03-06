const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative flex h-full items-center justify-center rounded-full bg-[#00aeef] text-white">
        {/* Blue circle for Åke avatar */}
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;
