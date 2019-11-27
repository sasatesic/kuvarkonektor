import { POSTAVI_ALERT, IZBRISI_ALERT } from "../actions/tipovi";

const inicijalniState = [];

export default function(state = inicijalniState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case POSTAVI_ALERT:
      return [...state, payload];
    case IZBRISI_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
