import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Playground from './pages/Playground';
import Documentation from './pages/Documentation';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-gray-300">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;