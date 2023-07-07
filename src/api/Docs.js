import axios from "axios";
import AuthService from "./AuthService";

const API_URL = window.g.API_URL + "/api/docs";

const uploadDocs = (formData) => {
  return axios.post(API_URL + "/docsUpload", formData);
};

const Docs = {
  uploadDocs,
};

export default Docs;
