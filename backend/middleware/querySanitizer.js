const forbidden = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'CREATE', 'ALTER', 'TRUNCATE', 'GRANT', 'REVOKE'];

function sanitizeQuery(req, res, next) {
  const query = req.body.query?.toUpperCase().trim();
  
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const hasForbidden = forbidden.some(word => query.includes(word));
  if (hasForbidden) {
    return res.status(403).json({ 
      error: "Only SELECT queries are allowed." 
    });
  }
  next();
}

module.exports = sanitizeQuery;
