const express = require('express');
const konekcija = require('./config/bazaPodataka');

const korisnikRuter = require('./rute/api/korisnici');
const autorizacijaRuter = require('./rute/api/autorizacija');
const profilRuter = require('./rute/api/profil');
const postRuter = require('./rute/api/postovi');

const app = express();

//Otvaranje konekcije sa bazon
konekcija();

//Middleware
app.use(express.json({ extended: false }));

//Definisanje ruta
app.use('/api/korisnici', korisnikRuter);
app.use('/api/autorizacija', autorizacijaRuter);
app.use('/api/profil', profilRuter);
app.use('/api/postovi', postRuter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server radi na portu: ' + PORT));