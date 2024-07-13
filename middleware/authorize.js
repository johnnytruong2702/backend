// backend/src/middleware/authorize.js
function authorize(roles = []) {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      console.log(req.user);
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    };
  }
  
  module.exports = authorize;
  