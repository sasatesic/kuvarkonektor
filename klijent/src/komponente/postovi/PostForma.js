import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { dodajPost } from "../../actions/post";

const PostForma = ({ dodajPost }) => {
  const [text, setText] = useState("");

  return (
      <div className="post-form">
        <div className="lead">
          <h3>Recite Nesto...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={e => {
            e.preventDefault();
            dodajPost({ tekst: text });
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Napravi Post"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark mb-3 mt-2" value="Submit" />
        </form>
    </div>
  );
};

PostForma.propTypes = {
  dodajPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { dodajPost }
)(PostForma);
