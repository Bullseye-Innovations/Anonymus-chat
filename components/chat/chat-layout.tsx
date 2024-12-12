"use client";

import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { useState } from "react";

export type User = {
  id: string;
  username: string;
  online: boolean;
};

export function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}