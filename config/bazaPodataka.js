const mongoose = require("mongoose");
const config = require("config");
const baza = config.get("mongoURI");

const konekcija = async () => {
  try {
    await mongoose.connect(baza, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Konekcija sa bazom uspesna");
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

module.exports = konekcija;
