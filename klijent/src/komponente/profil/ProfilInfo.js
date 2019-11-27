import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilInfo = ({
  profil: {
    biografija,
    kuhinjskeVestine,
    korisnik: { ime }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {biografija && (
        <Fragment>
          <h2 className="text-primary">Biografija</h2>
          <p>
            {biografija}
          </p>
          <div className="line"></div>
        </Fragment>
      )}
      <h2 className="text-primary">Kuhinjske Vestina</h2>
      <div className="skills">
          {kuhinjskeVestine.map((vestina, index) => (
              <div className="p-1" key={index}>
                  <FontAwesomeIcon icon={faCheckCircle} /> {vestina}
              </div>
          ))}
      </div>
    </div>
  );
};

ProfilInfo.propTyoes = {
  profil: PropTypes.object.isRequired
};

export default ProfilInfo;
