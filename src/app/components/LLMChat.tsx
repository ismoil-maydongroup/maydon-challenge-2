'use client';

import { Button, Drawer, Input, Space, Typography, Spin, message as antMessage } from 'antd';
import { RobotOutlined, SendOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import { MessageDTO } from '@/src/application/dtos/MessageDTO';

const { TextArea } = Input;
const { Text } = Typography;

interface LLMChatProps {
  onSendLLMRequest: (message: string) => void;
  disabled?: boolean;
  messages: MessageDTO[];
  currentUserId: string;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function LLMChat({ onSendLLMRequest, disabled = false, messages, currentUserId }: LLMChatProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiConversation, setAiConversation] = useState<AIMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiConversation');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAiConversation(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })));
        } catch (e) {
          console.error('Failed to load AI conversation', e);
        }
      }
    }
  }, []);

  // Update conversation when new AI messages arrive
  useEffect(() => {
    setAiConversation((prev) => {
      const aiMessages: AIMessage[] = [...prev];
      let updated = false;
      
      messages.forEach((msg) => {
        if (msg.userId === 'llm-assistant') {
          // Check if this AI message is already in conversation
          const exists = aiMessages.some(m => m.id === msg.id && m.role === 'assistant');
          if (!exists) {
            aiMessages.push({
              id: msg.id,
              role: 'assistant',
              content: msg.content,
              timestamp: new Date(msg.timestamp),
            });
            updated = true;
          }
        }
      });

      if (updated) {
        // Sort by timestamp
        aiMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('aiConversation', JSON.stringify(aiMessages));
        }
        
        return aiMessages;
      }
      
      return prev;
    });
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiConversation, isDrawerOpen]);

  const handleSend = async () => {
    if (aiMessage.trim() && !disabled && !isLoading) {
      const userMessage: AIMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: aiMessage.trim(),
        timestamp: new Date(),
      };

      // Add user message to conversation immediately
      const updatedConversation = [...aiConversation, userMessage];
      setAiConversation(updatedConversation);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('aiConversation', JSON.stringify(updatedConversation));
      }
      
      setAiMessage('');
      setIsLoading(true);

      try {
        onSendLLMRequest(userMessage.content);
        
        // Wait a bit for the response to come through socket
        // The response will be added via the messages prop
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        setIsLoading(false);
        antMessage.error('Failed to send message to AI');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Button
        type="default"
        icon={<RobotOutlined />}
        onClick={() => setIsDrawerOpen(true)}
        disabled={disabled}
      >
        Chat with AI
      </Button>
      <Drawer
        title={
          <Space>
            <RobotOutlined className="text-blue-500" />
            <span>AI Assistant</span>
            {isLoading && <Spin size="small" />}
          </Space>
        }
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={400}
        className="ai-chat-drawer"
      >
        <div className="flex flex-col h-full">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
            {aiConversation.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <RobotOutlined className="text-4xl mb-2" />
                <Text type="secondary">
                  Start a conversation with the AI assistant. Ask anything!
                </Text>
              </div>
            ) : (
              aiConversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <RobotOutlined className="text-blue-500" />
                        <Text className="text-xs font-semibold text-gray-600">AI Assistant</Text>
                      </div>
                    )}
                    <Text className={msg.role === 'user' ? 'text-white' : 'text-gray-800'}>
                      {msg.content}
                    </Text>
                    <div
                      className={`text-xs mt-1 ${
                        msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 border border-gray-200">
                  <Space>
                    <Spin size="small" />
                    <Text type="secondary">AI is thinking...</Text>
                  </Space>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <Space.Compact className="w-full">
              <TextArea
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask the AI assistant..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                disabled={disabled || isLoading}
                className="flex-1"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={disabled || !aiMessage.trim() || isLoading}
                loading={isLoading}
                className="h-auto"
              >
                Send
              </Button>
            </Space.Compact>
            <Text type="secondary" className="text-xs mt-2 block">
              Press Enter to send
            </Text>
          </div>
        </div>
      </Drawer>
    </>
  );
}
