export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
}

export interface QuickReply {
  id: string;
  label: string;
  prompt: string;
}

export interface WebhookConfig {
  url: string;
  sessionId: string;
}
