import React from 'react';
import Editor from '@monaco-editor/react';
import './SQLEditor.scss';

const SQLEditor = ({ value, onChange, onExecute, isExecuting }) => {
  return (
    <div className="sql-editor">
      <div className="sql-editor__header">
        <h3>SQL Editor</h3>
        <button 
          className="btn" 
          onClick={onExecute}
          disabled={isExecuting || !value.trim()}
        >
          {isExecuting ? 'Running...' : 'Run Query'}
        </button>
      </div>
      <div className="sql-editor__container">
        <Editor
          height="100%"
          defaultLanguage="sql"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  );
};

export default SQLEditor;
