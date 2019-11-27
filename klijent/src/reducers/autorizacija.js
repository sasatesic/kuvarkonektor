import {
  REGISTRACIJA_USPESNA,
  REGISTRACIJA_NEUSPESNA,
  KORISNIK_UCITAN,
  GRESKA_U_AUTORIZACIJI,
  USPESNO_LOGOVANJE,
  NEUSPESNO_LOGOVANJE,
  LOGOUT,
  OBRISI_NALOG
} from "../actions/tipovi";

const inicijalniState = {
  token: localStorage.getItem("token"),
  odradjenaAutentikacija: null,
  loadovanje: true,
  korisnik: null
};

export default function(state = inicijalniState, action) {
  const { type, payload } = action;

  switch (type) {
    case USPESNO_LOGOVANJE:
    case REGISTRACIJA_USPESNA:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        odradjenaAutentikacija: true,
        loadovanje: false
      };
    case LOGOUT:
    case NEUSPESNO_LOGOVANJE:
    case GRESKA_U_AUTORIZACIJI:
    case REGISTRACIJA_NEUSPESNA:
    case OBRISI_NALOG:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        odradjenaAutentikacija: false,
        loadovanje: false
      };
    case KORISNIK_UCITAN:
      return {
        ...state,
        odradjenaAutentikacija: true,
        loadovanje: false,
        korisnik: payload
      };
    default:
      return state;
  }
}
