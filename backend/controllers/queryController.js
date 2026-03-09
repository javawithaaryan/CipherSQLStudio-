const sandboxService = require('../services/sandboxService');

exports.executeQuery = async (req, res) => {
  const { query, userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  if (!query) {
    return res.status(400).json({ error: "query is required" });
  }

  try {
    // querySanitizer middleware already sanitizes the query format (no DROP, INSERT, etc.)
    const result = await sandboxService.executeInWorkspace(userId, query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
