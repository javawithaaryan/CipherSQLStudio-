import React, { useState } from 'react';
import './SampleDataViewer.scss';

// Hardcoded for demo, normally fetched from backend /api/schema
const SAMPLE_DATA = {
  employees: {
    columns: ['id', 'name', 'department', 'salary', 'hire_date'],
    rows: [
      { id: 1, name: 'Alice Smith', department: 'Engineering', salary: 120000, hire_date: '2021-03-15' },
      { id: 2, name: 'Bob Jones', department: 'Engineering', salary: 85000, hire_date: '2022-01-10' },
      { id: 3, name: 'Charlie Davis', department: 'Sales', salary: 75000, hire_date: '2020-11-20' },
    ]
  },
  departments: {
    columns: ['id', 'name', 'location', 'budget'],
    rows: [
      { id: 1, name: 'Engineering', location: 'San Francisco', budget: 5000000 },
      { id: 2, name: 'Sales', location: 'New York', budget: 2000000 },
    ]
  }
};

const SampleDataViewer = ({ tables = [] }) => {
  const [activeTab, setActiveTab] = useState(tables[0] || '');

  if (!tables || tables.length === 0) return null;

  return (
    <div className="sample-data">
      <div className="sample-data__header">
        <h3>Database Schema</h3>
        <div className="tabs">
          {tables.map(t => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="sample-data__content">
        {activeTab && SAMPLE_DATA[activeTab] ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  {SAMPLE_DATA[activeTab].columns.map(col => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SAMPLE_DATA[activeTab].rows.map((row, idx) => (
                  <tr key={idx}>
                    {SAMPLE_DATA[activeTab].columns.map(col => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">Preview not available</div>
        )}
      </div>
    </div>
  );
};

export default SampleDataViewer;
