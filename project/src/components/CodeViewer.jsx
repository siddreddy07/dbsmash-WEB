import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download } from 'lucide-react';

const CodeViewer = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (code) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schema.prisma';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black font-sans">
      {/* Toolbar */}
      <div className="p-3 border-b border-gray-800 bg-gray-900/30">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Generated Schema</span>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200"
              aria-label="Download code"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Code Display */}
      <div className="flex-1 overflow-auto">
        {code ? (
          <pre className="p-4 text-sm text-gray-300 font-mono leading-relaxed bg-gray-900/20 h-full">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">No code generated yet</p>
              <p className="text-sm">Generate a diagram first to see the code</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;