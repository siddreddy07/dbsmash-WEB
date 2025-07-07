

// Prompts for the typing animation
export const prompts = [
  'Create an e-commerce schema',
  'Build a blog database structure',
  'Design a task management system',
];

// Schema data for different prompts
export const schemaData = {
  'Design a task management system': {
    sql: `CREATE TABLE Users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);
CREATE TABLE Tasks (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Projects (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  task_id INT,
  FOREIGN KEY (task_id) REFERENCES Tasks(id)
);
CREATE TABLE Comments (
  id INT PRIMARY KEY,
  task_id INT,
  user_id INT,
  text TEXT,
  FOREIGN KEY (task_id) REFERENCES Tasks(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);`,
    initialNodes: [
      {
        id: 'Users',
        type: 'default',
        position: { x: 50, y: 50 },
        style: {
          background: 'transparent',
          border: 'none',
          width: 180,
          padding: 0
        },
        data: {
          label: "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-blue-500'>Users</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-gray-400'>username</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-gray-400'>email</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr></tbody></table>"
        }
      },
      {
        id: 'Tasks',
        type: 'default',
        position: { x: 270, y: 50 },
        style: {
          background: 'transparent',
          border: 'none',
          width: 180,
          padding: 0
        },
        data: {
          label: "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-pink-500'>Tasks</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-green-400 font-semibold'>user_id</td><td class='px-2 py-2 text-gray-400'>INT (FK to Users)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-gray-400'>title</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-gray-400'>status</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr></tbody></table>"
        }
      },
      
    ],
      initialEdges: [
      {
        id: 'Tasks-Users',
        source: 'Tasks',
        target: 'Users',
        type: 'straight',
        animated: true,
        style: { stroke: 'grey', strokeWidth: 2 }
      },
      {
        id: 'Projects-Tasks',
        source: 'Projects',
        target: 'Tasks',
        type: 'straight',
        animated: true,
        style: { stroke: 'grey', strokeWidth: 2 }
      },
      
    ]
  },

  'Create an e-commerce schema': {
  sql: `CREATE TABLE Customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
CREATE TABLE Products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2)
);`,
  initialNodes: [
    {
      id: 'Customers',
      type: 'default',
      position: { x: 50, y: 50 },
      style: {
        background: 'transparent',
        border: 'none',
        width: 180,
        padding: 0,
      },
      data: {
        label:
          "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-orange-500'>Customers</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>name</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>email</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr></tbody></table>",
      },
    },
    {
      id: 'Products',
      type: 'default',
      position: { x: 270, y: 50 },
      style: {
        background: 'transparent',
        border: 'none',
        width: 180,
        padding: 0,
      },
      data: {
        label:
          "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-purple-500'>Products</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>name</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>price</td><td class='px-2 py-2 text-gray-400'>DECIMAL</td></tr></tbody></table>",
      },
    },
  ],
  initialEdges: [],
},

  'Build a blog database structure': {
  sql: `CREATE TABLE Users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100)
);
CREATE TABLE Posts (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  content TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);`,
  initialNodes: [
    {
      id: 'Users',
      type: 'default',
      position: { x: 50, y: 50 },
      style: {
        background: 'transparent',
        border: 'none',
        width: 180,
        padding: 0,
      },
      data: {
        label:
          "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-blue-500'>Users</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>username</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>email</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr></tbody></table>",
      },
    },
    {
      id: 'Posts',
      type: 'default',
      position: { x: 270, y: 50 },
      style: {
        background: 'transparent',
        border: 'none',
        width: 180,
        padding: 0,
      },
      data: {
        label:
          "<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'><thead><tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-pink-500'>Posts</th></tr></thead><tbody><tr class='border-t border-gray-700'><td class='px-2 py-2 text-yellow-400 font-semibold'>id</td><td class='px-2 py-2 text-gray-400'>INT (PK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2 text-green-400 font-semibold'>user_id</td><td class='px-2 py-2 text-gray-400'>INT (FK)</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>title</td><td class='px-2 py-2 text-gray-400'>VARCHAR</td></tr><tr class='border-t border-gray-700'><td class='px-2 py-2'>content</td><td class='px-2 py-2 text-gray-400'>TEXT</td></tr></tbody></table>",
      },
    },
  ],
  initialEdges: [
    {
      id: 'Posts-Users',
      source: 'Posts',
      target: 'Users',
      type: 'straight',
      animated: true,
      style: { stroke: 'grey', strokeWidth: 2 },
    },
  ],
},


};