const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    try {
      const veryfied = jwt.verify(token, "secretKey");

      req.userId = veryfied._id;
      next();
    } catch {
      res.status(400).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      message: "Access denied",
    });
  }
};
