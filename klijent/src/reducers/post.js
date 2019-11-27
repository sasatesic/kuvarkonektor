import {
  UZMI_POSTOVE,
  POST_GRESKA,
  AZURIRAJ_LAJK,
  OBRISI_POST,
  DODAJ_POST,
  UZMI_POST,
  OBRISI_KOMENTAR,
  DODAJ_KOMENTAR
} from "../actions/tipovi";

const inicijalniState = {
  postovi: [],
  post: null,
  loadovanje: true,
  error: {}
};

export default function(state = inicijalniState, action) {
  const { type, payload } = action;

  switch (type) {
    case UZMI_POSTOVE:
      return {
        ...state,
        postovi: payload,
        loadovanje: false
      };
    case POST_GRESKA:
      return {
        ...state,
        error: payload,
        loadovanje: false
      };
    case AZURIRAJ_LAJK:
      return {
        ...state,
        postovi: state.postovi.map(post =>
          post._id === payload.id ? { ...post, lajkovi: payload.lajkovi } : post
        ),
        loadovanje: false
      };
    case OBRISI_POST:
      return {
        ...state,
        postovi: state.postovi.filter(post => post._id !== payload),
        loadovanje: false
      };
    case DODAJ_POST:
      return {
        ...state,
        postovi: [payload, ...state.postovi],
        loadovanje: false
      };
    case UZMI_POST:
      return {
        ...state,
        post: payload,
        loadovanje: false
      };
    case OBRISI_KOMENTAR:
      return {
        ...state,
        post: {
          ...state.post,
          komentari: state.post.komentari.filter(
            komentar => komentar._id !== payload
          ),
          loadovanje: false
        }
      };
    case DODAJ_KOMENTAR:
      return {
        ...state,
        post: { ...state.post, komentari: payload },
        loadovanje: false
      };
    default:
      return state;
  }
}
