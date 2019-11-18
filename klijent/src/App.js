import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./komponente/layout/Navbar";
import Naslovna from "./komponente/layout/Naslovna";
import Registracija from "./komponente/autorizacija/Registracija";
import Login from "./komponente/autorizacija/Login";
import Alert from "./komponente/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
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
          </Switch>
        </section>
      </Fragment>
      ;
    </BrowserRouter>
  </Provider>
);

export default App;
