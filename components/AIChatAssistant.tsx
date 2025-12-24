
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';
import { Message } from '../types';

interface AIChatAssistantProps {
  context: any;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am ameerapp AI. Ready to scale your operations?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(input, context);
      const aiMsg: Message = { role: 'assistant', content: response || 'Sorry, I encountered an error.', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection lost. Please try again.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 origin-bottom-right">
          <div className="bg-[#120c4e] p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                ✨
              </div>
              <div>
                <p className="font-black text-sm tracking-tight leading-none">ameerapp Intelligence</p>
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Online & Thinking</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-200' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none flex gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 border-t bg-white">
            <div className="flex gap-3 bg-gray-100 p-2 rounded-2xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="How can I help you today?"
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none placeholder-gray-400 font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#120c4e] text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:bg-black transition-all disabled:opacity-50"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white w-16 h-16 rounded-[1.5rem] shadow-[0_20px_50px_rgba(124,58,237,0.3)] flex items-center justify-center text-3xl hover:bg-purple-700 transition-all hover:scale-110 active:scale-95 group relative"
        >
          <span className="group-hover:rotate-12 transition-transform">✨</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-4 border-[#f3f4f7] box-content animate-pulse"></span>
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;
