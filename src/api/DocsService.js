import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:8080/api/docs";
const tokenHeader = AuthService.AuthHeader();

const uploadDocs = (formData) => {
  return axios
    .post(API_URL + "/docsUpload", formData, {
      headers: {
        Authorization: tokenHeader,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data.msg;
    })
    .catch((err) => {
      return err;
    });
};

const DocsService = {
  uploadDocs,
};

export default DocsService;
