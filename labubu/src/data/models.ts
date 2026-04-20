import { type ModelOption } from '../types';
export const MODEL_LIST: ModelOption[] = [
  { id: 'my-go-model', label: 'My Go Backend', provider: 'custom', disabled: false },
  { id: 'gpt-4o', label: 'GPT-4o', provider: 'openai', disabled: true },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'anthropic', disabled: true },
  { id: 'gemini-1-5-pro', label: 'Gemini 1.5 Pro', provider: 'google', disabled: true },
  { id: 'deepseek-v3', label: 'DeepSeek V3', provider: 'deepseek', disabled: true },
  { id: 'llama-3-70b', label: 'Llama 3 70B', provider: 'meta', disabled: true },
];
export const DEFAULT_MODEL = MODEL_LIST[0];
