import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { izbrisiIskustvo } from "../../actions/profil";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Iskustvo = ({ iskustvo, izbrisiIskustvo }) => {
  const iskustva = iskustvo.map(iskustvo => (
    <tr key={iskustvo._id}>
      <td>{iskustvo.restoran}</td>
      <td className="hide-sm">{iskustvo.naslov}</td>
      <td>
        <Moment format="DD/MM/YYYY">{iskustvo.od}</Moment> -{" "}
        {iskustvo.doDatum === null ? (
          " Sada"
        ) : (
          <Moment format="DD/MM/YYYY">{iskustvo.doDatum}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => izbrisiIskustvo(iskustvo._id)}
          className="btn btn-danger"
        >
          <FontAwesomeIcon icon={faEraser} /> Obrisi
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Iskustva</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Restoran</th>
            <th className="hide-sm">Naziv Radnog Mesta</th>
            <th className="hide-sm">Godine</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{iskustva}</tbody>
      </table>
    </Fragment>
  );
};

Iskustvo.propTypes = {
  iskustvo: PropTypes.array.isRequired,
  izbrisiIskustvo: PropTypes.func.isRequired
};

export default connect(
  null,
  { izbrisiIskustvo }
)(Iskustvo);
