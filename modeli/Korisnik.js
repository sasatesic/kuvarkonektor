const mongoose = require('./Mongoose');

const KorisnikSchema = new mongoose.Schema({
   ime: {
       type: String,
       required: true
   },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
       type: String
    },
    datum: {
       type: Date,
        default: Date.now()
    }
});

module.exports = Korisnik = mongoose.model('korisnik', KorisnikSchema, 'korisnici');