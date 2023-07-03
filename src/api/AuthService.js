import axios from "axios";

const API_URL = "http://localhost:8080/admin";

const registerUser = (user) => {
  return axios
    .post(API_URL + "/signup", {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      // console.log("Response: ");
      // console.log(res.data.msg);
    })
    .catch((error) => {
      // console.log("ERROR: ");
      // console.log(error);
    });
};

const loginUser = (user) => {
  return axios
    .post(API_URL + "/login", {
      user,
    })
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
    });
};

const AuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

const AuthService = {
  registerUser,
  loginUser,
  AuthHeader,
};

export default AuthService;
