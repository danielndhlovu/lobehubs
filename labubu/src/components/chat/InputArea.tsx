import { ChatInputArea, ChatInputActionBar, ChatSendButton, ChatInputAreaInner } from '@lobehub/ui/chat';
import { useState } from 'react';
import { Maximize2, Minimize2, Eraser, Paperclip, Mic, Settings2 } from 'lucide-react';
import { Button, Tooltip, Space } from 'antd';
interface Props { onSend: (text: string) => void; loading: boolean; }
export const InputArea = ({ onSend, loading }: Props) => {
  const [value, setValue] = useState('');
  const [expand, setExpand] = useState(false);
  const handleSend = () => { if (value.trim() && !loading) { onSend(value); setValue(''); } };
  return (
    <div style={{ borderTop: '1px solid #f3f4f6', padding: '20px 32px 32px', background: '#fff', flexShrink: 0 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <ChatInputArea style={{ borderRadius: 24, border: '1px solid #e5e7eb', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
            <ChatInputActionBar padding="12px 20px 8px" leftAddons={<Space size={4}><Tooltip title="Upload Files"><Button size="small" type="text" icon={<Paperclip size={16} style={{ color: '#6b7280' }} />} /></Tooltip><Tooltip title="Voice Input"><Button size="small" type="text" icon={<Mic size={16} style={{ color: '#6b7280' }} />} /></Tooltip><div style={{ width: 1, height: 16, background: '#e5e7eb', margin: '0 8px' }} /><Tooltip title="Clear Content"><Button size="small" type="text" icon={<Eraser size={16} style={{ color: '#6b7280' }} />} onClick={() => setValue('')} /></Tooltip></Space>} rightAddons={<Space size={4}><Tooltip title="Model Settings"><Button size="small" type="text" icon={<Settings2 size={16} style={{ color: '#6b7280' }} />} /></Tooltip><Tooltip title={expand ? "Collapse" : "Expand"}><Button size="small" type="text" icon={expand ? <Minimize2 size={16} style={{ color: '#6b7280' }} /> : <Maximize2 size={16} style={{ color: '#6b7280' }} />} onClick={() => setExpand(!expand)} /></Tooltip></Space>} />
            <ChatInputAreaInner value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder={loading ? 'Processing your request...' : 'Message Labubu AI...'} style={{ minHeight: expand ? 300 : 120, fontSize: 15, padding: '12px 24px', border: 'none', boxShadow: 'none', lineHeight: 1.6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 16px' }}><div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Press <b>Enter</b> to send, <b>Shift + Enter</b> for new line</div><ChatSendButton loading={loading} onSend={handleSend} texts={{ send: 'Send Message', stop: 'Stop Generation' }} style={{ borderRadius: 12, padding: '0 20px', height: 38, fontWeight: 600, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)' }} /></div>
        </ChatInputArea>
      </div>
    </div>
  );
};
