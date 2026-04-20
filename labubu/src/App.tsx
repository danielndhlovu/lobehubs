import { useState } from 'react';
import { ThemeProvider, ConfigProvider } from '@lobehub/ui';
import { motion } from 'motion/react';
import { LeftRail, type RailItem } from './components/layout/LeftRail';
import { SessionList } from './components/layout/SessionList';
import { TopHeader } from './components/layout/TopHeader';
import { MessageList } from './components/chat/MessageList';
import { InputArea } from './components/chat/InputArea';
import { MarketGrid } from './components/market/MarketGrid';
import { useSessions } from './hooks/useSessions';
import { useChat } from './hooks/useChat';

const ChatWorkspace = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<RailItem>('chat');
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
      <LeftRail active={activeTab} onChange={setActiveTab} onToggle={() => setCollapsed((c) => !c)} />

      {activeTab === 'chat' && (
        <>
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
        </>
      )}

      {(activeTab === 'discover' || activeTab === 'market') && (
          <div style={{ flex: 1, overflowY: 'auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 64, borderBottom: '1px solid #efeff1', display: 'flex', alignItems: 'center', padding: '0 32px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                    {activeTab === 'discover' ? 'Agent Discovery' : 'Agent Market'}
                </span>
            </div>
            <div style={{ padding: '40px 48px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: 40 }}>
                    <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.04em', color: '#111827' }}>
                        {activeTab === 'discover' ? 'Find your next AI partner.' : 'The marketplace for intelligence.'}
                    </h1>
                    <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 600, lineHeight: 1.6 }}>
                        Browse through hundreds of specialized agents designed to help you write, code, and create.
                    </p>
                </div>
                <MarketGrid />
            </div>
          </div>
      )}
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
