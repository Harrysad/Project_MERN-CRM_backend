const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("Cookies: ", req.cookies.AuthToken);

  const token = req.cookies.AuthToken;
  if (token) {
    try {
      const verified = jwt.verify(token, "secretKey");
      console.log("Verified correctly: ", verified)
      req.user = verified;
      next();
    } catch (err) {
      console.error("Invalid token: ", err)
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
