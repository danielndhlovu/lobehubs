import { Card, Tag, Avatar, Space, Input } from 'antd';
import { Search, User, MessageCircle, Star } from 'lucide-react';

const AGENTS = [
  { id: 1, name: 'Creative Writer', desc: 'Expert in storytelling and narrative design.', icon: '✍️', author: 'LobeHub', stars: 1200 },
  { id: 2, name: 'Code Architect', desc: 'Build scalable systems and debug complex logic.', icon: '💻', author: 'Techie', stars: 850 },
  { id: 3, name: 'Visual Artist', desc: 'Generate stunning concepts and digital art.', icon: '🎨', author: 'DesignPro', stars: 2100 },
  { id: 4, name: 'Data Analyst', desc: 'Turn raw data into actionable business insights.', icon: '📊', author: 'BizMind', stars: 640 },
  { id: 5, name: 'Legal Assistant', desc: 'Draft contracts and research legal precedents.', icon: '⚖️', author: 'LawBot', stars: 320 },
  { id: 6, name: 'Fitness Coach', desc: 'Personalized workout plans and nutrition advice.', icon: '🏋️', author: 'HealthyLife', stars: 1500 },
];

export const MarketGrid = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 600 }}>
          <Input
            prefix={<Search size={18} style={{ color: '#9ca3af', marginRight: 8 }} />}
            placeholder="Search agents by name, category or author..."
            size="large"
            style={{ borderRadius: 16, height: 48, background: '#f4f4f5', border: 'none' }}
          />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {AGENTS.map((agent) => (
          <Card
            key={agent.id}
            hoverable
            style={{ borderRadius: 20, border: '1px solid #f3f4f6', transition: 'all 0.3s' }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 48, background: '#f8fafc', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                    {agent.icon}
                  </div>
                  <Tag bordered={false} style={{ borderRadius: 6, background: '#f3f4f6', fontWeight: 600, color: '#4b5563' }}>Agent</Tag>
              </div>

              <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{agent.name}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5, height: 42, overflow: 'hidden' }}>{agent.desc}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <Space size={8}>
                      <Avatar size="small" icon={<User size={12} />} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#4b5563' }}>{agent.author}</span>
                  </Space>
                  <Space size={4} style={{ color: '#f59e0b' }}>
                      <Star size={14} fill="#f59e0b" />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{(agent.stars / 1000).toFixed(1)}k</span>
                  </Space>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
