import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:8080/booking";
const tokenHeader = AuthService.AuthHeader();

const getVenueList = () => {
  return axios
    .get(API_URL + "/venue/getVenueList", {
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

const getVenue = (venueId) => {
  return axios
    .get(API_URL + `/venue/getVenue?venueId=${venueId}`, {
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

const createCart = (cart) => {
  console.log("create log");
  return axios
    .post(API_URL + "/cart/create", cart, {
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

const getCart = (userId) => {
  return axios
    .get(API_URL + "/cart/get?userId=" + userId, {
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

const BookingService = {
  getVenueList,
  getVenue,
  createCart,
  getCart,
};

export default BookingService;
