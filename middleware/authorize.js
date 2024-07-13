// backend/src/middleware/authorize.js
const jwt = require('jsonwebtoken');
function authorize(roles = []) {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      const decodedToken = jwt.decode(req.headers.authorization);
      console.log(decodedToken);
      if (!roles.includes(decodedToken.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    };
  }
  
  module.exports = authorize;
  