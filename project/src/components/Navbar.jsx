import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import DbSmashIcon from './DbSmashIcon';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Playground', path: '/playground' },
    { name: 'Docs', path: '/docs' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50"
    >
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center ml-4 space-x-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              dbSmash
            </span>
          </Link>
          
          <div className="flex items-center gap-3 lg:gap-8">
  {navItems.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        location.pathname === item.path
          ? 'text-white bg-gray-800/50'
          : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
      }`}
    >
      {item.name}
      {location.pathname === item.path && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-md"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  ))}


  <a
    href="https://github.com/siddreddy07/dbsmash-WEB"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 cursor-pointer rounded-md text-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-300"
  >
    <Github className="w-5 h-5" />
  </a>
</div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;