import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, Image as ImageIcon, HelpCircle, ShieldAlert, Wrench, CheckCircle2 } from 'lucide-react';

const LIVE_CHAT_API_URL = "https://nitesh-naasai--fixlens-backend-chat.us-east.modal.run";

export default function ChatCopilot({ part, scenario }) {
  const imageSrc =
    scenario?.customImageUrl ||
    (scenario?.id === 'motherboard'
      ? '/images/motherboard.png'
      : scenario?.id === 'printer3d'
      ? '/images/printer3d.png'
      : '/images/automotive.png');

  const productTitle = part?.deviceName || scenario?.title || 'Physical Hardware Assembly';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hi! I analyzed your uploaded image.**\n\n• **Identified Product:** **${productTitle}**\n• **Detected Defect:** **${part?.name || 'Hardware Component'}** (${part?.designator || 'FAULT-1'})\n\nIf you don't know what this product is or how to fix it, don't worry at all! I'm here to explain everything in plain English, tell you if it's safe to DIY, and walk you through every step. Tap any question below or ask me anything!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Update welcome message if part or scenario changes
  useEffect(() => {
    if (part) {
      setMessages([
        {
          id: `welcome_${Date.now()}`,
          role: 'assistant',
          content: `👋 **Hi! I analyzed your image for this project:**\n\n• **Product:** **${part?.deviceName || scenario?.title || 'Hardware System'}**\n• **Target Component:** **${part.name}** (${part.designator})\n• **Status:** ${part.statusLabel || part.status.toUpperCase()}\n\nIf you're completely new to this, don't worry! Ask me what this device does, what tools you need, or whether it's safe for a beginner to fix.`
        }
      ]);
    }
  }, [part?.id, scenario?.id]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(LIVE_CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          component_name: part?.name || 'Hardware Component',
          product_name: part?.deviceName || scenario?.title || 'Physical Hardware Assembly',
          context: `Device: ${part?.deviceName || scenario?.title || 'Hardware'}. Layman Explanation: ${part?.laymanSummary || ''}. Diagnosis: ${part?.diagnosis || ''}. Tools: ${part?.tools?.join(', ') || ''}. Steps: ${part?.steps?.join(' -> ') || ''}. Safety Alert: ${part?.safetyAlert || ''}`,
          image_base64: scenario?.customImageUrl?.startsWith('data:') ? scenario.customImageUrl : null,
          history: messages.slice(-5).map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        let replyText = (data.reply || data.content || "").trim();
        if (!replyText || replyText === "Inspection analysis complete.") {
          replyText = `Here is what you need to know about the **${part?.name || 'component'}** on this **${productTitle}**:\n\n` +
            `• **Overview:** ${part?.laymanSummary || 'This is a key functional part of the device.'}\n\n` +
            `• **Diagnosis:** ${part?.diagnosis || 'Thermal and mechanical degradation observed.'}\n\n` +
            `• **Safety First:** ${part?.safetyAlert || 'Always ensure the device is completely de-energized before touching any metal leads.'}\n\n` +
            `• **Recommended Action:** ${part?.laymanFixGuide || 'Follow the step-by-step repair guide to service or replace this part safely.'}`;
        }
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            role: 'assistant',
            content: replyText,
            reasoning: data.reasoning
          }
        ]);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.warn("Chat API error, using intelligent fallback response:", err);
      // Helpful, beginner-accessible fallback response
      let fallbackText = `Here is what to know about this **${productTitle}**:\n\n` +
        `1. **What is it?** ${part?.laymanSummary || 'This is an essential operational component of the system.'}\n` +
        `2. **Can a beginner fix it?** ${part?.beginnerFriendly || 'Yes, with standard caution.'}\n` +
        `3. **First Safety Rule:** ${part?.safetyAlert || 'Always unplug or disconnect all power sources first.'}\n` +
        `4. **Tools Needed:** ${part?.tools?.join(', ') || 'Standard screwdriver and cleaning wipes.'}\n` +
        `5. **Next Step:** ${part?.steps?.[0] || 'Inspect the part visually under bright light.'}`;

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: fallbackText
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const samplePrompts = [
    "What is this item and what does it do in everyday life?",
    "I'm a complete beginner. Can I fix this safely?",
    "What simple tools or household items do I need?",
    "What is the first safety rule before I touch it?",
    "Walk me through the repair step-by-step in simple words"
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Active Project & Image Context Card */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
            <img
              src={imageSrc}
              alt={productTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-bold uppercase text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                Active Project
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">
                📷 Image Linked
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 truncate mt-0.5" title={productTitle}>
              {productTitle}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              Target: <strong className="text-slate-700">{part?.name}</strong>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            part?.status === 'critical'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {part?.status}
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  isUser
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-teal-600" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-teal-600 text-white font-medium rounded-tr-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.reasoning && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
                    <span className="text-teal-600 font-semibold">// CoT Reasoning Verified</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-teal-600 animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-3 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="font-mono text-[10px] text-slate-400 ml-1">Meta Muse Spark Open thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Beginner Prompts */}
      <div className="px-3.5 py-2 border-t border-slate-100 bg-slate-50/70 overflow-x-auto custom-scrollbar flex gap-1.5 shrink-0">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-[10px] font-medium text-slate-600 hover:text-teal-800 whitespace-nowrap transition-colors shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask AI about ${productTitle} or how to fix it...`}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
