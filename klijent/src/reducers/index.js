import { combineReducers } from "redux";
import alert from "./alert";
import autorizacija from "./autorizacija";
import profil from "./profil";
import post from './post'

export default combineReducers({
  alert,
  autorizacija,
  profil,
  post
});
