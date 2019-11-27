import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { napraviProfil } from "../../actions/profil";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedin,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NapraviProfil = ({ napraviProfil, history }) => {
  const [formData, setFormData] = useState({
    restoran: "",
    websajt: "",
    lokacija: "",
    status: "",
    kuhinjskeVestine: "",
    biografija: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  });

  const {
    restoran,
    websajt,
    lokacija,
    status,
    kuhinjskeVestine,
    biografija,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    napraviProfil(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Hajde da popunimo vase informacije
        kako bi istakli vas profil
      </p>
      <small>* = obavezna polja</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Vas Status Zaposlenosti</option>
            <option value="Zaposlen">Zaposlen</option>
            <option value="Nezaposlen">Nezaposlen</option>
          </select>
          <small className="form-text">
            Molim vas dajte nam vas trenutni status zaposlenosti
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Restoran"
            value={restoran}
            onChange={e => onChange(e)}
            name="restoran"
          />
          <small className="form-text">
            Moze biti vas restoran ili restoran u kojem radite
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Websajt"
            value={websajt}
            onChange={e => onChange(e)}
            name="websajt"
          />
          <small className="form-text">
            Moze biti vas websajt ili websajt restorana u kome radite
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lokacija"
            value={lokacija}
            onChange={e => onChange(e)}
            name="lokacija"
          />
          <small className="form-text">Adresa restorana</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Kuhinjske Vestine"
            value={kuhinjskeVestine}
            onChange={e => onChange(e)}
            name="kuhinjskeVestine"
          />
          <small className="form-text">
            Molim vas koristite zareze izmedju vestina (na primer. Japanska,
            Italijanska, Francuska)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Kratka biografija"
            value={biografija}
            onChange={e => onChange(e)}
            name="biografija"
          ></textarea>
          <small className="form-text">Recite nam nesto o sebi</small>
        </div>

        <div className="form-group row">
          <label htmlFor="twitter" className="col-sm-1 col-form-label">
            <FontAwesomeIcon icon={faTwitter} size="3x" className="mr-2" />
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Twitter URL"
              value={twitter}
              onChange={e => onChange(e)}
              name="twitter"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="youtube" className="col-sm-1 col-form-label">
            <FontAwesomeIcon icon={faYoutube} size="3x" className="mr-2" />
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Youtube URL"
              value={youtube}
              onChange={e => onChange(e)}
              name="youtube"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="linkedin" className="col-sm-1 col-form-label">
            <FontAwesomeIcon icon={faLinkedin} size="3x" className="mr-2" />
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Linkedin URL"
              value={linkedin}
              onChange={e => onChange(e)}
              name="linkedin"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="instagram" className="col-sm-1 col-form-label">
            <FontAwesomeIcon icon={faInstagram} size="3x" className="mr-2" />
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Instagram URL"
              value={instagram}
              onChange={e => onChange(e)}
              name="instagram"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="facebook" className="col-sm-1 col-form-label">
            <FontAwesomeIcon icon={faFacebookF} size="3x" className="mr-2" />
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Facebook URL"
              value={facebook}
              onChange={e => onChange(e)}
              name="facebook"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <input
              type="submit"
              className="form-control btn btn-primary my-1"
            />
          </div>
          <div className="col-sm-6">
            <Link className="form-control btn btn-warning my-1" to="/glavna">
              Nazad
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

NapraviProfil.propTypes = {
  napraviProfil: PropTypes.func.isRequired
};

export default connect(
  null,
  { napraviProfil }
)(withRouter(NapraviProfil));
