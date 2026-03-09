const pool = require('../config/postgres');

exports.executeQuery = async (req, res) => {
  const { query, assignmentId } = req.body;
  
  try {
    // querySanitizer middleware already sanitizes the query
    const result = await pool.query(query);
    
    res.json({
      columns: result.fields.map(field => field.name),
      rows: result.rows
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
