import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivatnaRuta from "./komponente/rutiranje/PrivatnaRuta";
import Navbar from "./komponente/layout/Navbar";
import Naslovna from "./komponente/layout/Naslovna";
import Registracija from "./komponente/autorizacija/Registracija";
import Login from "./komponente/autorizacija/Login";
import Alert from "./komponente/layout/Alert";
import Glavna from "./komponente/glavna/Glavna";
import NapraviProfil from "./komponente/profil/NapraviProfil";
import AzurirajProfil from "./komponente/profil/AzurirajProfil";
import DodajIskustvo from "./komponente/profil/DodajIskustvo";
import DodajObrazovanje from "./komponente/profil/DodajObrazovanje";
import Profili from "./komponente/profili/Profili";
import Profil from "./komponente/profil/Profil";
import Postovi from "./komponente/postovi/Postovi";
import Post from "./komponente/post/Post";
import postaviTokenZaAutorizaciju from "./utils/postaviTokenZaAutorizaciju";
import { ucitajKorisnika } from "./actions/autorizacija";
//Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => {
  const { token } = localStorage;
  if (token) {
    postaviTokenZaAutorizaciju(token);
  }

  useEffect(() => {
    store.dispatch(ucitajKorisnika());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Naslovna} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/registracija" component={Registracija} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profili" component={Profili} />
              <Route exact path="/profil/:id" component={Profil} />
              <PrivatnaRuta exact path="/glavna" component={Glavna} />
              <PrivatnaRuta
                exact
                path="/napravi-profil"
                component={NapraviProfil}
              />
              <PrivatnaRuta
                exact
                path="/azuriraj-profil"
                component={AzurirajProfil}
              />
              <PrivatnaRuta
                exact
                path="/dodaj-iskustvo"
                component={DodajIskustvo}
              />
              <PrivatnaRuta
                exact
                path="/dodaj-obrazovanje"
                component={DodajObrazovanje}
              />
              <PrivatnaRuta exact path="/postovi" component={Postovi} />
              <PrivatnaRuta exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
