import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AttemptPage from './pages/AttemptPage';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="main-header">
          <Link to="/" className="logo">CipherSQLStudio</Link>
          <nav>
            {/* Future navigation items */}
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assignment/:id" element={<AttemptPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
