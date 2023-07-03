import axios from "axios";
import AuthService from "./AuthService";

const API_URL = window.g.API_URL + "/api/";

const getUserData = (id) => {
  return axios.get(API_URL + "showTale", {
    headers: AuthService.AuthHeader,
    id: id,
  });
};
