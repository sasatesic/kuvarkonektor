const express = require("express");
const ruter = express.Router();
const autorizacija = require("../../middleware/autorizacija");
const { check, validationResult } = require("express-validator");

const Korisnik = require("../../modeli/Korisnik");
const Profil = require("../../modeli/Profil");
const Post = require("../../modeli/Post");

ruter.post(
  "/",
  [
    autorizacija,
    check("tekst", "Tekst je obavezan")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const korisnik = await Korisnik.findById(req.korisnik.id).select(
        "-password"
      );

      const { tekst } = req.body;
      const { ime, avatar, id } = korisnik;

      const noviPost = new Post({
        tekst,
        ime,
        avatar,
        korisnik: id
      });

      const post = await noviPost.save();

      res.json(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

ruter.get("/", autorizacija, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.get("/:post_id", autorizacija, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post nije nadjen" });
    }

    res.json(post);
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post nije nadjen" });
    }
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.delete("/:post_id", autorizacija, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post nije nadjen" });
    }

    if (post.korisnik.toString() !== req.korisnik.id) {
      return res.status(401).json({ msg: "Korisnik nema dozvolu za brisanje" });
    }

    await post.remove();

    res.json({ msg: "post obrisan" });
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post nije nadjen" });
    }
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.put("/lajk/:post_id", autorizacija, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    console.log(req.korisnik.toString());

    if (
      post.lajkovi.filter(like => like.korisnik.toString() === req.korisnik.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post vec lajkovan" });
    }

    post.lajkovi.unshift({ korisnik: req.korisnik.id });

    await post.save();

    res.json(post.lajkovi);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.put("/unlajk/:post_id", autorizacija, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    console.log(req.korisnik.toString());

    if (
      post.lajkovi.filter(lajk => lajk.korisnik.toString() === req.korisnik.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post nije lajkovan" });
    }

    const indexZaBrisanje = post.lajkovi
      .map(lajk => lajk.korisnik.toString())
      .indexOf(req.korisnik.id);

    post.lajkovi.splice(indexZaBrisanje, 1);

    await post.save();

    res.json(post.lajkovi);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

ruter.post(
  "/komentar/:post_id",
  [
    autorizacija,
    check("tekst", "Tekst je obavezan")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const korisnik = await Korisnik.findById(req.korisnik.id).select(
        "-password"
      );
      const post = await Post.findById(req.params.post_id);

      const { tekst } = req.body;
      const { ime, avatar, id } = korisnik;
      const noviKomentar = {
        tekst,
        ime,
        avatar,
        korisnik: id
      };

      post.komentari.unshift(noviKomentar);
      await post.save();

      res.json(post.komentari);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
    }
  }
);

ruter.delete("/komentar/:post_id/:comment_id", autorizacija, async (req, res) => {
  try {
    const korisnik = await Korisnik.findById(req.korisnik.id).select(
      "-password"
    );
    const post = await Post.findById(req.params.post_id);

    const komentar = post.komentari.find(komentar => komentar.id === req.params.comment_id);

    if(!komentar) {
      return res.status(404).json({ msg: 'Komentar ne postoji' });
    }

    if(komentar.korisnik.toString() !== req.korisnik.id) {
      return res.status(401).json({ msg: 'Korisnik nema dozovolu da brise ovaj post' });
    }

    const indexZaBrisanje = post.komentari
        .map(komentar => komentar.korisnik.toString())
        .indexOf(req.korisnik.id);

    post.komentari.splice(indexZaBrisanje, 1);

    await post.save();

    res.json(post.komentari);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = ruter;
