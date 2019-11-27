import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { dodajLajk, obrisiLajk, obrisiPost } from "../../actions/post";
import {
  faSignOutAlt,
  faThumbsUp,
  faThumbsDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostJedinica = ({
  dodajLajk,
  obrisiLajk,
  obrisiPost,
  autorizacija,
  post: { _id, tekst, ime, avatar, korisnik, lajkovi, komentari, datum },
  prikaziDugmice
}) => {
  return (
    <div className="post bg-light pt-4 mb-4">
      <div>
        <Link to={`/profil/${korisnik}`}>
          <img className="round-img" src={avatar} alt="" />
          <hr />
          <h4 className="text-primary">{ime}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1 p-2 text">{tekst}</p>
        <p className="post-date">
          Postovano <Moment format="DD/MM/YYYY">{datum}</Moment>
        </p>

          {prikaziDugmice && <Fragment>
              <button
                  onClick={e => dodajLajk(_id)}
                  type="button"
                  className="btn btn-light mr-2"
              >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  {lajkovi.length > 0 && <span> {lajkovi.length}</span>}
              </button>
              <button
                  onClick={e => obrisiLajk(_id)}
                  type="button"
                  className="btn btn-light"
              >
                  <FontAwesomeIcon icon={faThumbsDown} />
              </button>
              <Link to={`/post/${_id}`} className="btn btn-primary m-2">
                  Diskusija{" "}
                  {komentari.length > 0 && (
                      <span className="comment-count"> {komentari.length}</span>
                  )}
              </Link>
              {!autorizacija.loadovanje && korisnik === autorizacija.korisnik._id && (
                  <button
                      onClick={e => obrisiPost(_id)}
                      type="button"
                      className="btn btn-danger m-2"
                  >
                      <FontAwesomeIcon icon={faTimes} />
                  </button>
              )}
          </Fragment>}
      </div>
    </div>
  );
};

PostJedinica.propTypes = {
  autorizacija: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  dodajLajk: PropTypes.func.isRequired,
  obrisiLajk: PropTypes.func.isRequired,
  obrisiPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  autorizacija: state.autorizacija
});

export default connect(
  mapStateToProps,
  { dodajLajk, obrisiLajk, obrisiPost }
)(PostJedinica);
