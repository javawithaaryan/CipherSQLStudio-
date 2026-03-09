const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

exports.getHint = async (req, res) => {
  const { question, userQuery } = req.body;

  const SYSTEM_PROMPT = `
You are a SQL tutor helping a student learn SQL concepts.
The student is working on a SQL assignment and needs guidance.

STRICT RULES:
1. NEVER write the complete SQL query or solution
2. NEVER give the exact syntax that solves the problem
3. DO give conceptual hints about which SQL concepts to use
4. DO suggest thinking about specific clauses (JOIN, GROUP BY, etc.)
5. DO ask guiding questions that lead the student to think
6. Keep hints under 100 words
7. Be encouraging and educational

If the student's query has an error, explain what type of 
error it is conceptually without fixing it for them.
`;

  const userMessage = `
Assignment Question: ${question}
Student's Current Query: ${userQuery || "No query written yet"}
Provide a helpful hint only.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: { systemInstruction: SYSTEM_PROMPT }
    });
    
    res.json({ hint: response.text });
  } catch (err) {
    console.error('AI Hint Error:', err);
    res.status(500).json({ error: "Failed to generate hint." });
  }
};
