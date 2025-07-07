import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Database, Workflow, Heart } from 'lucide-react';
import DbSmashIcon from '../components/DbSmashIcon';
import SchemaViewer from '../components/SchemaViewer';
import {prompts} from './schemaData';

const Homepage = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);


  useEffect(() => {
    let currentCharIndex = 0;
    let isDeleting = false;
    console.log(prompts)
    const currentPrompt = prompts[currentPromptIndex];

    const typeText = () => {
      if (!isDeleting) {
        setCurrentText(currentPrompt.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentPrompt.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setCurrentText(currentPrompt.slice(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [currentPromptIndex]);

  return (
    <div className="pt-16 min-h-screen bg-black overflow-hidden">
      <div className='w-full fixed flex z-50 items-center justify-center'>
      <div className='flex items-center rounded-br-md text-sm rounded-bl-md bg-gradient-to-r py-3 from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent justify-center w-full border-2 border-t-0 border-zinc-900 md:w-1/4 h-4'>
        <h1>🎉 npm package now live - <a className='cursor-pointer' href="https://www.npmjs.com/package/dbsmash"><u className='bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent'>dbsmash</u></a></h1>
      </div>
      </div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-4 sm:px-6 lg:px-8 lg:pt-20 pb-32"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <DbSmashIcon className="lg:w-[412px] lg:h-[412px] mx-auto -mb-20  lg:-mt-20 sm:w-96 sm:h-96" />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Smash Schema
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                Chaos
              </span>
            </h1>
          </motion.div>
        
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="max-w-3xl max-h-[550px] rounded-2xl overflow-hidden mx-auto">
              <SchemaViewer 
                currentText={currentText}
                currentPromptIndex={currentPromptIndex}
              />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Transform natural language into beautiful ER diagrams and production-ready backend schemas with AI
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-row gap-4 px-4 md:justify-center justify-between items-center"
          >
            <Link
              to="/playground"
              className="group relative inline-flex items-center px-2 lg:px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl text-white font-semibold text-md lg:text-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-900 hover:shadow-2xl hover:shadow-gray-500/25"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Try Playground
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/docs"
              className="group inline-flex items-center px-2 lg:px-8 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-gray-300 font-semibold text-md lg:text-lg transition-all duration-300 hover:border-gray-600 hover:text-white hover:bg-gray-800/30"
            >
              <Code2 className="w-5 h-5 mr-2" />
              Read Docs
            </Link>
          </motion.div>
        </div>
        
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-600 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.section>
      
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto -mt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From Idea to Schema in Seconds
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful AI that understands your requirements and generates professional database schemas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: "AI-Powered",
                description: "Advanced natural language processing that understands complex database requirements",
              },
              {
                icon: <Workflow className="w-12 h-12" />,
                title: "Visual Diagrams",
                description: "Interactive ER diagrams that you can pan, zoom, and export in multiple formats",
              },
              {
                icon: <Code2 className="w-12 h-12" />,
                title: "Ready Code",
                description: "Generate production-ready Prisma and Firestore schemas with one click",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-gray-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <span className='flex mt-6 -mb-14 w-full items-center justify-center'>
        <h2 className='flex items-center justify-center gap-2'>crafted with <Heart size={16} fill='grey' className='text-gray-800'/> by <u> <a className='cursor-pointer' href="https://www.linkedin.com/in/n-siddharth-reddy-9579a1273/">siddharthreddy </a></u></h2>
        </span>
      </motion.section>
    </div>
  );
};

export default Homepage;