const mongoose = require("./Mongoose");

const ProfilSchema = new mongoose.Schema({
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "korisnik"
  },
  restoran: {
    type: String
  },
  websajt: {
    type: String
  },
  lokacija: {
    type: String
  },
  status: {
    type: String,
    requried: true
  },
  kuhinjskeVestine: {
    type: [String],
    requried: true
  },
  biografija: {
    type: String
  },
  iskustvo: [
    {
      naslov: {
        type: String,
        requried: true
      },
      restoran: {
        type: String,
        requried: true
      },
      lokacija: {
        type: String,
        requried: true
      },
      od: {
        type: Date,
        requried: true
      },
      doDatum: {
        type: Date
      },
      trenutno: {
        type: Boolean,
        requried: true
      },
      opis: {
        type: String
      }
    }
  ],
  obrazovanje: [
    {
      skola: {
        type: String,
        requried: true
      },
      diploma: {
        type: String,
        requried: true
      },
      zvanje: {
        type: String,
        requried: true
      },
      od: {
        type: Date,
        requried: true
      },
      doDatum: {
        type: Date
      },
      trenutno: {
        type: Boolean,
        requried: true
      },
      opis: {
        type: String
      }
    }
  ],
  socijalnemreze: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  datum: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profil = mongoose.model("profil", ProfilSchema, "profili");
