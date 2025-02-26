
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Image, Mic, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface ChatWindowProps {
  onBack: () => void;
  chatId: number;
}

const dummyMessages: Message[] = [
  {
    id: 1,
    content: "Hi there! How are you?",
    sender: 'other',
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    content: "I'm doing great, thanks! How about you?",
    sender: 'user',
    timestamp: '10:01 AM'
  },
  {
    id: 3,
    content: "Pretty good! Just working on some new features.",
    sender: 'other',
    timestamp: '10:02 AM'
  }
];

const ChatWindow = ({ onBack, chatId }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.visualViewport?.height || window.innerHeight;
      
      if (containerRef.current) {
        containerRef.current.style.height = `${windowHeight}px`;
      }
    };

    handleResize();
    scrollToBottom();

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
      style={{ height: '100vh', maxHeight: '-webkit-fill-available' }}
    >
      <div className="flex items-center p-4 border-b bg-white/95 backdrop-blur-sm dark:bg-slate-900/95">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="w-10 h-10 ring-2 ring-purple-500 ring-offset-2">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </Avatar>
        <div className="ml-3">
          <h2 className="font-semibold">Sarah Parker</h2>
          <p className="text-sm text-emerald-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col justify-end min-h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-3 shadow-sm message-appear ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white ml-12'
                    : 'bg-white dark:bg-slate-800 mr-12'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'user' 
                    ? 'text-purple-100' 
                    : 'text-slate-400'
                }`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-white/95 backdrop-blur-sm dark:bg-slate-900/95">
        <div className="p-2 flex gap-1 border-b">
          <Button variant="ghost" size="icon" className="shrink-0 text-slate-600 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0 text-slate-600 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0 text-slate-600 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 flex items-center gap-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-slate-200 focus:border-purple-500 focus:ring-purple-500 dark:border-slate-700 dark:focus:border-purple-400"
          />
          <Button 
            onClick={handleSend} 
            className="shrink-0 rounded-full bg-purple-500 hover:bg-purple-600 text-white" 
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
