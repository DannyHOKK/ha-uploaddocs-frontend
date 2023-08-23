import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:8080/api/user";
const tokenHeader = AuthService.AuthHeader();

const getUser = (userid) => {
  return axios
    .post(API_URL + "/getUser?id=" + userid, "", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

const updateUser = (formData) => {
  return axios
    .post(API_URL + "/update", formData, {
      headers: {
        Authorization: tokenHeader,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

const DeleteAccount = () => {
  return axios
    .post(
      API_URL + "/deleteUser",
      {},
      {
        headers: {
          Authorization: tokenHeader,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .error((error) => {
      return error;
    });
};

const UserService = {
  getUser,
  updateUser,
  DeleteAccount,
};

export default UserService;
