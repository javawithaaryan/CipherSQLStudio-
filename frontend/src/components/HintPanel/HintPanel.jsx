import React, { useState } from 'react';
import { getHint } from '../../services/api';
import './HintPanel.scss';

const HintPanel = ({ question, userQuery }) => {
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHint = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getHint(question, userQuery);
      setHint(res.data.hint);
    } catch (err) {
      setError('Could not fetch hint. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hint-panel">
      <div className="hint-panel__header">
        <h3>AI Assistant</h3>
        <button 
          className="btn btn--secondary" 
          onClick={fetchHint}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Get Hint'}
        </button>
      </div>
      
      <div className="hint-panel__content">
        {error && <p className="error">{error}</p>}
        {hint && !loading && (
          <div className="hint-bubble">
            <p>{hint}</p>
          </div>
        )}
        {!hint && !loading && !error && (
          <p className="placeholder">Stuck? Request a hint from the AI tutor to guide your reasoning.</p>
        )}
      </div>
    </div>
  );
};

export default HintPanel;
