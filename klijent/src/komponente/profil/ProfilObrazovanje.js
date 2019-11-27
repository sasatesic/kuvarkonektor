import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfilObrazovanje = ({
  obrazovanje: { skola, diploma, zvanje, trenutno, od, doDatum, opis }
}) => {
  return (
    <div>
      <div>
        <h3 className="text-dark">{skola}</h3>
        <p>
          <Moment format="DD/MM/YYYY">{od}</Moment> -{" "}
          {!doDatum ? "Sada" : <Moment format="DD/MM/YYYY">{doDatum}</Moment>}
        </p>
        <p>
          <strong>Diploma: </strong>
          {diploma}
        </p>
        <p>
          <strong>Zvanje: </strong>
          {zvanje}
        </p>
        <p>
          <strong>Opis: </strong> {opis}
        </p>
      </div>
    </div>
  );
};

ProfilObrazovanje.propTypes = {
    obrazovanje: PropTypes.object.isRequired
};

export default ProfilObrazovanje;
