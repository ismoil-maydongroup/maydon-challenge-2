'use client';

import { Avatar, Typography } from 'antd';
import { MessageDTO } from '@/src/application/dtos/MessageDTO';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MessageListProps {
  messages: MessageDTO[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => {
        const isCurrentUser = message.userId === currentUserId;
        const isLLM = message.userId === 'llm-assistant';

        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`flex items-start gap-3 max-w-[70%] ${
                isCurrentUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar
                icon={isLLM ? <RobotOutlined /> : <UserOutlined />}
                className={isLLM ? 'bg-blue-500' : 'bg-gray-400'}
              />
              <div
                className={`rounded-lg px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : isLLM
                    ? 'bg-green-100 text-gray-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {!isCurrentUser && !isLLM && (
                  <div className="text-xs font-semibold mb-1 text-gray-600">
                    {message.userId}
                  </div>
                )}
                {isLLM && (
                  <div className="text-xs font-semibold mb-1 text-gray-600">
                    AI Assistant
                  </div>
                )}
                <Text
                  className={
                    isCurrentUser ? 'text-white' : isLLM ? 'text-gray-800' : 'text-gray-800'
                  }
                >
                  {message.content}
                </Text>
                <div
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

