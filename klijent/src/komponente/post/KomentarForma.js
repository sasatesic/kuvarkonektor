import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { dodajKomentar } from "../../actions/post";

const KomentarForma = ({ postId, dodajKomentar }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="lead">
        <h3>Ostavite Komentar</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          dodajKomentar(postId ,{tekst: text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="3"
          placeholder="Komentar"
          required
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input
          type="submit"
          className="btn btn-dark mb-3 mt-2"
          value="Submit"
        />
      </form>
    </div>
  );
};

KomentarForma.propTypes = {
  dodajKomentar: PropTypes.func.isRequired,
};

export default connect(
  null,
  { dodajKomentar }
)(KomentarForma);
