const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
//   const token1="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWFubXVqanVuaUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmVlOGQwZGNhZDg3OTViMjQ1YTIzNjIiLCJpYXQiOjE3MjcyNTMzNzAsImV4cCI6MTcyNzI1Njk3MH0.2E9RR2uGOariZpfmxY9fpWcxWYva6Vqwv7emsfRUPIY"
  const token = authHeader.split(' ')[1];
//   console.log(token)
  
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
