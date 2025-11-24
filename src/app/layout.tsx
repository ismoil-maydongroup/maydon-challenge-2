import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chat Application',
  description: 'Real-time chat application with LLM integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

