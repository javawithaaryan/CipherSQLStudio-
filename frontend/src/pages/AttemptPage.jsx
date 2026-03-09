import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SQLEditor from '../components/SQLEditor/SQLEditor';
import ResultsPanel from '../components/ResultsPanel/ResultsPanel';
import HintPanel from '../components/HintPanel/HintPanel';
import SampleDataViewer from '../components/SampleDataViewer/SampleDataViewer';
import { getAssignmentById, executeQuery, startAssignment, finishAssignment } from '../services/api';
import './AttemptPage.scss';

const AttemptPage = () => {
  const { id } = useParams();
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));
  
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const [error, setError] = useState('');
  const [queryError, setQueryError] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const initializeWorkspace = async () => {
      try {
        const res = await getAssignmentById(id);
        if (isMounted) setAssignment(res.data);
        
        // Spin up isolated PostgreSQL schema with the sample tables
        await startAssignment(id, userId);
        if (isMounted) setLoadingWorkspace(false);

      } catch (err) {
        if (isMounted) setError('Failed to initialize workspace or load assignment.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    initializeWorkspace();

    // Cleanup workspace strictly on unmount
    return () => {
      isMounted = false;
      // using navigator.sendBeacon is safer for unmount networking, 
      // but fetch works reliably to hit /finish API since it's asynchronous
      finishAssignment(id, userId).catch(e => console.error("Workspace cleanup failed", e));
    };
  }, [id, userId]);

  const handleExecute = async () => {
    if (!query.trim()) return;
    
    setIsExecuting(true);
    setQueryError('');
    setResults(null);
    
    try {
      const res = await executeQuery(query, userId); // Use strictly isolated schema via userId
      setResults(res.data);
    } catch (err) {
      setQueryError(err.response?.data?.error || err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading || loadingWorkspace) {
    return (
      <div className="loading">
        <h2>{loading ? 'Loading assignment details...' : 'Spinning up isolated PostgreSQL schema...'}</h2>
        <p>Please wait while we initialize your secure environment.</p>
      </div>
    );
  }
  
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
              
              {assignment.expectedOutput && (
                <div className="expected-output">
                  <strong>Expected Objective:</strong>
                  <p>Check your logic carefully. We expect a type of: {assignment.expectedOutput.type}</p>
                </div>
              )}
            </div>
          </div>

          <div className="viewer-container">
            {/* Displaying Sample Tables directly from MongoDB Assignment object */}
            <SampleDataViewer sampleTables={assignment.sampleTables} />
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
