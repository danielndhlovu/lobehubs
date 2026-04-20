import { useState, useCallback, useRef } from 'react';
import { type ChatMessage } from '../types';

const BACKEND = import.meta.env.VITE_BACKEND_URL ?? '/api/chat';

export const useChat = (sessionId: string) => {
  const [allMessages, setAllMessages] = useState<Record<string, ChatMessage[]>>({});
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const messages = allMessages[sessionId] ?? [];

  const setMessages = useCallback(
    (updater: (prev: ChatMessage[]) => ChatMessage[]) => {
      setAllMessages((all) => ({
        ...all,
        [sessionId]: updater(all[sessionId] ?? []),
      }));
    },
    [sessionId]
  );

  const sendMessage = useCallback(
    async (text: string, modelId: string) => {
      if (!text.trim() || loading) return;

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        content: text,
        role: 'user',
        createAt: Date.now(),
      };

      const loadingMsg: ChatMessage = {
        id: `a-loading-${Date.now()}`,
        content: '',
        role: 'assistant',
        createAt: Date.now(),
        loading: true,
      };

      setMessages((prev) => [...prev, userMsg, loadingMsg]);
      setLoading(true);

      try {
        const res = await fetch(BACKEND, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            model: modelId,
            session_id: sessionId,
            history: (allMessages[sessionId] ?? [])
              .filter((m) => !m.loading && !m.error)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(`Go backend responded ${res.status}`);

        const data = await res.json();

        setMessages((prev) =>
          prev.map((m) =>
            m.loading
              ? {
                  ...m,
                  id: `a-${Date.now()}`,
                  content: data.reply,
                  loading: false,
                }
              : m
          )
        );
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setMessages((prev) =>
          prev.map((m) =>
            m.loading
              ? {
                  ...m,
                  content: `⚠️ Error: ${err.message}`,
                  loading: false,
                  error: true,
                }
              : m
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, sessionId, allMessages, setMessages]
  );

  const updateMessage = useCallback((id: string, content: string) => {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, content } : m));
  }, [setMessages]);

  const deleteMessage = useCallback((id: string) => {
      setMessages(prev => prev.filter(m => m.id !== id));
  }, [setMessages]);

  const clearMessages = useCallback(() => {
    setMessages(() => []);
  }, [setMessages]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return { messages, loading, sendMessage, updateMessage, deleteMessage, clearMessages, stopGeneration };
};
