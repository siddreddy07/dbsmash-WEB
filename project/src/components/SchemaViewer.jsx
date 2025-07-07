import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { prompts, schemaData } from '../pages/schemaData'; // Adjust path as needed
import ERViewerTemplate2 from './ERViewerTemplate2';

const SchemaViewer = ({ currentText, currentPromptIndex }) => {
  const [activeTab, setActiveTab] = useState('er-diagram');
  // Determine current schema based on full prompt match
  const currentSchema = prompts.find(prompt => currentText.trim() === prompt.trim()) 
    ? schemaData[currentText] 
    : schemaData[prompts[currentPromptIndex]];


  return (
    <div className="relative h-full">
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50">
        <div className="text-left">
          <span className="text-gray-500 text-sm">Prompt:</span>
          <div className="text-xl text-white mt-2 font-mono">
            {currentText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-0.5 h-6 bg-gray-400 ml-1"
            />
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-6xl mb-4 text-center"
      >
        ↓
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
      >
        <div className="flex border-b border-gray-700/50 mb-4">
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'er-diagram' ? 'text-white border-b-2 border-gray-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('er-diagram')}
          >
            ER Diagram
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'sql-code' ? 'text-white border-b-2 border-gray-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('sql-code')}
          >
            SQL Code
          </button>
        </div>
        <div className="h-[200px] overflow-hidden relative">
          {activeTab === 'er-diagram' ? (
            <ERViewerTemplate2 initialNodes={currentSchema.initialNodes} initialEdges = {currentSchema.initialEdges}/>
          ) : (
            <div className="text-left font-mono text-sm text-gray-300 max-w-full relative">
              <pre className="max-h-[260px] overflow-hidden">{currentSchema.sql}</pre>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800/80 to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SchemaViewer;