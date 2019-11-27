import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uzmiProfilPoIdu } from "../../actions/profil";
import ProfilGornjiDeo from "./ProfilGornjiDeo";
import ProfilInfo from "./ProfilInfo";
import ProfilIskustvo from "./ProfilIskustvo";
import ProfilObrazovanje from "./ProfilObrazovanje";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Profil = ({
  uzmiProfilPoIdu,
  profil: { profil, loadovanje },
  autorizacija,
  match
}) => {
  useEffect(() => {
    uzmiProfilPoIdu(match.params.id);
  }, [uzmiProfilPoIdu]);

  return (
    <Fragment>
      {profil === null || loadovanje ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profili" className="btn btn-warning">
            Nazad Na Profile
          </Link>
          {autorizacija.odradjenaAutentikacija &&
            autorizacija.loadovanje === false &&
            autorizacija.korisnik._id === profil.korisnik._id && (
              <Link to="/azuriraj-profil" className="btn btn-dark ml-2">
                Azuriraj Profil
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfilGornjiDeo profil={profil} />
            <ProfilInfo profil={profil} />
            <div className="profile-exp bg-white pp-2">
              <h2 className="text-primary">Iskustvo</h2>
              {profil.iskustvo.length > 0 ? (
                <Fragment>
                  {profil.iskustvo.map(iskustvo => (
                    <ProfilIskustvo key={iskustvo._id} iskustvo={iskustvo} />
                  ))}
                </Fragment>
              ) : (
                <h4>Nema iskustva</h4>
              )}
            </div>
            <div className="profile-edu bg-white pp-2">
              <h2 className="text-primary">Obrazovanje</h2>
              {profil.obrazovanje.length > 0 ? (
                  <Fragment>
                    {profil.obrazovanje.map(obrazovanje => (
                        <ProfilObrazovanje key={obrazovanje._id} obrazovanje={obrazovanje} />
                    ))}
                  </Fragment>
              ) : (
                  <h4>Nema obrazovanja</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profil.propTypes = {
  uzmiProfilPoIdu: PropTypes.func.isRequired,
  profil: PropTypes.object.isRequired,
  autorizacija: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profil: state.profil,
  autorizacija: state.autorizacija
});

export default connect(
  mapStateToProps,
  { uzmiProfilPoIdu }
)(Profil);
