import axios from "axios";

const API_URL = "http://localhost:8080/admin";

const registerUser = (user) => {
  return axios.post(API_URL + "/signup", {
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
  });
};

const loginUser = (user) => {
  return axios
    .post(API_URL + "/login", {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      if (res.data.code === 0) {
        localStorage.setItem("jwt", JSON.stringify(res.data.data.token));
        const userDetails = res.data.data;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        AuthHeader();
      }
      return res;
    });
};

const AuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  if (token) {
    const userToken = "Bearer " + token;
    localStorage.setItem("userToken", userToken);
    return userToken;
  } else {
    return {};
  }
};

const SignOut = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userDetails");
  console.log("already sign out");
};

const AuthService = {
  registerUser,
  loginUser,
  AuthHeader,
  SignOut,
};

export default AuthService;
