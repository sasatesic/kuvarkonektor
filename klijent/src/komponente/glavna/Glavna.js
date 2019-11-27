import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { obrisiNalog, uzmiTrenutniProfil } from "../../actions/profil";
import { faUser, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlavnaAkcije from "./GlavnaAkcije";
import Iskustvo from "./Iskustvo";
import Obrazovanje from "./Obrazovanje";
import { Link } from "react-router-dom";

const Glavna = ({
  uzmiTrenutniProfil,
  obrisiNalog,
  autorizacija: { korisnik },
  profil: { profil, loadovanje }
}) => {
  useEffect(() => {
    uzmiTrenutniProfil();
  }, []);

  return loadovanje && profil === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Glavna Stranica</h1>
      <p className="text-dark lead">
        {" "}
        <FontAwesomeIcon icon={faUser} /> Dobrodošli {korisnik && korisnik.ime}
      </p>
      {profil !== null ? (
        <Fragment>
          <GlavnaAkcije className="mb-5" />
          <Iskustvo iskustvo={profil.iskustvo} className="mb-5 mt-5" />
          <Obrazovanje obrazovanje={profil.obrazovanje} />

          <div className="my-z">
            <button className="btn btn-danger" onClick={() => obrisiNalog()}>
              <FontAwesomeIcon icon={faUserAltSlash} /> Obrisi Nalog
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="lead text-dark">
            Jos uvek niste napravili profil, molim vas dodajte podatke
          </p>
          <Link to={"/napravi-profil"} className="btn btn-primary my-1">
            <strong>Napravi Profil</strong>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Glavna.propTypes = {
  uzmiTrenutniProfil: PropTypes.func.isRequired,
  obrisiNalog: PropTypes.func.isRequired,
  autorizacija: PropTypes.object.isRequired,
  profil: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  autorizacija: state.autorizacija,
  profil: state.profil
});

export default connect(
  mapStateToProps,
  { uzmiTrenutniProfil, obrisiNalog }
)(Glavna);
