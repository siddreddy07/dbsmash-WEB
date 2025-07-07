import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Book, Terminal, Zap, Menu, X } from 'lucide-react';

const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCopy = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const installationExample = `npm install dbsmash`;

  const envMongoDBExample = `MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname`;

  const envSupabaseExample = `SUPABASE_DATABASE_URL=postgresql://user:pass@host:port/dbname
SUPABASE_DIRECT_URL=postgresql://user:pass@host:port/dbname`;

  const envFirebaseExample = `FIREBASE_CREDENTIALS=./keys.json`;

  const envOptionalExample = `AVAILABLE_DB=MongoDB_Atlas,Supabase,Firebase`;

  const usageExample = `dbsmash`;

  const supabaseCommandsExample = `npx prisma migrate dev
npx prisma studio`;

  const mongodbCommandsExample = `node ./src/seed/sampleData.js`;

  const firebaseCommandsExample = `node ./src/firestore/schema.js`;

  const prismaExample = `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  username  String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  comments  Comment[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User       @relation(fields: [userId], references: [id])
  comments  Comment[]
}`;

  const firestoreExample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}`;

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      content: (
        <div className="space-y-4 sm:space-y-6">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            DbSmash is an AI CLI tool that turns plain-text app ideas into database schemas and ER diagrams. Just describe your app, pick a database, and DbSmash sets it all up for you—no manual config needed.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm italic">
            Note: Always back up your .env file before installing dbsmash, as it may create or modify it.
          </p>
          <div className="space-y-4">
            {[
              {
                id: 'installation',
                title: 'Installation',
                code: installationExample,
                description: 'Install DbSmash inside ur backend folder using npm. Requires Node.js v18+.',
              },
              {
                id: 'usage',
                title: 'Usage',
                code: usageExample,
                description:
                  'Run the CLI (inside from your /backend root folder ), describe your app in plain English, select a database, and DbSmash will install packages, generate schemas/models, and initialize the database structure.',
              },
              
              
            ].map(({ id, title, code, description }) => (
              <div key={id} className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-medium text-white text-sm sm:text-base">{title}</h4>
                  <button
                    onClick={() => handleCopy(code, id)}
                    className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {copiedCode === id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">{description}</p>
                <pre className="text-xs sm:text-sm text-gray-400 bg-gray-800 rounded-lg p-2 sm:p-3 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
          <p>
            * Now Supported <div className='flex bg-gray-200 h-14 rounded-lg py-2 items-center gap-4'><img src="https://res.cloudinary.com/deiiozl5e/image/upload/v1751897083/mongodb-removebg-preview_iily21.png" width={100} alt="" /><img src="https://res.cloudinary.com/deiiozl5e/image/upload/v1751897083/supa-removebg-preview_f8he7j.png" width={100} alt="" /><img src="https://res.cloudinary.com/deiiozl5e/image/upload/v1751897083/fb-removebg-preview_d2dc7y.png" width={100} alt="" /></div>
          </p>
          
          <p className="text-gray-400 text-xs sm:text-sm italic">Follow up Commands will be provided after the db choice and initialization has done . Please execute accordingly (for db Spinoff) </p>
          
        </div>
      ),
    },
    {
      id: 'prompt-examples',
      title: 'Prompt Examples',
      icon: Zap,
      content: (
        <div className="space-y-4 sm:space-y-6">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Here are some example prompts to help you get started with DbSmash:
          </p>
          <div className="grid gap-3 sm:gap-4">
            {[
              {
                title: 'E-commerce Store',
                prompt: 'Create a database for an online store with products, customers, orders, and inventory tracking.',
              },
              {
                title: 'Blog Platform',
                prompt: 'Design a blogging platform with users, posts, comments, categories, and tags.',
              },
              {
                title: 'Task Management',
                prompt: 'Build a project management system with users, projects, tasks, and time tracking.',
              },
              {
                title: 'Social Media',
                prompt: 'Create a social media platform with users, posts, likes, comments, and friend relationships.',
              },
            ].map((example, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700/50">
                <h4 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">{example.title}</h4>
                <p className="text-gray-300 text-xs sm:text-sm italic">"{example.prompt}"</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'schema-output',
      title: 'Schema Output (Example)',
      icon: Terminal,
      content: (
        <div className="space-y-4 sm:space-y-6">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            DbSmash generates clean, production-ready schemas in popular formats:
          </p>
          <div className="space-y-4">
            {[
              {
                id: 'prisma',
                title: 'Prisma Schema',
                code: prismaExample,
              },
              {
                id: 'firestore',
                title: 'Firestore Rules',
                code: firestoreExample,
              },
            ].map(({ id, title, code }) => (
              <div key={id} className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-medium text-white text-sm sm:text-base">{title}</h4>
                  <button
                    onClick={() => handleCopy(code, id)}
                    className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {copiedCode === id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="text-xs w-full sm:text-sm text-gray-300 bg-gray-800 rounded-lg p-2 sm:p-3 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="pt-16 min-h-screen bg-black">
      <div className="max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <button
            className="lg:hidden fixed top-20 right-4 z-50 p-2 bg-gray-800/50 rounded-lg border border-gray-700/50"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>

          <div
            className={`lg:w-theorylg:h-96 mt-14 h-64 lg:mt-0 flex-shrink-0 fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:transform-none bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } w-64 lg:w-auto overflow-y-auto lg:sticky lg:top-24`}
          >
            <h3 className="text-lg text-center font-semibold text-white mb-4">Documentation</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    } text-sm sm:text-base`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{section.title}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {isSidebarOpen && (
            <div className="sm:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar}></div>
          )}

          <div className="flex-1 mt-12 sm:mt-0">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700/50"
            >
              {sections.find((s) => s.id === activeSection)?.content}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;