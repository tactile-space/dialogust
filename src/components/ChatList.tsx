
import { useState } from 'react';
import { Search, Plus, Users, MessageSquarePlus, CircleDot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dummyChats = [
  {
    id: 1,
    name: "Sarah Parker",
    lastMessage: "Sure, let's meet tomorrow!",
    time: "2m ago",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "John Smith",
    lastMessage: "The project is coming along nicely",
    time: "1h ago",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Emma Wilson",
    lastMessage: "Did you see the latest updates?",
    time: "2h ago",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=256&h=256&auto=format&fit=crop"
  },
];

interface ChatListProps {
  onChatSelect: (chatId: number) => void;
}

const ChatList = ({ onChatSelect }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="flex gap-2 mb-4">
          <Button variant="outline" className="flex-1 chat-transition hover:bg-secondary">
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            Random Chat
          </Button>
          <Button variant="outline" className="flex-1 chat-transition hover:bg-secondary">
            <Users className="w-4 h-4 mr-2" />
            Enter Room
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 chat-transition"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className="flex items-center p-4 hover:bg-secondary cursor-pointer chat-transition border-b"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{chat.name}</h3>
                <div className="flex items-center gap-2">
                  {chat.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                  <span className="text-sm text-muted-foreground">{chat.time}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
