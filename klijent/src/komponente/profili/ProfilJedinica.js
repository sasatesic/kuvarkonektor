import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import profil from "../../reducers/profil";
import { faCheckCircle, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilJedinica = ({
  profil: {
    korisnik: { _id, ime, avatar },
    status,
    restoran,
    lokacija,
    kuhinjskeVestine
  }
}) => {
  return (
    <div className="profile card" style={{background: '#E6E6FA'}}>
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{ime}</h2>
        <p>Status: {status}</p>
        {restoran && <span>Restoran: {restoran}</span>}
        <p className="my-1">{lokacija && <span>Lokacija: {lokacija}</span>}</p>
        <Link to={`/profil/${_id}`} className="btn btn-primary">
          Pogledaj Profil
        </Link>
      </div>
      <ul>
        {kuhinjskeVestine.slice(0, 4).map((vestina, index) => (
          <li key={index} className="text-primary">
            <FontAwesomeIcon icon={faCheckCircle} /> {vestina}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfilJedinica.propTypes = {
  profil: PropTypes.object.isRequired
};

export default ProfilJedinica;
