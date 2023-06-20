import axios from "axios";

const API_URL = "http://sss";

const registerUser = (user) => {
  return axios.post(API_URL + "/signup", {
    user,
  });
};

const AuthService = {
  registerUser,
  loginUser,
};

export default AuthService;
