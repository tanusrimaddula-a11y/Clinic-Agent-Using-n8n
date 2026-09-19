import React, { useState, useEffect } from 'react';
import { GlobalBackground } from './components/GlobalBackground';
import { HeaderBar } from './components/HeaderBar';
import { ChatBody } from './components/ChatBody';
import { InputBar } from './components/InputBar';
import { SettingsModal } from './components/SettingsModal';
import { Message } from './types';

const DEFAULT_WEBHOOK_URL = 'https://tanusri1982.app.n8n.cloud/webhook/Clinic_Agent';

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Webhook URL setup
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('clinicWebhookUrl') || DEFAULT_WEBHOOK_URL;
  });

  // Session ID setup
  const [sessionId, setSessionId] = useState<string>(() => {
    let id = localStorage.getItem('clinicSessionId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('clinicSessionId', id);
    }
    return id;
  });

  // Save Webhook URL update
  const handleSaveWebhookUrl = (newUrl: string) => {
    setWebhookUrl(newUrl);
    localStorage.setItem('clinicWebhookUrl', newUrl);
  };

  // Reset conversation session
  const handleResetSession = () => {
    localStorage.removeItem('clinicSessionId');
    const newId = crypto.randomUUID();
    localStorage.setItem('clinicSessionId', newId);
    setSessionId(newId);
    setMessages([]);
  };

  // Format current time (e.g. "5:42 PM")
  const getFormattedTime = (): string => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Send message to n8n webhook
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      const data = await response.json();

      // Flexible extraction matching n8n standard output formats
      const reply =
        data.reply ??
        data.output ??
        data.response ??
        data.text ??
        data.message ??
        (Array.isArray(data) && data[0]?.output) ??
        'Maazrat, mujhe response receive nahi hua.';

      const botMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: String(reply),
        timestamp: getFormattedTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error connecting to n8n webhook:', error);

      const errorMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: 'Maazrat, server se connection mein issue aa gaya hai. Please dobara try karein.',
        timestamp: getFormattedTime(),
        status: 'error',
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0f] text-white flex items-center justify-center p-0 md:p-6 overflow-hidden select-none sm:select-text">
      {/* Fixed Fullscreen Animated Background Layer */}
      <GlobalBackground />

      {/* Main Single Centered Chat Card (max-w-2xl, liquid-glass) */}
      <main className="w-full max-w-2xl h-screen md:h-[800px] rounded-none md:rounded-[24px] liquid-glass flex flex-col relative z-10 overflow-hidden shadow-2xl border border-white/10 my-auto">
        {/* Header Bar */}
        <HeaderBar
          onOpenSettings={() => setIsSettingsOpen(true)}
          onResetSession={handleResetSession}
        />

        {/* Chat Body */}
        <ChatBody
          messages={messages}
          isLoading={isLoading}
          onSendPrompt={handleSendMessage}
        />

        {/* Input Bar */}
        <InputBar
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        webhookUrl={webhookUrl}
        onSaveWebhookUrl={handleSaveWebhookUrl}
        sessionId={sessionId}
        onResetSession={handleResetSession}
      />
    </div>
  );
}

export default App;
