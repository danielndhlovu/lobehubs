import { useRef, useState } from 'react';
import { ChatList, BackBottom } from '@lobehub/ui/chat';
import { type ChatMessage } from '../../types';

interface Props {
  messages: ChatMessage[];
  onMessageChange?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
}

const EMPTY_STATE = (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '40px 20px', textAlign: 'center', minHeight: '100%' }}>
    <div style={{ fontSize: 80, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginBottom: 8, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)', border: '4px solid #fff' }}>
      <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>🤖</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 36, fontWeight: 850, color: '#1a1d21', letterSpacing: '-0.03em' }}>Labubu AI Workspace</div>
      <div style={{ fontSize: 17, maxWidth: 500, lineHeight: 1.6, color: '#4b5563', fontWeight: 500 }}>The next generation AI interface for creators and engineers. Experience seamless collaboration with advanced models.</div>
    </div>
  </div>
);

export const MessageList = ({ messages, onMessageChange, onDelete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(true);

  const data = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    role: msg.role,
    createAt: msg.createAt,
    loading: msg.loading,
    error: msg.error,
    meta: {
        avatar: msg.role === 'user' ? '🧑' : '🤖',
        title: msg.role === 'user' ? 'You' : 'Labubu AI',
    }
  }));

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
      setAtBottom(isBottom);
  };

  const scrollToBottom = () => {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        background: '#fff',
      }}
      onScroll={handleScroll}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '32px 32px 100px' }}>
        {messages.length === 0 ? EMPTY_STATE : (
          <ChatList
            data={data as any}
            onMessageChange={onMessageChange}
            onActionClick={(action, id) => {
                if (action.key === 'del') onDelete?.(id);
            }}
            enableHistoryDivider
          />
        )}
      </div>

      {!atBottom && (
        <BackBottom
          style={{ position: 'absolute', bottom: 20, right: 40, zIndex: 10 }}
          onClick={scrollToBottom}
        />
      )}
    </div>
  );
};
