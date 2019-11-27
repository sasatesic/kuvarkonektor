import React, { Fragment, useEffect } from "react";
import PostJedinica from "./PostJedinica";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uzmiPostove } from "../../actions/post";
import Spinner from "../layout/Spinner";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostForma from "./PostForma";

const Postovi = ({ uzmiPostove, post: { postovi, loadovanje } }) => {
  useEffect(() => {
    uzmiPostove();
  }, [uzmiPostove]);

  return loadovanje ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large  text-primary">Postovi</h1>
      <p className="lead">
        <FontAwesomeIcon icon={faUser} /> Dobrodosli U Nase Malo Drustvo!
      </p>
      <PostForma />
      <div className="posts">
        {postovi.map(post => (
            <div>
                <PostJedinica key={post._id} post={post} prikaziDugmice={true} />
            </div>
        ))}
      </div>
    </Fragment>
  );
};

Postovi.propTypes = {
  uzmiPostove: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { uzmiPostove }
)(Postovi);
