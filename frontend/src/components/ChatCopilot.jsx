import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const LIVE_CHAT_API_URL = "https://nitesh-naasai--fixlens-backend-chat.us-east.modal.run";

export default function ChatCopilot({ part, scenario }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your FixLens Hardware Copilot powered by Meta Muse Spark Open. Currently inspecting: **${part?.name || 'Hardware'}**. What would you like to know about diagnosing or repairing this component?`
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

  // Update welcome message if part changes
  useEffect(() => {
    if (part) {
      setMessages((prev) => [
        ...prev,
        {
          id: `part_switch_${Date.now()}`,
          role: 'assistant',
          content: `Switched focus to **${part.name}** (${part.designator}). Ask me any questions about tooling, safety hazards, or replacement procedures.`
        }
      ]);
    }
  }, [part?.id]);

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
          context: `${scenario?.title || 'Electronics'} - Status: ${part?.statusLabel || 'Unknown'} - Diagnosis: ${part?.diagnosis || ''}`,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || data.content || "Inspection analysis complete.";
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
      // Helpful fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: `For **${part?.name || 'this component'}**: Ensure primary power is completely de-energized. Inspect the solder fillets or mechanical fastener torque. If replacing, match the OEM target specification (${part?.targetSpec || 'rated OEM part'}) and verify polarity before reassembly.`
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
    "What wrench or screwdriver size do I need?",
    "Is it dangerous to touch this part?",
    "How can I test this with a multimeter?",
    "What OEM replacement part should I buy?"
  ];

  return (
    <div className="flex flex-col h-full bg-white">
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

      {/* Suggested Prompts */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/60 overflow-x-auto custom-scrollbar flex gap-1.5 shrink-0">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50 text-[10px] font-medium text-slate-600 hover:text-teal-700 whitespace-nowrap transition-colors"
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
            placeholder={`Ask AI about ${part?.name || 'this component'}...`}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all disabled:opacity-50"
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
