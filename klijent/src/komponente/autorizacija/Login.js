import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/autorizacija";

const Login = ({ login, odradjenaAutentikacija }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (odradjenaAutentikacija) {
    return <Redirect to="/glavna" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Ulogujte se
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Adresa"
            name="email"
            className="form-control"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            className="form-control"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary form-control"
          value="Registruj Se"
        />
      </form>
      <p className="my-1">
        Nemate nalog? <Link to="/registracija">Uloguj se</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  odradjenaAutentikacija: PropTypes.bool
};

const mapStateToProps = state => ({
  odradjenaAutentikacija: state.autorizacija.odradjenaAutentikacija
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
