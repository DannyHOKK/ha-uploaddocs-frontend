import React, { useContext, useEffect, useState } from "react";
import { BookingPageContext } from "./BookingPageContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityBtn = ({ product }) => {
  const { cartItems, setCartItems } = useContext(BookingPageContext);

  let productIndexInCart = cartItems.findIndex((element) => {
    return element.id === product.id;
  });

  const handleAdd = () => {
    if (productIndexInCart === -1) {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
        },
      ]);
      console.log("cartItems " + product.name);
    } else if (
      productIndexInCart !== -1 &&
      cartItems[productIndexInCart].quantity < product.quantity
    ) {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity++;
      setCartItems(newCartArray);
      console.log(cartItems[productIndexInCart]);
    }
  };

  const handleSubtract = () => {
    if (cartItems[productIndexInCart].quantity === 1) {
      console.log("test");
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexInCart);
      setCartItems(newCartArray);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity--;
      setCartItems(newCartArray);
    }
    console.log("quantity " + cartItems[productIndexInCart].quantity);
    console.log(cartItems[productIndexInCart]);
  };

  useEffect(() => {
    console.log(product);
    console.log(cartItems);
  }, []);

  return (
    <>
      <strong style={{ fontWeight: "900" }}>{product.name}</strong>

      {productIndexInCart !== -1 ? (
        <span>
          <a onClick={handleSubtract}>
            <RemoveIcon />
          </a>
          {"  "}
          {cartItems[productIndexInCart].quantity}/{product.quantity}
          {"  "}
          <a onClick={handleAdd}>
            <AddIcon />
          </a>
        </span>
      ) : (
        <span>
          <span style={{ color: "grey" }}>
            <a>
              <RemoveIcon />
            </a>
            {"  "}
            0/{product.quantity}
            {"  "}
          </span>
          <a onClick={handleAdd}>
            <AddIcon />
          </a>
        </span>
      )}
      {/* <span>
        <a onClick={handleSubtract}>
          <RemoveIcon />
        </a>
        {"  "}
        {productIndexInCart !== -1 ? (
          <>
            {cartItems[productIndexInCart].quantity}/{product.quantity}
          </>
        ) : (
          <>0/{product.quantity}</>
        )}
        {"  "}
        <a onClick={handleAdd}>
          <AddIcon />
        </a>
      </span> */}
    </>
  );
};

export default QuantityBtn;
