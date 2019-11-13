const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Nema tokena, autorizacija neuspesna" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.korisnik = decoded.korisnik;
    next();
  } catch (e) {
      res.status(401).json({ msg: 'Token nije validan' });
  }
};
