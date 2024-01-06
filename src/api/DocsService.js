import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "https://dannyhkk.site:8443/api/docs";
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

const getDocsList = () => {
  return axios
    .get(API_URL + "/getDocsList", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const searchDocsList = (query) => {
  console.log(query);
  return axios
    .post(API_URL + "/searchDocsList", query, {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const downloadDocs = (id) => {
  return axios
    .post(API_URL + "/docsDownload?id=" + id, "", {
      headers: {
        Authorization: tokenHeader,
      },
      responseType: "blob",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const deleteDocsId = (id) => {
  return axios
    .post(API_URL + "/deleteDocs?refNo=" + id, "", {
      headers: {
        Authorization: tokenHeader,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const DocsService = {
  uploadDocs,
  getDocsList,
  searchDocsList,
  downloadDocs,
  deleteDocsId,
};

export default DocsService;
