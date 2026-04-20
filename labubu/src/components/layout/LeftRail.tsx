import { Tooltip, Divider, Badge } from 'antd';
import { MessageSquare, Compass, Bot, Settings, PanelLeft, Sparkles, Heart } from 'lucide-react';

export type RailItem = 'chat' | 'discover' | 'market' | 'favorites';

interface Props {
  active: RailItem;
  onChange: (item: RailItem) => void;
  onToggle: () => void;
}

const RAIL_ITEMS: { id: RailItem; icon: any; label: string; badge?: number }[] = [
  { id: 'chat', icon: <MessageSquare size={22} />, label: 'Chat', badge: 2 },
  { id: 'discover', icon: <Compass size={22} />, label: 'Discover' },
  { id: 'market', icon: <Bot size={22} />, label: 'Market' },
  { id: 'favorites', icon: <Heart size={22} />, label: 'Favorites' },
];

export const LeftRail = ({ active, onChange, onToggle }: Props) => {
  return (
    <div
      style={{
        width: 72,
        minWidth: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: 12,
        borderRight: '1px solid #efeff1',
        background: '#fff',
        zIndex: 10,
      }}
    >
      <div style={{ marginBottom: 12 }}>
          <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)',
              cursor: 'pointer'
          }} onClick={() => onChange('chat')}>
              <Sparkles size={24} color="#fff" />
          </div>
      </div>

      <Divider style={{ margin: '4px 20px', minWidth: 'auto', width: 32 }} />

      {RAIL_ITEMS.map((item) => (
        <Tooltip key={item.id} title={item.label} placement="right">
          <div
            onClick={() => onChange(item.id)}
            style={{
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              cursor: 'pointer',
              color: active === item.id ? '#3b82f6' : '#9ca3af',
              background: active === item.id ? '#eff6ff' : 'transparent',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            {item.badge ? (
                <Badge count={item.badge} size="small" offset={[0, 0]} style={{ boxShadow: 'none' }}>
                    {item.icon}
                </Badge>
            ) : item.icon}
            {active === item.id && (
                <div style={{ position: 'absolute', left: -20, width: 4, height: 20, background: '#3b82f6', borderRadius: '0 4px 4px 0' }} />
            )}
          </div>
        </Tooltip>
      ))}

      <div style={{ flex: 1 }} />

      <Tooltip title="Toggle Sidebar" placement="right">
        <div
          onClick={onToggle}
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            cursor: 'pointer',
            color: '#9ca3af',
            background: '#f9fafb'
          }}
        >
          <PanelLeft size={20} />
        </div>
      </Tooltip>

      <Tooltip title="Settings" placement="right">
        <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, cursor: 'pointer', color: '#9ca3af' }}>
          <Settings size={22} />
        </div>
      </Tooltip>
    </div>
  );
};
