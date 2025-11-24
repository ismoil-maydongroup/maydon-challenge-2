"use client";

import { Layout, Badge, Typography, message as antMessage } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { useSocket } from "./hooks/useSocket";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { LLMChat } from "./components/LLMChat";
import { NicknameModal } from "./components/NicknameModal";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(true);

  const { messages, isConnected, userId, sendMessage, sendLLMRequest } =
    useSocket(nickname);

  useEffect(() => {
    // Check if nickname exists in localStorage
    if (typeof window !== "undefined") {
      const savedNickname = localStorage.getItem("chatNickname");
      if (savedNickname) {
        setNickname(savedNickname);
        setShowNicknameModal(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isConnected && nickname) {
      antMessage.success(`Welcome, ${nickname}!`, 2);
    } else if (!isConnected && nickname) {
      antMessage.warning("Connecting to server...", 2);
    }
  }, [isConnected, nickname]);

  const handleNicknameComplete = (newNickname: string) => {
    setNickname(newNickname);
    setShowNicknameModal(false);
  };

  return (
    <Layout className="h-screen bg-gray-50">
      <div className="w-full max-w-[800px] mx-auto flex flex-col h-screen">
        <Header className="bg-white shadow-md flex items-center justify-between px-6">
          <Title level={3} className="mb-0">
            Chat Application
          </Title>
          <div className="flex items-center gap-4">
            {nickname && (
              <span className="text-white text-sm">@{nickname}</span>
            )}
            <LLMChat
              onSendLLMRequest={sendLLMRequest}
              disabled={!isConnected}
              messages={messages}
              currentUserId={userId}
            />
            <Badge
              status={isConnected ? "success" : "error"}
              text={
                <span className="text-white">
                  {isConnected ? (
                    <>
                      <WifiOutlined /> Connected
                    </>
                  ) : (
                    <>Disconnected</>
                  )}
                </span>
              }
            />
          </div>
        </Header>
        <Content className="flex flex-col flex-1 bg-gray-50">
          <div className="flex-1 overflow-hidden flex flex-col">
            <MessageList messages={messages} currentUserId={userId} />
            <MessageInput onSend={sendMessage} disabled={!isConnected} />
          </div>
        </Content>
      </div>
      <NicknameModal
        open={showNicknameModal}
        onComplete={handleNicknameComplete}
      />
    </Layout>
  );
}
