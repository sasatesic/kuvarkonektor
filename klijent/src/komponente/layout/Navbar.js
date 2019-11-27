import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/autorizacija";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({
  autorizacija: { odradjenaAutentikacija, loadovanje },
  logout
}) => {
  const linkoviZaAutorizaciju = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/glavna">
          Glavna
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/postovi">
          Postovi
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profili">
          Profili
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink onClick={logout} className="nav-link" to="!#">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </NavLink>
      </li>
    </ul>
  );

  const linkoviZaGoste = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/profili">
          Profili
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/registracija">
          Registracija
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        KuvarKonektor
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        {!loadovanje && (
          <Fragment>
            {odradjenaAutentikacija ? linkoviZaAutorizaciju : linkoviZaGoste}
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  autorizacija: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  autorizacija: state.autorizacija
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
