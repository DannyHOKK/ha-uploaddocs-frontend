import axios from "axios";

const API_URL = "http://localhost:8081/admin";

const registerUser = (user) => {
  return axios.post(API_URL + "/signup", {
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
  });
  // .then((res) => {
  //   // console.log("Response: ");
  //   // console.log(res.data.msg);
  // })
  // .catch((error) => {
  //   // console.log("ERROR: ");
  //   // console.log(error);
  // });
};

const loginUser = (user) => {
  return axios
    .post(API_URL + "/login", {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      console.log("ready to entry");
      if (res.data.code === 0) {
        console.log("entry ed");
        localStorage.setItem("jwt", JSON.stringify(res.data.data));
      }
    });
};

const AuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  if (token) {
    const userToken = { Authorization: "Bearer " + token };
    localStorage.setItem("userToken", userToken);
    return userToken;
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
