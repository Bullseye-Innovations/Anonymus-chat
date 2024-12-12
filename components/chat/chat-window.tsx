"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { User } from "./chat-layout";
import { UserAvatar } from "./user-avatar";
import { useSocket } from "@/hooks/useSocket";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
};

type ChatWindowProps = {
  selectedUser: User | null;
};

export function ChatWindow({ selectedUser }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { socket, sendMessage } = useSocket();

  useEffect(() => {
    function onPrivateMessage(message: { content: string; from: string }) {
      if (selectedUser?.id === message.from) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: message.content,
            sender: selectedUser.username,
            timestamp: new Date(),
          },
        ]);
      }
    }

    socket.on('private_message', onPrivateMessage);

    return () => {
      socket.off('private_message', onPrivateMessage);
    };
  }, [selectedUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "You",
      timestamp: new Date(),
    };

    sendMessage(selectedUser.id, newMessage);
    setMessages([...messages, message]);
    setNewMessage("");
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/50">
        <p className="text-muted-foreground">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b flex items-center space-x-4">
        <UserAvatar username={selectedUser.username} online={selectedUser.online} />
        <div>
          <h2 className="font-semibold">{selectedUser.username}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedUser.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "You"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSend} className="p-4 border-t flex space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}