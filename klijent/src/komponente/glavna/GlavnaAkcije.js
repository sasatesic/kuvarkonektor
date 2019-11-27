import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBookReader,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";

const GlavnaAkcije = () => {
  return (
    <div className="dash-buttons">
      <Link className="btn btn-light" to="/azuriraj-profil">
        <FontAwesomeIcon icon={faEdit} /> Azuriraj Profil
      </Link>
      <Link className="btn btn-light" to="/dodaj-iskustvo">
        <FontAwesomeIcon icon={faUtensils} /> Dodaj Iskustvo
      </Link>
      <Link className="btn btn-light" to="/dodaj-obrazovanje">
        <FontAwesomeIcon icon={faBookReader} /> Dodaj Obrazovanje
      </Link>
    </div>
  );
};

export default GlavnaAkcije;
