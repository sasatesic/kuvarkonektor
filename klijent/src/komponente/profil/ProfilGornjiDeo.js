import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedin,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilGornjiDeo = ({
  profil: {
    status,
    restoran,
    lokacija,
    websajt,
    socijalnemreze,
    korisnik: { ime, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{ime}</h1>
      <p className="lead">Status zaposlenja: {status}</p>
      <p className="lead">{restoran && <span>Restoran: {restoran}</span>}</p>
      <p>{lokacija && <span>{lokacija}</span>}</p>
      <div className="icons my-1">
        {websajt && (
          <a href={websajt} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGlobe} size="3x" className="mr-2" />
          </a>
        )}
        {socijalnemreze && socijalnemreze.twitter && (
          <a
            href={socijalnemreze.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="3x" className="mr-2" />
          </a>
        )}
        {socijalnemreze && socijalnemreze.facebook && (
          <a
            href={socijalnemreze.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} size="3x" className="mr-2" />
          </a>
        )}
        {socijalnemreze && socijalnemreze.linkedin && (
          <a
            href={socijalnemreze.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="3x" className="mr-2" />
          </a>
        )}
        {socijalnemreze && socijalnemreze.youtube && (
          <a
            href={socijalnemreze.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="3x" className="mr-2" />
          </a>
        )}
        {socijalnemreze && socijalnemreze.instagram && (
          <a
            href={socijalnemreze.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" className="mr-2" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfilGornjiDeo.propTypes = {
  profil: PropTypes.object.isRequired
};

export default ProfilGornjiDeo;
