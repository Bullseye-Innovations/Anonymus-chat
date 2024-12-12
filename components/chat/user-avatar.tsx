import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserAvatarProps = {
  username: string;
  online?: boolean;
};

export function UserAvatar({ username, online }: UserAvatarProps) {
  return (
    <div className="relative">
      <Avatar>
        <AvatarFallback>
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
}