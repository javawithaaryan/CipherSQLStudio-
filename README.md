# CipherSQLStudio

## Setup Instructions
### Prerequisites: Node.js, PostgreSQL, MongoDB Atlas account

### Backend
cd backend && npm install
cp .env.example .env   # fill in your values
node seed.js           # Creates Postgres tables and MongoDB sample data
node server.js

### Frontend  
cd frontend && npm install
cp .env.example .env
npm run dev

## Technology Choices
- React.js: Component-based UI, fast re-renders for live results (using Vite for faster build)
- Vanilla SCSS: Fundamental styling control, no framework dependency. Follows a mobile-first premium aesthetic
- PostgreSQL: Reliable SQL sandbox execution
- MongoDB: Flexible schema for assignment metadata
- Monaco Editor: Professional code editing experience integrated via @monaco-editor/react
- Gemini API (replaces OpenAI): Intelligent hint generation with prompt control using Google's generative AI models

## Data Flow
*This data flow diagram conceptualizes what happens when a user attempts a SQL challenge.*

1. [User types SQL in Monaco Editor]
         ↓
2. [Clicks "Run Query" button]
         ↓
3. [React: POST /api/query/execute {query, assignmentId}]
         ↓
4. [Express: querySanitizer middleware checks for forbidden words]
         ↓ (if blocked)              ↓ (if allowed)
5. [Return 403 error]         [pg client executes on PostgreSQL]
                                     ↓
                           [PostgreSQL returns rows/error]
                                     ↓
                           [Express returns {columns, rows}]
                                     ↓
                           [React setState → re-render table]
                                     ↓
                           [Results Panel displays output]
