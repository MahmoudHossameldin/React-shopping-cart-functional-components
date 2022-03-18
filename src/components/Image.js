import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../Context";
import useHover from "../hooks/useHover";

function Image({ className, img }) {
  const [hovered, ref] = useHover();

  const { toggleFavorite, addToCart, cartItems, removeFromCart } =
    useContext(Context);

  // .includes makes something wired! It works fine after adding the item the first time but if the component rerenders, it doesn't work! Why? Because it tests for the object itself, which we do replace in the list when we favorite an image (to make isFavorite: true instead of false).
  // const alreadyInCart = cartItems.includes(img);

  const alreadyInCart = cartItems.find((item) => item.id === img.id);
  const cartIcon =
    (alreadyInCart && (
      <i
        className="ri-shopping-cart-fill cart"
        onClick={() => removeFromCart(img.id)}
      ></i>
    )) ||
    (hovered && (
      <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
    ));

  const heartIcon =
    (img.isFavorite && (
      <i
        className="ri-heart-fill favorite"
        onClick={() => toggleFavorite(img.id)}
      ></i>
    )) ||
    (hovered && (
      <i
        className="ri-heart-line favorite"
        onClick={() => toggleFavorite(img.id)}
      ></i>
    ));

  return (
    <div className={`${className} image-container`} ref={ref}>
      <img src={img.url} className="image-grid" />
      {heartIcon}
      {cartIcon}
    </div>
  );
}

Image.propTypes = {
  className: PropTypes.string,
  img: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
  }),
};

export default Image;
