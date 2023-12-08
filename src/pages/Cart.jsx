import { useEffect, useState } from "react";
import { getCartInfo, getPriceInfo, parseLocalInfo } from "../components/utils";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

import "../css/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartInfo, setCartInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [items, setItems] = useState(0);
  const [carsPrice, setCarsPrice] = useState(0);
  const [itemLength, setItemsLength] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    getCartInfo(setCartInfo);
  }, []);

  useEffect(() => {
    console.log();

    if (cartInfo != null) {
      if (cartInfo.length > 0) {
        getPriceInfo(cartInfo, setTotal, setFee, setItems, setCarsPrice);
        setSubtotal(total - fee);
      }
    }
  }, [cartInfo]);

  useEffect(() => {
    const local = localStorage.getItem("cart") || [];

    if (local.length > 0) {
      const cart = JSON.parse(local);
      setItemsLength(cart.length);
    }
  }, [itemLength]);

  useEffect(() => {
    if (total !== 0 || fee !== 0) {
      setSubtotal(total - fee);
    }
  }, [total, fee]);

  // -------Deleting from the cart here ------
  const deleteFromCart = (itemIndex) => {
    let cart = parseLocalInfo("cart");

    if (itemIndex === 0) {
      cart.shift();
    } else if (itemIndex > 0 && itemIndex < cart.length) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartInfo([...cart]);
    setItemsLength(cart.length);
  };

  return (
    <>
      {itemLength === 0 ? (
        <>
          <div className="no-i">
            <p>No items added yet.</p>
            <p>Add items to the cart !</p>
            <FaShoppingCart id="cart" />
          </div>
        </>
      ) : (
        <div className="main-container">
          <section className="all-information">
            <div className="intro-cart">
              <h1>Shopping Cart</h1>
              <h1 id="items">
                <span id="items-length">{itemLength}</span>Items
              </h1>
            </div>

            <section className="prod-container">
              <div className="title">
                <p>Product Details</p>
                <p>Price</p>
                <p>Quantity</p>

                <p>Total</p>
              </div>
              {cartInfo.map((dataObject, index) => {
                const { car, paymentInfo } = dataObject;
                // console.log(paymentInfo);
                return (
                  <>
                    <div key={car.name} className="cart-container">
                      <div className="cart-image">
                        <img src={car.image.url} alt={car.name} />
                      </div>
                      <div>
                        <p>${car.price}</p>
                      </div>
                      <div>
                        <p>{paymentInfo.cars}</p>
                      </div>
                      <div>
                        <p>${paymentInfo.price}</p>
                      </div>
                      <div
                        onClick={() => {
                          deleteFromCart(index);
                        }}
                        id="trash"
                      >
                        <FaTrashAlt />
                      </div>
                    </div>
                  </>
                );
              })}
            </section>
          </section>
          <div className="total-price">
            <h2>Summary</h2>
            <p>Subtotal: ${subtotal}</p>
            <p>Fee: ${fee}</p>
            <p>Total: ${total}</p>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
