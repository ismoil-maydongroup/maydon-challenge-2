'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageDTO } from '@/src/application/dtos/MessageDTO';

export function useSocket(nickname: string | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const messagesRef = useRef<MessageDTO[]>([]);

  useEffect(() => {
    if (!nickname) return; // Don't connect until nickname is set

    // Use nickname as userId
    setUserId(nickname);

    // Connect to Socket.io server
    const socketUrl = 
      typeof window !== 'undefined' 
        ? (process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin)
        : (process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000');
    const newSocket = io(socketUrl);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('messageHistory', (history: MessageDTO[]) => {
      messagesRef.current = history;
      setMessages([...history]);
    });

    newSocket.on('newMessage', (message: MessageDTO) => {
      messagesRef.current = [...messagesRef.current, message];
      setMessages([...messagesRef.current]);
    });

    newSocket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [nickname]);

  const sendMessage = (content: string) => {
    if (socket && isConnected && content.trim()) {
      socket.emit('sendMessage', { content, userId });
    }
  };

  const sendLLMRequest = (message: string) => {
    if (socket && isConnected && message.trim()) {
      socket.emit('llmRequest', { message, userId });
    }
  };

  return {
    socket,
    messages,
    isConnected,
    userId,
    sendMessage,
    sendLLMRequest,
  };
}

