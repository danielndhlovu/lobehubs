import { useRef, useEffect } from 'react';
import { ChatItem } from '@lobehub/ui/chat';
import { type ChatMessage } from '../../types';

interface Props {
  messages: ChatMessage[];
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
    <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, width: '100%', maxWidth: 600 }}>
      {[ { title: 'Advanced Reasoning', desc: 'Solve complex mathematical problems', icon: '🧠' }, { title: 'Code Generation', desc: 'Build scalable React components', icon: '💻' }, { title: 'Creative Vision', desc: 'Design stunning UI/UX concepts', icon: '🎨' }, { title: 'Data Strategy', desc: 'Optimize your business workflow', icon: '📊' } ].map(item => (
        <div key={item.title} style={{ padding: '24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }} >
          <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export const MessageList = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  if (messages.length === 0) return EMPTY_STATE;
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 0', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '0 32px' }}>
        {messages.map((msg) => (
          <ChatItem key={msg.id} variant="bubble" placement={msg.role === 'user' ? 'right' : 'left'} avatar={{ avatar: msg.role === 'user' ? '🧑' : '🤖', title: msg.role === 'user' ? 'You' : 'Labubu AI' }} message={msg.loading ? '...' : msg.content} loading={!!msg.loading} time={msg.createAt} showTitle={true} style={{ marginBottom: 16 }} />
        ))}
        <div ref={bottomRef} style={{ height: 60 }} />
      </div>
    </div>
  );
};
