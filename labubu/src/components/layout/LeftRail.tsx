import { Tooltip, Divider, Badge } from 'antd';
import { MessageSquare, Compass, Bot, Settings, PanelLeft, Sparkles, Heart } from 'lucide-react';

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const RAIL_ITEMS = [
  { icon: <MessageSquare size={22} />, label: 'Chat', active: true, badge: 2 },
  { icon: <Compass size={22} />, label: 'Discover', active: false },
  { icon: <Bot size={22} />, label: 'Market', active: false },
  { icon: <Heart size={22} />, label: 'Favorites', active: false },
];

export const LeftRail = ({ onToggle }: Props) => {
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
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)'
          }}>
              <Sparkles size={24} color="#fff" />
          </div>
      </div>

      <Divider style={{ margin: '4px 20px', minWidth: 'auto', width: 32 }} />

      {RAIL_ITEMS.map((item) => (
        <Tooltip key={item.label} title={item.label} placement="right">
          <div
            style={{
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              cursor: item.active ? 'pointer' : 'not-allowed',
              color: item.active ? '#3b82f6' : '#9ca3af',
              background: item.active ? '#eff6ff' : 'transparent',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            {item.badge ? (
                <Badge count={item.badge} size="small" offset={[0, 0]} style={{ boxShadow: 'none' }}>
                    {item.icon}
                </Badge>
            ) : item.icon}
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
