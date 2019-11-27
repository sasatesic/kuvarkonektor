import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { uzmiProfile } from "../../actions/profil";
import ProfilJedinica from "./ProfilJedinica";

const Profili = ({ uzmiProfile, profil: { profili, loadovanje } }) => {
  useEffect(() => {
    uzmiProfile();
  }, []);

  return (
    <Fragment>
      {loadovanje ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Kuvari</h1>
          <p className="lead">Pretrazuj i povezi se sa drugim kuvarima!</p>
          <div className="profiles">
            {profili.length > 0 ? (
              profili.map(profil => (
                  <ProfilJedinica key={profil._id} profil={profil}/>
              ))
            ) : (
              <h4>Nijedan profil nije nadjen...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profili.propTypes = {
  uzmiProfile: PropTypes.func.isRequired,
  profil: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profil: state.profil
});

export default connect(
  mapStateToProps,
  { uzmiProfile }
)(Profili);
