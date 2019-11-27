import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { postaviAlert } from "../../actions/alert";
import { registracija } from "../../actions/autorizacija";
import PropTypes from "prop-types";

const Registracija = ({
  postaviAlert,
  registracija,
  odradjenaAutentikacija
}) => {
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    password: "",
    password2: ""
  });

  const { ime, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      postaviAlert("Passwordi se ne poklapaju!", "danger");
    } else {
      registracija({ ime, email, password });
    }
  };

  if (odradjenaAutentikacija) {
    return <Redirect to="/glavna" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Registrujte se</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faPlusCircle} /> Napravite Nalog
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Ime"
            name="ime"
            required
            className="form-control"
            value={ime}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Adresa"
            name="email"
            className="form-control"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Ova aplikacija koristi Gravatar tako da ako zelite profilnu sliku
            molim vas koristite gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            className="form-control"
            value={password2}
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
        Već imate nalog? <Link to="/login">Ulogujte se</Link>
      </p>
    </Fragment>
  );
};

Registracija.propTypes = {
  postaviAlert: PropTypes.func.isRequired,
  registracija: PropTypes.func.isRequired,
  odradjenaAutentikacija: PropTypes.bool
};

const mapStateToProps = state => ({
  odradjenaAutentikacija: state.autorizacija.odradjenaAutentikacija
});

export default connect(
  mapStateToProps,
  { postaviAlert, registracija }
)(Registracija);
