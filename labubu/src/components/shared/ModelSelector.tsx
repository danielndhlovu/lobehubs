import { Select, Tag, Tooltip } from 'antd';
import { OpenAI, Anthropic, Google, DeepSeek, Meta } from '@lobehub/icons';
import { MODEL_LIST, type ModelOption } from '../../data/models';
import { ChevronDown, Zap } from 'lucide-react';
const PROVIDER_ICONS: Record<string, React.ReactNode> = { openai: <OpenAI size={14} />, anthropic: <Anthropic size={14} />, google: <Google size={14} />, deepseek: <DeepSeek size={14} />, meta: <Meta size={14} />, custom: <Zap size={14} style={{ color: '#f59e0b' }} /> };
interface Props { value: string; onChange: (modelId: string) => void; }
export const ModelSelector = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onChange={onChange} size="middle" variant="borderless" suffixIcon={<ChevronDown size={14} style={{ color: '#666' }} />} style={{ minWidth: 200, fontWeight: 600, background: '#f4f4f5', borderRadius: 10, padding: '0 4px' }} popupMatchSelectWidth={false} optionLabelProp="label" >
      {MODEL_LIST.map((model: ModelOption) => (
        <Select.Option key={model.id} value={model.id} label={<span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1a1a1a' }}>{PROVIDER_ICONS[model.provider]}{model.label}</span>} disabled={model.disabled} >
          <Tooltip title={model.disabled ? 'Coming soon' : undefined} placement="right"><span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', opacity: model.disabled ? 0.45 : 1 }}><div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: '#fff', border: '1px solid #eee' }}>{PROVIDER_ICONS[model.provider]}</div><span style={{ fontWeight: 500 }}>{model.label}</span>{model.disabled && <Tag color="default" bordered={false} style={{ marginLeft: 'auto', fontSize: 10, borderRadius: 4 }}>SOON</Tag>}</span></Tooltip>
        </Select.Option>
      ))}
    </Select>
  );
};
