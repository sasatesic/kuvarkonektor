import axios from "axios";

const postaviTokenZaAutorizaciju = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default postaviTokenZaAutorizaciju;
