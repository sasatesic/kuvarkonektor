import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dodajIskustvo } from "../../actions/profil";

const DodajIskustvo = ({ dodajIskustvo, history }) => {
  const [formData, setFormData] = useState({
    naslov: "",
    restoran: "",
    lokacija: "",
    od: "",
    doDatum: "",
    trenutno: false,
    opis: ""
  });

  const [doDatumNeaktivan, okiniDeaktivaciju] = useState(false);

  const { naslov, restoran, lokacija, od, doDatum, trenutno, opis } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dodajIskustvo(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Dodaj Iskustvo</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Dodaj bilo koje kulinarsko
        iskustvo koje si imao/imala u proslosti.
      </p>
      <small>* = obavezna polja</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Naziv Posla"
            name="naslov"
            value={naslov}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Restoran"
            name="restoran"
            value={restoran}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lokacija"
            name="lokacija"
            value={lokacija}
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
            Trenutni Posao
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
            <input type="submit" className="btn btn-primary my-1 form-control" />
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

DodajIskustvo.propTypes = {
  dodajIskustvo: PropTypes.func.isRequired
};

export default connect(
  null,
  { dodajIskustvo }
)(DodajIskustvo);
