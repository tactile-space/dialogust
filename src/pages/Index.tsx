
import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="h-screen w-full bg-background">
      {selectedChat ? (
        <ChatWindow
          chatId={selectedChat}
          onBack={() => setSelectedChat(null)}
        />
      ) : (
        <ChatList onChatSelect={setSelectedChat} />
      )}
    </div>
  );
};

export default Index;
