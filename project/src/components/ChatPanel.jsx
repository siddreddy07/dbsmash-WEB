import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import DbSmashIcon from './DbSmashIcon';
import { SchemaContext } from '../Contextapi/SchemaContext';

const ChatPanel = ({ onSendMessage, isGenerating }) => {
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const [loadingStep, setLoadingStep] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const firstRenderRef = useRef(true);

  const { aireply, loading } = useContext(SchemaContext);

  const loadingTexts = [
    '🧠 Understanding your schema...',
    '📐 Making architectural decisions...',
    '🧬 Generating ER diagram...',
    '📄 Creating SQL code...',
    '✨ Finalizing response...',
  ];

  // ✅ Load last full message from storage (if exists)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chat_history'));
    if (stored?.user && stored?.ai) {
      setLocalMessages([
        {
          id: stored.user.id,
          type: 'user',
          content: stored.user.content,
          timestamp: new Date(stored.user.timestamp),
        },
        
      ]);
    } else {
      setLocalMessages([
        {
          id: 'intro-msg',
          type: 'ai',
          content: '👋 Hi there! Describe your product and get an instant Schema Diagram + MySQL code.',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // ✅ When AI replies, store the pair
  useEffect(() => {
    if (!aireply || !aireply?.content?.sql || loading) return;

    const storedUser = localMessages.find((msg) => msg.type === 'user');
    if (!storedUser) return;

    const aiMessage = {
      id: aireply.id || Date.now(),
      type: 'ai',
      content: aireply?.content?.sql ? '✅ Schema diagram and SQL code generated successfully':'',
      timestamp: new Date(aireply.timestamp || Date.now()),
    };

    // Add to UI
    setLocalMessages((prev) => [...prev, aiMessage]);

    // ✅ Save full user+ai pair
    localStorage.setItem(
      'chat_history',
      JSON.stringify({
        user: {
          ...storedUser,
          timestamp: storedUser.timestamp.toISOString(),
        },
        ai: {
          ...aiMessage,
          timestamp: aiMessage.timestamp.toISOString(),
          content: aireply.content, // full content for future reload
        },
      })
    );
  }, [aireply]);

  // Loading steps
  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) =>
          prev < loadingTexts.length - 1 ? prev + 1 : prev
        );
      }, 5500);
    } else if (!loading && loadingStep !== null) {
      setLoadingStep(-1);
      setTimeout(() => setLoadingStep(null), 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Scroll to bottom
  useEffect(() => {
    if (!firstRenderRef.current) scrollToBottom();
    else firstRenderRef.current = false;
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const newMsg = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // Show user message in chat only (❌ no localStorage here)
    setLocalMessages([newMsg]);

    onSendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/30">
        <div className="flex items-center jus space-x-2">

<span
  className="flex items-center justify-between gap-1 rounded-full border border-green-700 px-2.5 py-0.5 text-green-700 dark:text-emerald-100"
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 8 8"
  fill="green"
  className="size-2"
>
  <circle cx="4" cy="4" r="4" />
</svg>


  <p className="text-sm text-white whitespace-nowrap">Live v0.1</p>
</span>


          <h2 className="text-lg font-semibold text-white">Chat with AI</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {localMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white'
                    : 'bg-gray-800/50 text-gray-200 border border-gray-700/50'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <DbSmashIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {loadingStep !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800/50 rounded-2xl px-4 py-3 border border-gray-700/50">
              <div className="flex items-start space-x-2">
                <DbSmashIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  {loadingStep >= 0 && loadingStep < loadingTexts.length
                    ? loadingTexts[loadingStep]
                    : '✅ Schema diagram and SQL code generated successfully!'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/30">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              name="description"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your project or database..."
              disabled={isGenerating}
              className="w-full max-h-[120px] resize-none bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-200 disabled:opacity-50"
            />
          </div>
          <motion.button
            type="submit"
            disabled={!input.trim() || isGenerating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:from-gray-800 disabled:to-gray-800 text-white p-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
