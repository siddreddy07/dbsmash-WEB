import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Minimize2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import ERViewerTemplate2 from './ERViewerTemplate2';

const FullscreenModal = ({ isOpen, onClose, diagram }) => {
  const diagramRef = useRef(null);
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (forceRerender) {
      const timer = setTimeout(() => setForceRerender(false), 100);
      return () => clearTimeout(timer);
    }
  }, [forceRerender]);

  const handleDownloadJSON = () => {
    if (!diagram || !diagram.nodes || !diagram.edges) return;

    const blob = new Blob([JSON.stringify(diagram, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'er-diagram.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async () => {
    const container = diagramRef.current?.querySelector('.react-flow');
    if (!container) {
      alert('Diagram container not found.');
      return;
    }

    try {
      const dataUrl = await toPng(container, {
        backgroundColor: '#ffffff',
        cacheBust: true,
        pixelRatio: 2,
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'diagram.png';
      a.click();
    } catch (err) {
      console.error('Error exporting PNG:', err);
      alert('Failed to download PNG. Try again.');
    }
  };

  if (!diagram || !diagram.nodes || !diagram.edges) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[95vh] w-[95vw] flex flex-col bg-gray-900/50 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-800 bg-gray-900/70 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Fullscreen Diagram</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    title="Exit Fullscreen"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center text-white">
                <p>No diagram data available.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[95vh] w-[95vw] flex flex-col bg-gray-900/50 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-800 bg-gray-900/70 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Fullscreen Diagram</h2>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadJSON}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    title="Download JSON"
                  >
                    <span className="text-xs">JSON</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadPNG}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    title="Download PNG"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                    title="Exit Fullscreen"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
            <div
              className="flex-1 overflow-hidden"
              ref={diagramRef}
              key={forceRerender ? 'rerender' : 'normal'}
            >
              <ERViewerTemplate2
                initialNodes={diagram.nodes}
                initialEdges={diagram.edges}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenModal;
