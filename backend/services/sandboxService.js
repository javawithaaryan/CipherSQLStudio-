const pool = require('../config/postgres');

async function createWorkspace(userId, sampleTables) {
  const schemaName = `workspace_${userId}`;
  
  // Create isolated schema
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
  
  // Load sample data from MongoDB into this schema
  for (const table of sampleTables) {
    if (!table.columns || !table.rows) continue;

    // Build CREATE TABLE from MongoDB column definitions
    const cols = table.columns
      .map(c => `${c.columnName} ${c.dataType}`)
      .join(', ');
    
    await pool.query(
      `CREATE TABLE ${schemaName}.${table.tableName} (${cols})`
    );
    
    // Insert rows from MongoDB into PostgreSQL
    for (const row of table.rows) {
      if (Object.keys(row).length === 0) continue;
      
      const keys = Object.keys(row).join(', ');
      
      // Escape values properly, handle strings vs numbers
      const vals = Object.values(row).map(v => {
        if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
        return v;
      }).join(', ');
      
      await pool.query(
        `INSERT INTO ${schemaName}.${table.tableName} (${keys}) VALUES (${vals})`
      );
    }
  }
  return schemaName;
}

async function executeInWorkspace(userId, query) {
  const schemaName = `workspace_${userId}`;
  await pool.query(`SET search_path TO ${schemaName}`);
  
  const result = await pool.query(query);
  return {
    columns: result.fields.map(f => f.name),
    rows: result.rows
  };
}

async function destroyWorkspace(userId) {
  const schemaName = `workspace_${userId}`;
  await pool.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
}

module.exports = {
  createWorkspace,
  executeInWorkspace,
  destroyWorkspace
};
