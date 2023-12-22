import {
  ADD_TO_CART,
  CART_DECREMENT,
  CART_INCREMENT,
  EMPTY_CART,
} from "./actionType";

export const add_to_cart = (productId) => {
  return {
    type: ADD_TO_CART,
    payload: productId,
  };
};

export const cart_increment = (qty) => {
  return {
    type: CART_INCREMENT,
    payload: qty,
  };
};

export const cart_decrement = (qty) => {
  return {
    type: CART_DECREMENT,
    payload: qty,
  };
};

export const empty_cart = () => {
  return {
    type: EMPTY_CAR,
  };
};
