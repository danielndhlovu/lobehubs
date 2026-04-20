import { Button, Tooltip, Input } from 'antd';
import { SquarePen, MessageSquare, Search } from 'lucide-react';
import { type ChatSession } from '../../types';

interface Props {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  collapsed: boolean;
}

export const SessionList = ({ sessions, activeId, onSelect, onCreate, collapsed }: Props) => {
  if (collapsed) return null;

  return (
    <div style={{
      width: 300,
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #efeff1',
      background: '#fafafb',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 20px 16px' }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#111827', letterSpacing: '-0.02em' }}>Messages</span>
        <Tooltip title="Start New Chat">
          <Button
            type="primary"
            shape="circle"
            size="middle"
            icon={<SquarePen size={18} />}
            onClick={onCreate}
            style={{
              background: '#111827',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </Tooltip>
      </div>

      <div style={{ padding: '0 16px 20px' }}>
        <Input
          prefix={<Search size={14} style={{ color: '#9ca3af' }} />}
          placeholder="Search conversations..."
          size="middle"
          variant="filled"
          style={{ borderRadius: 12, background: '#f3f4f6', border: '1px solid transparent' }}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', padding: '0 12px 8px', letterSpacing: '0.05em' }}>Recent Chats</div>
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelect(session.id)}
            style={{
              padding: '14px 12px',
              borderRadius: 14,
              cursor: 'pointer',
              marginBottom: 4,
              background: session.id === activeId ? '#fff' : 'transparent',
              border: '1px solid',
              borderColor: session.id === activeId ? '#e5e7eb' : 'transparent',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: session.id === activeId ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: session.id === activeId ? '#3b82f6' : '#fff',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s'
              }}>
                <MessageSquare size={18} style={{ color: session.id === activeId ? '#fff' : '#4b5563' }} />
              </div>
              <div style={{ overflow: 'hidden', flex: 1, paddingTop: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: session.id === activeId ? '#111827' : '#374151'
                    }}>
                    {session.title}
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>2m</div>
                </div>
                {session.lastMessage ? (
                  <div style={{ fontSize: 12, color: '#6b7280', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 500 }}>
                    {session.lastMessage}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>No messages yet</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid #efeff1', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>JD</div>
              <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>John Doe</div>
                  <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Premium Plan</div>
              </div>
          </div>
      </div>
    </div>
  );
};
