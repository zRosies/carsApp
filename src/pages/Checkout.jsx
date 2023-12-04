import { FaCreditCard, FaCcPaypal } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import Carousel from "nuka-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../css/checkout.css";
import { useEffect, useState } from "react";
import { getCartInfo, getPriceInfo } from "../components/utils";

const Checkout = () => {
  const [carInformation, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [items, setItems] = useState(0);
  const [carsPrice, setCarsPrice] = useState(0);

  useEffect(() => {
    getCartInfo(setCart);
  }, []);

  useEffect(() => {
    if (carInformation.length > 0) {
      getPriceInfo(carInformation, setTotal, setFee, setItems, setCarsPrice);
    }
  }, [carInformation]);

  // console.log(carInformation);
  return (
    <>
      <section className="formCart">
        <form action="" className="checkout">
          <label htmlFor="name">
            Name:
            <input type="name" id="name" required />
          </label>
          <label htmlFor="phone">
            Phone:
            <input type="phone" id="phone" required />
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" id="email" required />
          </label>
          <label htmlFor="adress">
            Adress:
            <input type="adress" id="adress" required />
          </label>
          <legend>Payment Method</legend>
          <fieldset required className="method">
            <label htmlFor="card">
              Credit Card <FaCreditCard className="card" />
              <input type="radio" id="card" name="paymentMethod" />
            </label>
            <label htmlFor="pix">
              Pix <FaPix className="pix" />
              <input type="radio" id="pix" name="paymentMethod" />
            </label>
            <label htmlFor="paypal">
              PayPal <FaCcPaypal className="paypal" />
              <input type="radio" id="paypal" name="paymentMethod" />
            </label>
          </fieldset>
          <fieldset className="field">
            <p>Fee: ${fee} </p>
            <p>Items: ${carsPrice}</p>
            <p>Quantity: {items}x</p>
            <p>Total: ${total} </p>
          </fieldset>
          <input type="submit" id="submit" value={"Check out"} />
        </form>
        <section className="divider">
          <Carousel
            slidesToShow={1}
            animation="zoom"
            wrapAround={true}
            renderCenterLeftControls={({ previousSlide }) => (
              <FaChevronLeft className="right" onClick={previousSlide} />
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <FaChevronRight className="left" onClick={nextSlide} />
            )}
            defaultControlsConfig={{
              pagingDotsClassName: "test",
            }}
          >
            {carInformation.map((item, index) => {
              const { car, paymentInfo } = item;
              return (
                <div key={index} className="cartInfo">
                  <div className="photo2">
                    <img src={car.image.url} alt={car.name} />
                  </div>
                  <p>
                    {car.carBrand} {car.name}
                  </p>
                  <p>Item: {paymentInfo.cars}x</p>
                  <p>Home delivery: {paymentInfo.delivery ? "Yes" : "No"}</p>
                </div>
              );
            })}
          </Carousel>
        </section>
      </section>
    </>
  );
};

export default Checkout;

// vertical={true}
// nextDisabled={true}
// defaultControlsConfig={{
//   prevButtonClassName: "custom-prev-button",
//   nextButtonClassName: "custom-next-button",
// }}
