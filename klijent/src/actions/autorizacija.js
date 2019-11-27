import axios from "axios";
import { postaviAlert } from "./alert";
import postaviTokenZaAutorizaciju from "../utils/postaviTokenZaAutorizaciju";
import {
  REGISTRACIJA_NEUSPESNA,
  REGISTRACIJA_USPESNA,
  KORISNIK_UCITAN,
  GRESKA_U_AUTORIZACIJI,
  USPESNO_LOGOVANJE,
  NEUSPESNO_LOGOVANJE,
  LOGOUT,
  OCISTI_PROFIL
} from "./tipovi";

export const ucitajKorisnika = () => async dispatch => {
  const { token } = localStorage;
  if (token) {
    postaviTokenZaAutorizaciju(token);
  }

  try {
    const res = await axios.get("/api/autorizacija");

    dispatch({
      type: KORISNIK_UCITAN,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: GRESKA_U_AUTORIZACIJI
    });
  }
};

export const registracija = ({ ime, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ ime, email, password });

  try {
    const res = await axios.post("/api/korisnici", body, config);
    dispatch({
      type: REGISTRACIJA_USPESNA,
      payload: res.data
    });

    dispatch(ucitajKorisnika());
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      for (let error of errors) {
        dispatch(postaviAlert(error.msg, "danger"));
      }
    }
    dispatch({
      type: REGISTRACIJA_NEUSPESNA
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/autorizacija", body, config);
    dispatch({
      type: USPESNO_LOGOVANJE,
      payload: res.data
    });

    dispatch(ucitajKorisnika());
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      for (let error of errors) {
        dispatch(postaviAlert(error.msg, "danger"));
      }
    }
    dispatch({
      type: NEUSPESNO_LOGOVANJE
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: OCISTI_PROFIL });
  dispatch({ type: LOGOUT });
};
