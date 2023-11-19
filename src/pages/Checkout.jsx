import { FaCreditCard, FaCcPaypal } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";

const Checkout = () => {
  return (
    <>
      <label htmlFor="name">
        Name:
        <input type="name" id="name" />
      </label>
      <label htmlFor="phone">
        Phone:
        <input type="phone" id="phone" />
      </label>
      <label htmlFor="email">
        Email:
        <input type="email" id="email" />
      </label>
      <fieldset required className="method">
        <legend>Payment Method</legend>
        <label htmlFor="card">
          Credit Card <FaCreditCard />
          <input type="radio" id="card" name="paymentMethod" />
        </label>
        <label htmlFor="pix">
          Pix <FaPix />
          <input type="radio" id="pix" name="paymentMethod" />
        </label>
        <label htmlFor="paypal">
          PayPal <FaCcPaypal />
          <input type="radio" id="paypal" name="paymentMethod" />
        </label>
      </fieldset>
    </>
  );
};

export default Checkout;
