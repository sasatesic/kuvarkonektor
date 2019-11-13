const express = require("express");
const ruter = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const Korisnik = require("../../modeli/Korisnik");

ruter.post(
  "/",
  [
    check("ime", "Ime je obavezno")
      .not()
      .isEmpty(),
    check("email", "Dosta  vite validan email").isEmail(),
    check("password", "Password mora imati 6 ili vise karaktera").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ime, email, password } = req.body;

    try {
      let korisnik = await Korisnik.findOne({ email });

      if (korisnik) {
        res.status(400).json({ errors: [{ msg: "Korisnik Vec Postoji" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      korisnik = new Korisnik({
        ime,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);
      korisnik.password = await bcrypt.hash(password, salt);

      await korisnik.save();

      const token = await napraviToken(korisnik.id)

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
                resolve(token)
            }
        );
    })
}

module.exports = ruter;
