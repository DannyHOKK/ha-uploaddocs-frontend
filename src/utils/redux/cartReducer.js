import {
  ADD_TO_CART,
  CART_DECREMENT,
  CART_INCREMENT,
  EMPTY_CART,
} from "./actionType";

const initialState = {
  product: [
    {
      id: 1,
      name: "講台",
      quantity: 1,
    },
    { id: 1, name: "無線咪", quantity: 1 },
    {
      id: 2,
      name: "掛耳咪",
      quantity: 2,
    },
    {
      id: 3,
      name: "譜架",
      quantity: 2,
    },
    {
      id: 4,
      name: "對講機",
      quantity: 1,
    },
    {
      id: 5,
      name: "對白板",
      quantity: 2,
    },
    {
      id: 6,
      name: "檯布",
      quantity: 4,
    },
    {
      id: 7,
      name: "檯",
      quantity: 3,
    },
    {
      id: 8,
      name: "椅",
      quantity: 10,
    },
    {
      id: 9,
      name: "三角鋼琴",
      quantity: 1,
    },
  ],
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case CART_INCREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case CART_DECREMENT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
  }
};
