import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Naslovna = ({ odradjenaAutentikacija }) => {

  if(odradjenaAutentikacija) {
    return <Redirect to="/glavna"/>
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large text-light">Kuvar Konektor</h1>
          <p className="lead">
            Napravite svoj profil i podelite ga, delite svoje postove sa drugim korisnicima i potražite pomoc od drugi kuvara
          </p>
          <div>
            <div>

            </div>
            <Link to="/registracija" className="btn btn-lg btn-success mr-4">
              Registracija
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Naslovna.propTypes = {
  odradjenaAutentikacija: PropTypes.bool
};

const mapStateToProps = state => ({
  odradjenaAutentikacija: state.autorizacija.odradjenaAutentikacija
});

export default connect(mapStateToProps)(Naslovna);
