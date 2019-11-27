import axios from "axios";
import { postaviAlert } from "./alert";

import {
  UZMI_POST,
  UZMI_POSTOVE,
  POSTAVI_ALERT,
  POST_GRESKA,
  AZURIRAJ_LAJK,
  OBRISI_NALOG,
  OBRISI_POST,
  DODAJ_POST,
  DODAJ_KOMENTAR,
  OBRISI_KOMENTAR
} from "./tipovi";

export const uzmiPostove = () => async dispatch => {
  try {
    const res = await axios.get("/api/postovi");

    dispatch({
      type: UZMI_POSTOVE,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const uzmiPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/postovi/${id}`);

    dispatch({
      type: UZMI_POST,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const dodajLajk = id => async dispatch => {
  try {
    const res = await axios.put(`/api/postovi/lajk/${id}`);

    dispatch({
      type: AZURIRAJ_LAJK,
      payload: { id, lajkovi: res.data }
    });
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const obrisiLajk = id => async dispatch => {
  try {
    const res = await axios.put(`/api/postovi/unlajk/${id}`);

    dispatch({
      type: AZURIRAJ_LAJK,
      payload: { id, lajkovi: res.data }
    });
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const obrisiPost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/postovi/${id}`);

    dispatch({
      type: OBRISI_POST,
      payload: id
    });

    dispatch(postaviAlert("Post Obrisan", "success"));
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const dodajPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/postovi", formData, config);

    dispatch({
      type: DODAJ_POST,
      payload: res.data
    });

    dispatch(postaviAlert("Post Napravljen", "success"));
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const dodajKomentar = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/postovi/komentar/${postId}`,
      formData,
      config
    );

    dispatch({
      type: DODAJ_KOMENTAR,
      payload: res.data
    });

    dispatch(postaviAlert("Komentar Napravljen", "success"));
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const obrisiKomentar = (postId, komentarId) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/postovi/komentar/${postId}/${komentarId}`
    );

    dispatch({
      type: OBRISI_KOMENTAR,
      payload: komentarId
    });

    dispatch(postaviAlert("Komentar Obrisan", "success"));
  } catch (e) {
    dispatch({
      type: POST_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
