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
      responseType: "json",
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });
};

const updateUser = (formData) => {
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

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

const DeleteAccount = (userid) => {
  return axios
    .post(API_URL + "/deleteUser?id=" + userid, "", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });
};

const GetIcon = (userid) => {
  return axios
    .post(API_URL + "/getIcon?id=" + userid, "", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const getUserList = () => {
  return axios
    .get(API_URL + "/getUserList", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

const UserService = {
  getUser,
  updateUser,
  DeleteAccount,
  GetIcon,
  getUserList,
};

export default UserService;
