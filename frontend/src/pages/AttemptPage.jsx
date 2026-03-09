import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SQLEditor from '../components/SQLEditor/SQLEditor';
import ResultsPanel from '../components/ResultsPanel/ResultsPanel';
import HintPanel from '../components/HintPanel/HintPanel';
import SampleDataViewer from '../components/SampleDataViewer/SampleDataViewer';
import { getAssignmentById, executeQuery } from '../services/api';
import './AttemptPage.scss';

const AttemptPage = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState('');
  const [queryError, setQueryError] = useState('');

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await getAssignmentById(id);
        setAssignment(res.data);
      } catch (err) {
        setError('Failed to load assignment details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleExecute = async () => {
    if (!query.trim()) return;
    
    setIsExecuting(true);
    setQueryError('');
    setResults(null);
    
    try {
      const res = await executeQuery(query, id);
      setResults(res.data);
    } catch (err) {
      setQueryError(err.response?.data?.error || err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading) return <div className="loading">Loading workspace...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!assignment) return <div className="error-msg">Assignment not found</div>;

  return (
    <div className="attempt-page">
      <header className="attempt-page__header">
        <div className="breadcrumbs">
          <Link to="/">← Back to Challenges</Link>
          <span className="divider">/</span>
          <span className="current-title">{assignment.title}</span>
        </div>
      </header>

      <div className="workspace">
        {/* Left Column */}
        <div className="workspace__left">
          
          <div className="question-panel">
            <div className="question-panel__header">
              <h2>Problem Statement</h2>
              <span className={`badge badge--${assignment.difficulty.toLowerCase()}`}>
                {assignment.difficulty}
              </span>
            </div>
            <div className="question-panel__content">
              <p className="question-text">{assignment.question}</p>
              
              <div className="expected-output">
                <strong>Expected Objective:</strong>
                <p>{assignment.expectedOutput}</p>
              </div>
            </div>
          </div>

          <div className="viewer-container">
            <SampleDataViewer tables={assignment.tables} />
          </div>

          <div className="hint-container">
            <HintPanel question={assignment.question} userQuery={query} />
          </div>

        </div>

        {/* Right Column */}
        <div className="workspace__right">
          
          <div className="editor-container">
            <SQLEditor 
              value={query} 
              onChange={setQuery} 
              onExecute={handleExecute}
              isExecuting={isExecuting}
            />
          </div>

          <div className="results-container">
            <ResultsPanel 
              results={results} 
              error={queryError}
              isExecuting={isExecuting} 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AttemptPage;
