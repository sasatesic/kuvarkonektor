import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { izbrisiObrazovanje } from "../../actions/profil";
import {faEraser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Obrazovanje = ({ obrazovanje, izbrisiObrazovanje }) => {
  const obrazovanja = obrazovanje.map(obrazovanje => (
    <tr key={obrazovanje._id}>
      <td>{obrazovanje.skola}</td>
      <td className="hide-sm">{obrazovanje.zvanje}</td>
      <td>
        <Moment format="DD/MM/YYYY">{obrazovanje.od}</Moment> -{" "}
        {obrazovanje.doDatum === null ? (
          " Sada"
        ) : (
          <Moment format="DD/MM/YYYY">{obrazovanje.doDatum}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => izbrisiObrazovanje(obrazovanje._id)}
          className="btn btn-danger"
        >
          <FontAwesomeIcon icon={faEraser} /> Obrisi
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Obrazovanja</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Skola</th>
            <th className="hide-sm">Zvanje</th>
            <th className="hide-sm">Godine</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{obrazovanja}</tbody>
      </table>
    </Fragment>
  );
};

Obrazovanje.propTypes = {
  obrazovanje: PropTypes.array.isRequired,
  izbrisiObrazovanje: PropTypes.func.isRequired
};

export default connect(
  null,
  { izbrisiObrazovanje }
)(Obrazovanje);
