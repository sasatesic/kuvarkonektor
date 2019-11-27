import axios from "axios";
import { postaviAlert } from "./alert";

import {
  UZMI_PROFIL,
  PROFIL_GRESKA,
  AZURIRAJ_PROFIL,
  OCISTI_PROFIL,
  OBRISI_NALOG,
  UZMI_PROFILE
} from "./tipovi";

export const uzmiTrenutniProfil = () => async dispatch => {
  try {
    const res = await axios.get("/api/profil/moj");

    dispatch({
      type: UZMI_PROFIL,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: OCISTI_PROFIL
    });

    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const uzmiProfile = () => async dispatch => {
  dispatch({ type: OCISTI_PROFIL });
  try {
    const res = await axios.get("/api/profil");

    dispatch({
      type: UZMI_PROFILE,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const uzmiProfilPoIdu = korisnikId => async dispatch => {
  try {
    const res = await axios.get(`/api/profil/korisnik/${korisnikId}`);

    dispatch({
      type: UZMI_PROFIL,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const napraviProfil = (
  formData,
  history,
  azuriranje = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profil", formData, config);

    dispatch({
      type: UZMI_PROFIL,
      payload: res.data
    });

    dispatch(
      postaviAlert(
        azuriranje ? "Profil Uspesno Azuriram" : "Profil Uspesno Napravljen",
        "success"
      )
    );

    if (!azuriranje) {
      history.push("/glavna");
    }
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      for (let error of errors) {
        dispatch(postaviAlert(error.msg, "danger"));
      }
    }

    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const dodajIskustvo = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profil/iskustvo", formData, config);
    dispatch({
      type: AZURIRAJ_PROFIL,
      payload: res.data
    });

    dispatch(postaviAlert("Iskustvo Uspesno Dodato", "success"));

    history.push("/glavna");
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      for (let error of errors) {
        dispatch(postaviAlert(error.msg, "danger"));
      }
    }

    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const dodajObrazovanje = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profil/obrazovanje", formData, config);
    dispatch({
      type: AZURIRAJ_PROFIL,
      payload: res.data
    });

    dispatch(postaviAlert("Obrazovanje Uspesno Dodato", "success"));

    history.push("/glavna");
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      for (let error of errors) {
        dispatch(postaviAlert(error.msg, "danger"));
      }
    }

    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const izbrisiIskustvo = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profil/iskustvo/${id}`);

    dispatch({
      type: AZURIRAJ_PROFIL,
      payload: res.data
    });

    dispatch(postaviAlert("Iskustvo Uspesno Obrisano", "success"));
  } catch (e) {
    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const izbrisiObrazovanje = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profil/obrazovanje/${id}`);

    dispatch({
      type: AZURIRAJ_PROFIL,
      payload: res.data
    });

    dispatch(postaviAlert("Obrazovanje Uspesno Obrisano", "success"));
  } catch (e) {
    dispatch({
      type: PROFIL_GRESKA,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const obrisiNalog = () => async dispatch => {
  if (
    window.confirm(
      "Da li ste sigurni? Nalog se ne moze povratiti nakon brisanja!"
    )
  ) {
    try {
      const res = await axios.delete(`/api/profil`);

      dispatch({
        type: OCISTI_PROFIL,
        payload: res.data
      });
      dispatch({
        type: OBRISI_NALOG,
        payload: res.data
      });

      dispatch(postaviAlert("Nalog Uspesno Obrisan", "success"));
    } catch (e) {
      dispatch({
        type: PROFIL_GRESKA,
        payload: { msg: e.response.statusText, status: e.response.status }
      });
    }
  }
};
