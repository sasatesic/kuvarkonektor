import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { uzmiPost } from "../../actions/post";
import PostJedinica from "../postovi/PostJedinica";
import { Link } from "react-router-dom";
import KomentarForma from "./KomentarForma";
import KomentarJedinica from "./KomentarJedinica";

const Post = ({ uzmiPost, post: { post, loadovanje }, match }) => {
  useEffect(() => {
    uzmiPost(match.params.id);
  }, [uzmiPost]);

  return loadovanje || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={"/postovi"} className="btn btn-warning mb-3">
        Nazad na postove
      </Link>
      <PostJedinica post={post} prikaziDugmice={false} />
      <KomentarForma postId={post._id} />
      <div className="comments">
        {post.komentari.map(komentar => (
          <KomentarJedinica
            key={komentar._id}
            komentar={komentar}
            postId={post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  uzmiPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { uzmiPost }
)(Post);
