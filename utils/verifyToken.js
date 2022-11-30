const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(String(token), process.env.JWT, (err, user) => {
      if (err) return next(handleError(400, "token is invalid"));

      req.user = user;
      next();
    });
  } else {
    return next(handleError(400, "Not allowwed"));
  }
};

module.exports = verifyToken;
