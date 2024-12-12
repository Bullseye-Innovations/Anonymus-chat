"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export function LandingHero() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Connect Anonymously, Chat Freely
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join the conversation instantly. No personal info required, just pick a username and start chatting.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              size="lg"
              onClick={() => router.push("/signin")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}