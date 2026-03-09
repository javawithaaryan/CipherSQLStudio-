import React from 'react';
import './ResultsPanel.scss';

const ResultsPanel = ({ results, error, isExecuting }) => {
  if (isExecuting) {
    return <div className="results-panel loading">Executing query...</div>;
  }

  if (error) {
    return (
      <div className="results-panel error">
        <h4>Error Details</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="results-panel empty">
        <p>Run a query to see results here.</p>
      </div>
    );
  }

  const { columns, rows } = results;

  return (
    <div className="results-panel">
      <div className="results-panel__header">
        <h3>Query Results ({rows.length} rows)</h3>
      </div>
      
      {rows.length === 0 ? (
        <div className="empty">No rows returned.</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>{row[col] !== null ? String(row[col]) : 'NULL'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
