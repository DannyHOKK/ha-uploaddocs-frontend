import axios from "axios";

const API_URL = "http://google.com";

const registerUser = (user) => {
  return axios.post(API_URL + "/signup", {
    user,
  });
};

const AuthService = {
  registerUser,
};

export default AuthService;
