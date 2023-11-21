import "../css/navbar.css";

const Cart = (carsInCart) => {
  return (
    <>
      <div className="cart-open">
        <button id="go-to-cart">Go to Cart</button>
        <button id="cancel">Cancel</button>
      </div>
    </>
  );
};

export default Cart;
