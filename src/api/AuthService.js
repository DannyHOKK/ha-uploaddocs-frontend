import axios from "axios";

const API_URL = "https://34.150.90.28:8443/admin";

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
      console.log(user);
      if (res.data.code === 0) {
        localStorage.setItem("userToken", "Bearer " + res.data.data.token);
        localStorage.setItem("userDetails", JSON.stringify(res.data.data));
      }
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const AuthHeader = () => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return userToken;
  } else {
    return;
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
