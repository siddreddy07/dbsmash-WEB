import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code2, Maximize2, Copy, Check } from 'lucide-react';

const TabSwitcher = ({ activeTab, onTabChange, onFullscreen, onCopy, copied }) => {
  const tabs = [
    { id: 'diagram', label: 'Diagram', icon: Database },
    { id: 'code', label: 'Code', icon: Code2 },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex bg-gray-900 rounded-xl p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => {
                if (onTabChange) onTabChange(tab.id);
              }}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Switch to ${tab.label} tab`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <IconComponent className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center ml-4">
        {activeTab === 'diagram' && onFullscreen ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onFullscreen) onFullscreen();
            }}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200"
            aria-label="Enter fullscreen mode"
          >
            <Maximize2 className="w-4 h-4" />
          </motion.button>
        ) : activeTab === 'code' && onCopy ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onCopy) onCopy();
            }}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200"
            aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        ) : null}
      </div>
    </div>
  );
};

export default TabSwitcher;