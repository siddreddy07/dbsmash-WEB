import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Prompt 1: User description → SQL schema only
const promptSqlOnly = (userInput) => `
You are an expert database architect AI.

⚠️ IMPORTANT:
- Generate ONLY MySQL schema (DDL) based on the exact user description.
- NO React Flow nodes or edges.
- NO extra tables or columns not described.
- Use PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, DEFAULT.
- Include created_at and updated_at timestamps.
- Use standard types like INT, VARCHAR, TEXT, BOOLEAN, DATETIME.
- 🔴 Do NOT use backticks (\`) around table names or column names — use plain names only.
- Output only full CREATE TABLE statements, no sample data or inserts.
- Respond ONLY with the JSON object:

{
  "sql": "<FULL MYSQL SCHEMA HERE>"
}

User app description:
"${userInput}"
`;

// Prompt 2: SQL schema → React Flow nodes and edges only
const promptErDiagramOnly = (sqlSchema) => `
You are an expert ER diagram generator AI that creates React Flow-compatible output based on MySQL DDL schema.

---

📌 INPUT: MySQL CREATE TABLE schema (DDL)

"""
${sqlSchema}
"""

---

🎯 YOUR TASK:

1. Extract each table and its columns (with PRIMARY KEY, FOREIGN KEY, UNIQUE info).
2. Convert them into **React Flow nodes and edges**.
3. DO NOT assume or invent any new tables or columns — use only the provided SQL schema.
4. Maintain visual clarity and style in the node labels.

---

📦 OUTPUT FORMAT:

Return ONLY the following JSON object with no markdown or explanation:

{
  "initialNodes": [...],
  "initialEdges": [...]
}

---

🧩 NODE RULES (one per table):

- id: table name (string)
- type: "default"
- position: begin at x=100, y=100; add 200px x offset after each table; after 2 nodes, reset x and increase y by 200. For tables with >5 columns, use y += 300 to avoid overlap.
- style: {
    "background": "transparent",
    "border": "none",
    "width": 180,
    "padding": 0
  }
- data.label: a JSX-safe, single-line Tailwind-styled HTML <table> string

🖌️ Label Style:
- Container: \`bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden\`
- Header (thead): \`border-b-2 px-2 py-2 text-center\` with one random color from:
  - \`text-blue-500\`, \`text-pink-500\`, \`text-red-500\`, \`text-orange-500\`, \`text-purple-500\`
- Column styles:
  - PK: \`text-yellow-400 font-semibold\`
  - FK: \`text-green-400 font-semibold\`
  - UNIQUE: \`text-blue-400\`
  - Others: \`text-gray-400\`

📌 Example label:
"<table class='bg-zinc-900 w-[180px] text-white text-[12px] rounded overflow-hidden'>
  <thead>
    <tr><th colSpan='2' class='border-b-2 px-2 py-2 text-center text-blue-500'>Users</th></tr>
  </thead>
  <tbody>
    <tr class='border-t border-gray-700'>
      <td class='px-2 py-2 text-yellow-400 font-semibold'>id</td>
      <td class='px-2 py-2 text-gray-400'>INTEGER (PK)</td>
    </tr>
  </tbody>
</table>"

---

🔗 EDGE RULES:

- Create one edge for every FOREIGN KEY in the schema
- Format:
{
  "id": "<child>-<parent>",
  "source": "<child>",      // child table name
  "target": "<parent>",     // parent table name
  "type": "straight",
  "animated": true,
  "style": { "stroke": "grey", "strokeWidth": 2 }
}

---

🛑 DO NOT:
- Return extra markdown or explanation
- Add unrelated fields or assumptions
- Omit any FK-based edges

Just return:

{
  "initialNodes": [...],
  "initialEdges": [...]
}
`;


export async function genAi(userInput) {
  // 1. Generate SQL schema only
  const responseSqlStream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: promptSqlOnly(userInput) }] }],
  });

  let sqlResponseText = "";
  for await (const chunk of responseSqlStream) {
    if (chunk.text) sqlResponseText += chunk.text;
  }

  // Clean and parse SQL JSON
  const cleanedSql = sqlResponseText
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  let parsedSql;
  try {
    parsedSql = JSON.parse(cleanedSql);
  } catch (e) {
    throw new Error("Failed to parse SQL JSON response: " + e.message);
  }

  const sqlSchema = parsedSql.sql;
  if (!sqlSchema) throw new Error("SQL schema missing in AI response");

  // 2. Generate React Flow diagram nodes and edges from SQL schema
  const responseErStream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: promptErDiagramOnly(sqlSchema) }] }],
  });

  let erResponseText = "";
  for await (const chunk of responseErStream) {
    if (chunk.text) erResponseText += chunk.text;
  }

  // Clean and parse ER JSON
  const cleanedEr = erResponseText
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  let parsedEr;
  try {
    parsedEr = JSON.parse(cleanedEr);
  } catch (e) {
    throw new Error("Failed to parse ER diagram JSON response: " + e.message);
  }

  // 3. Combine and return
  return {
    sql: sqlSchema,
    initialNodes: parsedEr.initialNodes || [],
    initialEdges: parsedEr.initialEdges || [],
  };
}
