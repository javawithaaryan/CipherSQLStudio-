import React, { useState } from 'react';
import './SampleDataViewer.scss';

const SampleDataViewer = ({ sampleTables = [] }) => {
  const [activeTab, setActiveTab] = useState(
    sampleTables && sampleTables.length > 0 ? sampleTables[0].tableName : ''
  );

  if (!sampleTables || sampleTables.length === 0) return null;

  const currentTable = sampleTables.find(t => t.tableName === activeTab);

  return (
    <div className="sample-data">
      <div className="sample-data__header">
        <h3>Database Schema</h3>
        <div className="tabs">
          {sampleTables.map(t => (
            <button
              key={t.tableName}
              className={`tab-btn ${activeTab === t.tableName ? 'active' : ''}`}
              onClick={() => setActiveTab(t.tableName)}
            >
              {t.tableName}
            </button>
          ))}
        </div>
      </div>
      
      <div className="sample-data__content">
        {currentTable ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  {currentTable.columns.map(col => (
                    <th key={col.columnName}>{col.columnName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTable.rows.map((row, idx) => (
                  <tr key={idx}>
                    {currentTable.columns.map(col => (
                      <td key={col.columnName}>{row[col.columnName]}</td>
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
