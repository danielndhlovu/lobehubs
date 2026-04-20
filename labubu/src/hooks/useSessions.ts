import { useState, useCallback } from 'react';
import { type ChatSession } from '../types';
const makeId = () => Math.random().toString(36).slice(2, 9);
const INITIAL_SESSION: ChatSession = { id: makeId(), title: 'New Conversation', lastMessage: '', updatedAt: Date.now(), model: 'my-go-model' };
export const useSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([INITIAL_SESSION]);
  const [activeId, setActiveId] = useState<string>(INITIAL_SESSION.id);
  const activeSession = sessions.find((s) => s.id === activeId) ?? sessions[0];
  const createSession = useCallback(() => {
    const newSession: ChatSession = { id: makeId(), title: 'New Conversation', lastMessage: 'Just started...', updatedAt: Date.now(), model: 'my-go-model' };
    setSessions((prev) => [newSession, ...prev]);
    setActiveId(newSession.id);
  }, []);
  const updateSessionPreview = useCallback((id: string, lastMessage: string) => {
    setSessions((prev) => prev.map((s) => s.id === id ? { ...s, lastMessage: lastMessage.slice(0, 40) + (lastMessage.length > 40 ? '...' : ''), updatedAt: Date.now(), title: s.title === 'New Conversation' ? lastMessage.slice(0, 24) : s.title } : s));
  }, []);
  return { sessions, activeId, activeSession, setActiveId, createSession, updateSessionPreview };
};
