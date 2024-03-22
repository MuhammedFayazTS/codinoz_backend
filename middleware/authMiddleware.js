const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the user ID to the request object
    req.body.userId = decoded.id;

    // Call the next middleware
    next();
  } catch (error) {
    // Return authentication failed message
    return res.status(401).json({ message: "Authentication failed" });
  }
};
