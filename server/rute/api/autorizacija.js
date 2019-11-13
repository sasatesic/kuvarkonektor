const express = require("express");
const ruter = express.Router();
const autorizacija = require("../../middleware/autorizacija");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const Korisnik = require("../../modeli/Korisnik");

ruter.get("/", autorizacija, async (req, res) => {
  try {
    const korisnik = await Korisnik.findById(req.korisnik.id).select(
      "-password"
    );
    res.json(korisnik);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.post(
  "/",
  [
    check("email", "Dosta  vite validan email").isEmail(),
    check("password", "Password je obavezan").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let korisnik = await Korisnik.findOne({ email });

      if (!korisnik) {
        res
          .status(400)
          .json({ errors: [{ msg: "Molim vas proveride login detalje." }] });
      }

      const proveraPassworda = await bcrypt.compare(
        password,
        korisnik.password
      );

      if (!proveraPassworda) {
        res
          .status(400)
          .json({ errors: [{ msg: "Molim vas proveride login detalje." }] });
      }

      const token = await napraviToken(korisnik.id);

      res.json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server error");
    }
  }
);

async function napraviToken(korisnikId) {
  return new Promise((resolve, reject) => {
    const payload = {
      korisnik: {
        id: korisnikId
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        resolve(token);
      }
    );
  });
}

module.exports = ruter;
