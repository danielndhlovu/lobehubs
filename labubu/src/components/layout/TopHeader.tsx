import { Button, Tooltip, Space } from 'antd';
import { Trash2, StopCircle, Share2, MoreHorizontal, History } from 'lucide-react';
import { ModelSelector } from '../shared/ModelSelector';

interface Props {
  title: string;
  selectedModel: string;
  onModelChange: (id: string) => void;
  onClear: () => void;
  onStop: () => void;
  isLoading: boolean;
}

export const TopHeader = ({ title, selectedModel, onModelChange, onClear, onStop, isLoading }: Props) => {
  return (
    <div style={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid #efeff1',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      flexShrink: 0,
      zIndex: 5
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
            padding: '8px 12px',
            background: '#f3f4f6',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            gap: 8
        }}>
            <History size={16} />
            <span>{title}</span>
        </div>
        <ModelSelector value={selectedModel} onChange={onModelChange} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Space size={4}>
            {isLoading && (
            <Tooltip title="Stop generation">
                <Button
                    type="text"
                    danger
                    icon={<StopCircle size={18} />}
                    onClick={onStop}
                    style={{ background: '#fef2f2' }}
                />
            </Tooltip>
            )}
            <Tooltip title="Share Conversation">
                <Button type="text" icon={<Share2 size={18} style={{ color: '#4b5563' }} />} />
            </Tooltip>
            <Tooltip title="Clear History">
                <Button type="text" icon={<Trash2 size={18} style={{ color: '#4b5563' }} />} onClick={onClear} />
            </Tooltip>
            <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />
            <Button type="text" icon={<MoreHorizontal size={18} style={{ color: '#4b5563' }} />} />
        </Space>
      </div>
    </div>
  );
};
