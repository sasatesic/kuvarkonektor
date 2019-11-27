import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfilIskustvo = ({
  iskustvo: { restoran, lokacija, naslov, trenutno, od, doDatum, opis }
}) => {
  return (
    <div>
      <div>
        <h3 className="text-dark">{restoran}</h3>
        <p>
          <Moment format="DD/MM/YYYY">{od}</Moment> -{" "}
          {!doDatum ? "Sada" : <Moment format="DD/MM/YYYY">{doDatum}</Moment>}
        </p>
        <p>
          <strong>Pozicija: </strong>
          {naslov}
        </p>
        <p>
          <strong>Opis: </strong> {opis}
        </p>
      </div>
    </div>
  );
};

ProfilIskustvo.propTypes = {
  iskustvo: PropTypes.object.isRequired
};

export default ProfilIskustvo;
