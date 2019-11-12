const mongoose = require("./Mongoose");

const PostSchema = new mongoose.Schema({
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "korisnik"
  },
  tekst: {
    type: String,
    required: true
  },
  ime: {
    type: String
  },
  avatar: {
    type: String
  },
  lajkovi: [
    {
      korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "korisnik"
      }
    }
  ],
  komentari: [
    {
      korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "korisnik"
      },
      tekst: {
        type: String,
        required: true
      },
      ime: {
        type: String
      },
      avatar: {
        type: String
      },
      datum: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  datum: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Post = mongoose.model("post", PostSchema, "postovi");
