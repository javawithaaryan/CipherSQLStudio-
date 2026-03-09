# CipherSQLStudio

## Setup Instructions
### Prerequisites: Node.js, PostgreSQL, MongoDB Atlas account

### Backend
cd backend && npm install
cp .env.example .env   # fill in your values
node seed.js           # Seeds MongoDB with assignments + sample tables
node server.js

### Frontend  
cd frontend && npm install
cp .env.example .env
npm run dev

## Technology Choices
- React.js: Component-based UI, fast re-renders for live results (using Vite for faster build)
- Vanilla SCSS: Fundamental styling control, no framework dependency. Follows a mobile-first premium aesthetic
- PostgreSQL: Isolated execution Sandbox schema per user, for secure evaluation
- MongoDB: Primary store for Assignments (and embedded table data) & user progress
- Monaco Editor: Professional code editing experience integrated via @monaco-editor/react
- Gemini API: Intelligent hint generation strictly utilizing prompt control and returning no exact solutions.

## Data Flow

### Complete Request-Response Cycle

1. [User selects assignment on HomePage]
   ↓
2. [React: GET /api/assignments/:id from MongoDB]
   Returns: title, question, difficulty, sampleTables
   ↓
3. [React: POST /api/assignments/:id/start]
   Backend creates isolated PostgreSQL schema: workspace_userId
   Loads sampleTables data from MongoDB INTO PostgreSQL schema
   ↓
4. [SampleDataViewer renders table structure from MongoDB]
   [Monaco Editor initialized and ready]
   ↓
5. [User writes SQL query → clicks "Run Query"]
   ↓
6. [React: POST /api/query/execute { query, userId }]
   ↓
7. [Express: querySanitizer middleware]
   Blocks: DROP, DELETE, INSERT, UPDATE, CREATE, ALTER, TRUNCATE
   → If blocked: returns 403 "Only SELECT queries allowed"
   → If allowed: continues to execution
   ↓
8. [Backend: SET search_path TO workspace_userId]
   [pg.query() executes user's SQL on isolated schema]
   ↓
9. [PostgreSQL returns { columns, rows } or error]
   ↓
10. [Express sends response to React]
    [React setState() triggers re-render]
    [ResultsPanel displays formatted table]
    ↓
11. [User clicks "Get Hint"]
    [React: POST /api/hints { question, userQuery }]
    [Backend calls Gemini API with hint-only prompt]
    [Returns conceptual hint, never the solution]
    ↓
12. [User finishes assignment]
    [POST /api/assignments/:id/finish]
    [Backend: DROP SCHEMA workspace_userId CASCADE]
    [Save attempt to MongoDB UserProgress collection]

### Hand-Drawn Diagram
![Data Flow Diagram](./diagram.jpg)
*Hand-drawn diagram showing complete request-response cycle*
