import React, { useState, useContext } from 'react';
import ChatPanel from '../components/ChatPanel';
import TabSwitcher from '../components/TabSwitcher';
import FullscreenModal from '../components/FullscreenModal';
import { SchemaContext } from '../Contextapi/SchemaContext';
import ERViewerTemplate2 from '../components/ERViewerTemplate2';
import { Copy, Check } from 'lucide-react';

const Playground = () => {
  const { genAI, setaireply, aireply, loading } = useContext(SchemaContext);
  const [activeTab, setActiveTab] = useState('diagram');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        "Hi! I'm here to help you create database schemas. Describe your project or database requirements, and I'll assist you.",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now() + '-user',
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const aiReply = await genAI(message);
      setaireply(aiReply);

      const aiMessage = {
        id: Date.now() + '-ai',
        type: 'ai',
        content: aiReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + '-error',
        type: 'ai',
        content: 'Error generating response. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // ---- Viewer Safe Extraction ----
  let sqlCode = '';
  let erNodes = [];
  let erEdges = [];
  let errorMessage = '';

  try {
    const stored = JSON.parse(localStorage.getItem('chat_history')) || [];
    const latestStored = stored[stored.length - 1];

    const latestContent =
      latestStored?.ai?.content ||
      (typeof aireply === 'object' && aireply?.content);

    if (latestContent?.error) {
      errorMessage = latestContent.error;
    } else {
      sqlCode = latestContent?.sql || '';
      erNodes = latestContent?.initialNodes || [];
      erEdges = latestContent?.initialEdges || [];
    }
  } catch (err) {
    console.error('Viewer rendering error:', err);
  }

  // Copy functionality for SQL code
  const handleCopy = async () => {
    if (sqlCode) {
      try {
        await navigator.clipboard.writeText(sqlCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const renderError = (
    <div className="text-red-400 text-sm bg-red-900/10 p-3 border border-red-800 rounded-lg text-center">
      ⚠️ Error: {errorMessage || 'Something went wrong while generating.'}
    </div>
  );

  // Diagram object for FullscreenModal
  const diagram = { nodes: erNodes, edges: erEdges };

  return (
    <div className="pt-16 min-h-screen bg-black overflow-hidden">
      <div className="h-[80vh] lg:h-[calc(100vh-4rem)] flex">
        {/* Chat Panel */}
        <div className="w-full lg:h-full lg:w-1/2 border-r border-gray-800">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
          />
        </div>

        {/* Viewer Panel (Desktop) */}
        <div className="hidden lg:block w-1/2 bg-gray-900/30">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <TabSwitcher
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onFullscreen={activeTab === 'diagram' ? () => setIsFullscreen(true) : null}
                onCopy={activeTab === 'code' ? handleCopy : null}
                copied={copied}
              />
            </div>

            <div className="flex-1 overflow-auto p-4 text-white">
              {activeTab === 'diagram' ? (
                loading ? (
                  <p className="text-center text-gray-400 animate-pulse">Generating React Flow Diagram...</p>
                ) : errorMessage ? (
                  renderError
                ) : erNodes.length > 0 ? (
                  <ERViewerTemplate2 initialNodes={erNodes} initialEdges={erEdges} />
                ) : (
                  <p className="text-gray-500">No ER diagram available yet.</p>
                )
              ) : loading ? (
                <p className="text-center text-gray-400 animate-pulse">Generating SQL Code...</p>
              ) : errorMessage ? (
                renderError
              ) : sqlCode ? (
                <pre className="bg-black/50 border border-gray-800 rounded-xl p-4 text-sm whitespace-pre-wrap">
                  {sqlCode}
                </pre>
              ) : (
                <p className="text-gray-500">No SQL code available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Viewer */}
      <div className="lg:hidden">
        <div className="h-[70vh] bg-gray-900/30">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <TabSwitcher
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onFullscreen={activeTab === 'diagram' ? () => setIsFullscreen(true) : null}
                onCopy={activeTab === 'code' ? handleCopy : null}
                copied={copied}
              />
            </div>

            <div className="flex-1 overflow-auto p-4 text-white">
              {activeTab === 'diagram' ? (
                loading ? (
                  <p className="text-center text-gray-400 animate-pulse">Generating React Flow Diagram...</p>
                ) : errorMessage ? (
                  renderError
                ) : erNodes.length > 0 ? (
                  <ERViewerTemplate2 initialNodes={erNodes} initialEdges={erEdges} />
                ) : (
                  <p className="text-gray-500">No ER diagram available yet.</p>
                )
              ) : loading ? (
                <p className="text-center text-gray-400 animate-pulse">Generating SQL Code...</p>
              ) : errorMessage ? (
                renderError
              ) : sqlCode ? (
                <pre className="bg-black/50 border border-gray-800 rounded-xl p-4 text-sm whitespace-pre-wrap">
                  {sqlCode}
                </pre>
              ) : (
                <p className="text-gray-500">No SQL code available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        diagram={diagram}
      />
    </div>
  );
};

export default Playground;