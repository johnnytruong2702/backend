// backend/src/middleware/authorize.js
const jwt = require('jsonwebtoken');
function authorize(roles = []) {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      console.log(req.headers);
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    };
  }
  
  module.exports = authorize;
  