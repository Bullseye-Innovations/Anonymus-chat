"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "./chat-layout";
import { UserAvatar } from "./user-avatar";

type ChatSidebarProps = {
  onSelectUser: (user: User) => void;
};

const MOCK_USERS: User[] = [
  { id: "1", username: "Alice", online: true },
  { id: "2", username: "Bob", online: true },
  { id: "3", username: "Charlie", online: false },
];

export function ChatSidebar({ onSelectUser }: ChatSidebarProps) {
  return (
    <div className="w-80 border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Online Users</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="p-4 space-y-2">
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              className="w-full p-2 flex items-center space-x-4 hover:bg-accent rounded-lg transition-colors"
              onClick={() => onSelectUser(user)}
            >
              <UserAvatar username={user.username} online={user.online} />
              <span className="flex-1 text-left">{user.username}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}