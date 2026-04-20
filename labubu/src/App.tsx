import { useState } from 'react';
import { ThemeProvider, ConfigProvider } from '@lobehub/ui';
import { motion } from 'motion/react';
import { LeftRail } from './components/layout/LeftRail';
import { SessionList } from './components/layout/SessionList';
import { TopHeader } from './components/layout/TopHeader';
import { MessageList } from './components/chat/MessageList';
import { InputArea } from './components/chat/InputArea';
import { useSessions } from './hooks/useSessions';
import { useChat } from './hooks/useChat';

const ChatWorkspace = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedModel, setSelectedModel] = useState('my-go-model');

  const {
    sessions,
    activeId,
    activeSession,
    setActiveId,
    createSession,
    updateSessionPreview,
  } = useSessions();

  const { messages, loading, sendMessage, updateMessage, deleteMessage, clearMessages, stopGeneration } =
    useChat(activeId);

  const handleSend = async (text: string) => {
    updateSessionPreview(activeId, text);
    await sendMessage(text, selectedModel);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#f8f9fa',
      }}
    >
      <LeftRail collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <SessionList
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onCreate={createSession}
        collapsed={collapsed}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
          background: '#ffffff'
        }}
      >
        <TopHeader
          title={activeSession?.title ?? 'New Conversation'}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          onClear={clearMessages}
          onStop={stopGeneration}
          isLoading={loading}
        />

        <MessageList
            messages={messages}
            onMessageChange={updateMessage}
            onDelete={deleteMessage}
        />

        <InputArea onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider appearance="light">
    <ConfigProvider motion={motion}>
      <ChatWorkspace />
    </ConfigProvider>
  </ThemeProvider>
);

export default App;
