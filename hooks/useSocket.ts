"use client";

import { useEffect, useCallback } from 'react';
import { socket } from '@/lib/socket';
import { useToast } from '@/hooks/use-toast';

export function useSocket() {
  const { toast } = useToast();

  const sendMessage = useCallback((recipientId: string, content: string) => {
    socket.emit('private_message', {
      recipientId,
      content,
    });
  }, []);

  useEffect(() => {
    function onConnect() {
      toast({
        title: "Connected to chat server",
        duration: 2000,
      });
    }

    function onDisconnect() {
      toast({
        title: "Disconnected from chat server",
        variant: "destructive",
        duration: 2000,
      });
    }

    function onConnectError() {
      toast({
        title: "Failed to connect to chat server",
        variant: "destructive",
        duration: 2000,
      });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, [toast]);

  return { socket, sendMessage };
}