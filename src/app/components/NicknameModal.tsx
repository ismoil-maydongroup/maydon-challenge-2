'use client';

import { Modal, Input, Button, Form, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface NicknameModalProps {
  open: boolean;
  onComplete: (nickname: string) => void;
}

export function NicknameModal({ open, onComplete }: NicknameModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const nickname = values.nickname.trim();
      
      if (nickname.length < 2) {
        message.error('Nickname must be at least 2 characters long');
        return;
      }
      
      if (nickname.length > 20) {
        message.error('Nickname must be less than 20 characters');
        return;
      }

      setLoading(true);
      
      // Store nickname in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('chatNickname', nickname);
      }
      
      onComplete(nickname);
      setLoading(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal
      title="Enter Your Nickname"
      open={open}
      closable={false}
      maskClosable={false}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nickname"
          label="Choose a nickname"
          rules={[
            { required: true, message: 'Please enter a nickname' },
            { min: 2, message: 'Nickname must be at least 2 characters' },
            { max: 20, message: 'Nickname must be less than 20 characters' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your nickname"
            onPressEnter={handleKeyPress}
            autoFocus
            disabled={loading}
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            onKeyPress={handleKeyPress}
          >
            Join Chat
          </Button>
        </Form.Item>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Press Enter to join
        </p>
      </Form>
    </Modal>
  );
}

