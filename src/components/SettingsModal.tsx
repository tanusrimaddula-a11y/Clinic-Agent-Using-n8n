import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Globe, RefreshCw, Key, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
  sessionId: string;
  onResetSession: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  onSaveWebhookUrl,
  sessionId,
  onResetSession,
}) => {
  const [url, setUrl] = useState(webhookUrl);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWebhookUrl(url.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopySession = () => {
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="liquid-glass border border-white/15 w-full max-w-md p-6 rounded-3xl text-white shadow-2xl relative bg-[#0a0a0f]/90"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#3D81E3]/20 text-[#00d2ff]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">n8n Backend Config</h3>
                <p className="text-white/50 text-xs">Lotus Medicals Webhook API</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#3D81E3]" /> Webhook Endpoint URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#3D81E3] transition-all font-mono"
                placeholder="https://your-n8n-instance.cloud/webhook/..."
              />
            </div>

            {/* Session ID info */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#00d2ff]" /> Active Session ID
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={sessionId}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-[11px] text-white/70 font-mono select-all"
                />
                <button
                  type="button"
                  onClick={handleCopySession}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-xl text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  onResetSession();
                  onClose();
                }}
                className="px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/20 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear History
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-white/70 hover:text-white rounded-xl transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#3D81E3] to-[#00d2ff] hover:opacity-90 text-white font-medium text-xs rounded-xl shadow-lg shadow-[#3D81E3]/25 transition-all flex items-center gap-1"
                >
                  {saved ? <Check className="w-3.5 h-3.5" /> : null}
                  {saved ? 'Saved!' : 'Save URL'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
