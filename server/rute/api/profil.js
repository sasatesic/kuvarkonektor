const express = require("express");
const ruter = express.Router();
const autorizacija = require("../../middleware/autorizacija");
const { check, validationResult } = require("express-validator");

const Profil = require("../../modeli/Profil");
const Korisnik = require("../../modeli/Korisnik");
const Post = require("../../modeli/Post");

/***
 *  Ruta za dostavljanje profila ulogovanog korisnika
 */

ruter.get("/moj", autorizacija, async (req, res) => {
  try {
    const profile = await Profil.findOne({
      korisnik: req.korisnik.id
    }).populate("korisnik", ["ime", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "Ne postoji profil za ovog korisnika" });
    }

    res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

/***
 *  Ruta za pravljenje i azuriranje profila
 */

ruter.post(
  "/",
  [
    autorizacija,
    check("status", "Status je obavezan")
      .not()
      .isEmpty(),
    check("kuhinjskeVestine", "Kuhinjske vestine su obavezne")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const profilnaPolja = await mapirajProfilnaPolja(req);

    try {
      let korisnik_id = profilnaPolja.korisnik;
      let profil = await Profil.findOne({ korisnik: korisnik_id });

      if (profil) {
        profil = await azurirajProfil(profilnaPolja, korisnik_id);

        return res.json(profil);
      }

      profil = await napraviProfil(profilnaPolja);

      res.json(profil);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

ruter.get("/", async (req, res) => {
  try {
    const profili = await Profil.find().populate("korisnik", ["ime", "avatar"]);
    res.json(profili);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.get("/korisnik/:korisnik_id", async (req, res) => {
  try {
    const profil = await Profil.findOne({
      korisnik: req.params.korisnik_id
    }).populate("korisnik", ["ime", "avatar"]);

    if (!profil) {
      res.status(400).json({ msg: "Profil ne postoji" });
    }

    res.json(profil);
  } catch (e) {
    console.log(e.message);
    if (e.kind == "ObjectId") {
      res.status(400).json({ msg: "Profil ne postoji" });
    }
    res.status(500).send("Server Error");
  }
});

ruter.delete("/", autorizacija, async (req, res) => {
  try {
    await Post.deleteMany({ korisnik: req.korisnik.id });

    await Profil.findOneAndRemove({ korisnik: req.korisnik.id });

    await Korisnik.findOneAndRemove({ _id: req.korisnik.id });

    res.json({ msg: "Korisnik uspesno obrisan" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.put(
  "/iskustvo",
  [
    autorizacija,
    check("naslov", "Naslov je obavezan")
      .not()
      .isEmpty(),
    check("restoran", "Restoran je obavezan")
      .not()
      .isEmpty(),
    check("od", "Datum od je obavezan")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      naslov,
      restoran,
      lokacija,
      od,
      doDatum,
      trenutno,
      opis
    } = req.body;

    const novoIskustvo = {
      naslov,
      restoran,
      lokacija,
      od,
      doDatum,
      trenutno,
      opis
    };

    try {
      const profil = await Profil.findOne({ korisnik: req.korisnik.id });

      profil.iskustvo.unshift(novoIskustvo);

      profil.save();

      res.json(profil);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

ruter.delete("/iskustvo/:iskustvo_id", autorizacija, async (req, res) => {
  try {
    const profil = await Profil.findOne({ korisnik: req.korisnik.id });

    await obrisiIskustvo(profil, req);

    res.json(profil);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.put(
  "/obrazovanje",
  [
    autorizacija,
    check("skola", "Skola je obavezna")
      .not()
      .isEmpty(),
    check("diploma", "Diploma je obavezna")
      .not()
      .isEmpty(),
    check("zvanje", "Zvanje je obavezno")
      .not()
      .isEmpty(),
    check("od", "Datum od je obavezan")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { skola, diploma, zvanje, od, doDatum, trenutno, opis } = req.body;

    const novoObrazovanje = {
      skola,
      diploma,
      zvanje,
      od,
      doDatum,
      trenutno,
      opis
    };

    try {
      const profil = await Profil.findOne({ korisnik: req.korisnik.id });

      profil.obrazovanje.unshift(novoObrazovanje);

      profil.save();

      res.json(profil);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

ruter.delete("/obrazovanje/:obrazovanje_id", autorizacija, async (req, res) => {
  try {
    const profil = await Profil.findOne({ korisnik: req.korisnik.id });

    await obrisiObrazovanje(profil, req);

    res.json(profil);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

function obrisiIskustvo(profil, req) {
  return new Promise(async (resolve, reject) => {
    const indexZaBrisanje = profil.iskustvo
      .map(iskukstvo => iskukstvo.id)
      .indexOf(req.params.iskustvo_id);

    profil.iskustvo.splice(indexZaBrisanje, 1);
    profil.save();
    resolve();
  });
}

function obrisiObrazovanje(profil, req) {
  return new Promise(async (resolve, reject) => {
    const indexZaBrisanje = profil.obrazovanje
      .map(obrazovanje => obrazovanje.id)
      .indexOf(req.params.obrazovanje_id);

    profil.obrazovanje.splice(indexZaBrisanje, 1);
    profil.save();
    resolve();
  });
}

function azurirajProfil(profilnaPolja, korisnik_id) {
  return new Promise(async (resolve, reject) => {
    let profil = await Profil.findOneAndUpdate(
      { korisnik: korisnik_id },
      { $set: profilnaPolja },
      { new: true }
    );

    resolve(profil);
  });
}

function napraviProfil(profilnaPolja) {
  return new Promise(async (resolve, reject) => {
    console.log(profilnaPolja);
    let profil = new Profil(profilnaPolja);

    await profil.save();

    resolve(profil);
  });
}

function mapirajProfilnaPolja(req) {
  return new Promise(async (resolve, reject) => {
    const {
      restoran,
      websajt,
      lokacija,
      status,
      kuhinjskeVestine,
      biografija,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    const profilnaPolja = {};

    profilnaPolja.korisnik = req.korisnik.id;
    if (restoran) profilnaPolja.restoran = restoran;
    if (websajt) profilnaPolja.websajt = websajt;
    if (lokacija) profilnaPolja.lokacija = lokacija;
    if (status) profilnaPolja.status = status;
    if (biografija) profilnaPolja.biografija = biografija;
    if (kuhinjskeVestine) {
      profilnaPolja.kuhinjskeVestine = kuhinjskeVestine
        .split(",")
        .map(vestina => vestina.trim());
    }

    profilnaPolja.socijalnemreze = {};
    if (youtube) profilnaPolja.socijalnemreze.youtube = youtube;
    if (facebook) profilnaPolja.socijalnemreze.facebook = facebook;
    if (instagram) profilnaPolja.socijalnemreze.instagram = instagram;
    if (linkedin) profilnaPolja.socijalnemreze.linkedin = linkedin;
    if (twitter) profilnaPolja.socijalnemreze.twitter = twitter;

    resolve(profilnaPolja);
  });
}

module.exports = ruter;
