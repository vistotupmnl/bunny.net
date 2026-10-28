const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access Denied: Missing Authorization Header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or Expired Token' });
  }
};
