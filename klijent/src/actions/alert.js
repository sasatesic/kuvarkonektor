import { POSTAVI_ALERT, IZBRISI_ALERT } from "./tipovi";
import uuid from 'uuid';

export const postaviAlert = (msg, tipAlerta) => dispatch => {
    const id = uuid();
    dispatch({
        type: POSTAVI_ALERT,
        payload: { msg, tipAlerta, id }
    });

    setTimeout(() => dispatch({ type: IZBRISI_ALERT, payload: id }), 5000);
};