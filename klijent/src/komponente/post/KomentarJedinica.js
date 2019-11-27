import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { obrisiKomentar } from "../../actions/post";

import {
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const KomentarJedinica = ({
  autorizacija,
  postId,
  komentar: { _id, tekst, ime, avatar, korisnik, datum },
  obrisiKomentar
}) => {
  return (
    <div className="post bg-light p-1 my-1">
      <div>
        <Link to={`/profil/${korisnik}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{ime}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{tekst}</p>
        <p className="post-date">
          Postovano <Moment format="DD/MM/YYYY">{datum}</Moment>
        </p>
          {!autorizacija.loadovanje && korisnik === autorizacija.korisnik._id && (
              <button onClick={e => obrisiKomentar(postId, _id)} className="btn btn-danger">Obrisi Komentar</button>
          )}
      </div>
    </div>
  );
};

KomentarJedinica.propTypes = {
  postId: PropTypes.number.isRequired,
  komentar: PropTypes.object.isRequired,
  autorizacija: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  autorizacija: state.autorizacija
});

export default connect(
  mapStateToProps,
  { obrisiKomentar }
)(KomentarJedinica);
