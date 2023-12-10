import { FaCreditCard, FaCcPaypal } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import Carousel from "nuka-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import confetti from "canvas-confetti";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet";
import "../css/checkout.css";
import { useEffect, useState } from "react";
import { getCartInfo, getPriceInfo, parseLocalInfo } from "../components/utils";

const Checkout = () => {
  const [carInformation, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [items, setItems] = useState(0);
  const [carsPrice, setCarsPrice] = useState(0);
  const [date, setDate] = useState(0);
  const [deliveryFee, setIsDeliveryFee] = useState(false);
  const [carName, setCarsString] = useState("");

  useEffect(() => {
    getCartInfo(setCart);
    // getPaymentInfoRemaining();
  }, []);

  useEffect(() => {
    if (carInformation != null) {
      getPriceInfo(carInformation, setTotal, setFee, setItems, setCarsPrice);
    }
  }, [carInformation]);
  // carsname
  const getPaymentInfoRemaining = () => {
    const data = parseLocalInfo("cart");
    console.log(data);
    const paymentInfo = data.map((item) => item.paymentInfo);
    paymentInfo.map((info) => {
      if (info.date.length != 0) {
        setDate(info.date);
      }
      if (info.delivery != false) {
        setIsDeliveryFee(info.delivery);
      }
    });

    // Here I am making a string of cars and sending it to the server in case the user wants
    // more than one car
    const cars = data.map((item) => item.car);
    let carsString = "";
    cars.map((car) => {
      let string = `${car.carBrand} ${car.name}, `;
      carsString += string;
    });

    setCarsString(carsString);
  };

  const clearLocalInfo = () => {
    localStorage.removeItem("cart");
  };

  const congratulations = () => {
    const colors = ["#bb0000", "#000000"];
    confetti({
      particleCount: 10,
      angle: 60,
      spread: 120,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 10,
      angle: 120,
      spread: 120,
      origin: { x: 1 },
      colors: colors,
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Veloster | Checkout </title>
        <link rel="canonical" href="http://carapp.com.br" />
        <meta
          name="description"
          content="Rent your car! Veloster is designed to give you the best cars with comfort and quality."
        />
      </Helmet>
      <section className="formCart">
        {carInformation?.length == 0 && (
          <div className="success">
            <h4>Your purchase was made successfuly</h4>
            <p>A ticket was sent to your email with more information</p>
            <MdEmail />
          </div>
        )}

        <form
          action="submit"
          className="checkout"
          onSubmit={(e) => {
            getPaymentInfoRemaining();
            e.preventDefault();
            const formData = new FormData(e.target);
            const purchase = {
              client: {
                name: formData.get("name"),
                phone: formData.get("phone"),
                email: formData.get("email"),
                address: formData.get("address"),
              },
              paymentInfo: {
                quantity: items,
                delivery: deliveryFee,
                date: date,
                fee: fee,
                price: total,
                carsName: carName,
                method: formData.get("paymentMethod"),
              },
            };

            fetch("http://localhost:3000/purchase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(purchase),
            });
            clearLocalInfo();
            // --- Call the congratulations function multiple times with a 100ms interval
            const intervalId = setInterval(() => {
              congratulations();
            }, 50);
            // --- keep calling the function for only 3s
            setTimeout(() => {
              clearInterval(intervalId);
            }, 2500);

            setCart([]);

            setTimeout(() => {
              window.location.href = "/";
            }, 4100); //  --setting the cart empty so it will display the success message
          }}
        >
          <label htmlFor="name">
            Name:
            <input type="text" id="name" name="name" required />
          </label>
          <label htmlFor="phone">
            Phone:
            <input type="text" id="phone" name="phone" required />
          </label>
          <label htmlFor="text">
            Email:
            <input type="email" id="email" name="email" required />
          </label>
          <label htmlFor="address">
            Address:
            <input type="text" id="adress" name="address" required />
          </label>
          <legend>Payment Method</legend>
          <fieldset className="method" required>
            <label htmlFor="card">
              Credit Card <FaCreditCard className="card" />
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="credit-card"
              />
            </label>
            <label htmlFor="pix">
              Pix <FaPix className="pix" />
              <input type="radio" id="pix" name="paymentMethod" value="pix" />
            </label>
            <label htmlFor="paypal">
              PayPal <FaCcPaypal className="paypal" />
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
              />
            </label>
          </fieldset>
          <fieldset className="field">
            <p>Fee: ${fee} </p>
            <p>Items: ${carsPrice}</p>
            <p>Quantity: {items}x</p>
            <p>Total: ${total} </p>
          </fieldset>
          <input type="submit" id="submit" />
        </form>

        {carInformation != null && (
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
        )}
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
