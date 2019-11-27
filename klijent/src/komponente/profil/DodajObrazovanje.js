import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dodajObrazovanje } from "../../actions/profil";

const DodajObrazovanje = ({ dodajObrazovanje, history }) => {
  const [formData, setFormData] = useState({
    skola: "",
    diploma: "",
    zvanje: "",
    od: "",
    doDatum: "",
    trenutno: "",
    opis: ""
  });

  const [doDatumNeaktivan, okiniDeaktivaciju] = useState(false);

  const { zvanje, skola, diploma, od, doDatum, trenutno, opis } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dodajObrazovanje(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Dodaj Obrazovanje</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Dodaj bilo koje obrazovanje koje
        si stekao u proslosti ili si trenutno u procesu da ga steknes.
      </p>
      <small>* = obavezna polja</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skola"
            name="skola"
            value={skola}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Diploma"
            name="diploma"
            value={diploma}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Zvanje"
            name="zvanje"
            value={zvanje}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Od Datum</h4>
          <input type="date" name="od" value={od} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="trenutno"
              value={trenutno}
              onChange={() => {
                setFormData({
                  ...formData,
                  trenutno: !trenutno
                });
                okiniDeaktivaciju(!doDatumNeaktivan);
              }}
            />{" "}
            Obrazovanje U Toku
          </p>
        </div>
        <div className="form-group">
          <h4>Do Datum</h4>
          <input
            type="date"
            data-date-format="DD MMMM YYYY"
            name="doDatum"
            value={doDatum}
            onChange={e => onChange(e)}
            disabled={doDatumNeaktivan ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="opis"
            cols="30"
            rows="5"
            placeholder="Opis Posla"
            onChange={e => onChange(e)}
            value={opis}
          ></textarea>
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <input
              type="submit"
              className="btn btn-primary my-1 form-control"
            />
          </div>
          <div className="col-sm-6">
            <Link className="btn btn-warning my-1 form-control" to="/glavna">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

DodajObrazovanje.propTypes = {
  dodajIskustvo: PropTypes.func.isRequired
};

export default connect(
  null,
  { dodajObrazovanje }
)(DodajObrazovanje);
