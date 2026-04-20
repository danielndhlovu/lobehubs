export type MessageRole = 'user' | 'assistant' | 'system';
export interface ChatMessage { id: string; content: string; role: MessageRole; createAt: number; error?: boolean; loading?: boolean; }
export interface ChatSession {
    id: string;
    title: string;
    lastMessage: string;
    updatedAt: number;
    model: string;
    type?: 'individual' | 'group';
    avatars?: string[];
}
export interface ModelOption { id: string; label: string; provider: string; disabled?: boolean; }
