import {
  PROFIL_GRESKA,
  UZMI_PROFIL,
  OCISTI_PROFIL,
  AZURIRAJ_PROFIL,
  UZMI_PROFILE
} from "../actions/tipovi";

const inicijalniState = {
  profil: null,
  profili: [],
  loadovanje: true,
  error: {}
};

export default function(state = inicijalniState, action) {
  const { type, payload } = action;

  switch (type) {
    case AZURIRAJ_PROFIL:
    case UZMI_PROFIL:
      return {
        ...state,
        profil: payload,
        loadovanje: false
      };
    case UZMI_PROFILE:
      return {
        ...state,
        profili: payload,
        loadovanje: false
      };
    case PROFIL_GRESKA:
      return {
        ...state,
        error: payload,
        loadovanje: false,
        profil: null
      };
    case OCISTI_PROFIL:
      return {
        ...state,
        profil: null,
        loadovanje: false
      };
    default:
      return state;
  }
}
