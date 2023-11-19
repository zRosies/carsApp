import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Cart = (carsInCart) => {
  return (
    <>
      <div className="cart">
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faShoppingCart} className="cart" />
        <span className="counter">{carsInCart}</span>

        <span></span>

        <Link to="/cars">
          <button>Explore Vehicles</button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
