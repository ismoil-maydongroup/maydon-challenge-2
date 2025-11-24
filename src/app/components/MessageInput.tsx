'use client';

import { Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TextArea } = Input;

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <Space.Compact className="w-full">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="h-auto"
        >
          Send
        </Button>
      </Space.Compact>
    </div>
  );
}

