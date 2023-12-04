import { useEffect, useState } from "react";
import "../css/navbar.css";
import { getCartInfo, getPriceInfo, convertFloatToStar } from "./utils";
import Carousel from "nuka-carousel";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaBolt, FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cart = ({ cartClosed }) => {
  const [cartInfo, setCartInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [items, setItems] = useState(0);
  const [carsPrice, setCarsPrice] = useState(0);

  useEffect(() => {
    getCartInfo(setCartInfo);
  }, []);
  useEffect(() => {
    if (cartInfo != null) {
      if (cartInfo.length > 0) {
        getPriceInfo(cartInfo, setTotal, setFee, setItems, setCarsPrice);
      }
    }
  }, [cartInfo]);
  return (
    <>
      <div className="cart-open" onMouseLeave={cartClosed}>
        {cartInfo !== null ? (
          <Carousel
            slidesToShow={1}
            vertical={true}
            wrapAround={true}
            renderBottomCenterControls={false}
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
            {cartInfo.map((object) => {
              const { car } = object;
              // console.log(car);
              return (
                <>
                  <div className="roses">
                    <img src={car.image.url} alt={car.name} />
                  </div>
                  <div className="car-espec">
                    <p>
                      {car.carBrand}
                      <span> {car.name}</span>
                    </p>
                    <p className="star">
                      {convertFloatToStar(car.carAvg)} <span>{car.carAvg}</span>
                    </p>
                  </div>
                </>
              );
            })}
          </Carousel>
        ) : (
          <div className="no-items">
            <p>Add items to the cart!</p>
          </div>
        )}
        <div className="price-info">
          <p>Total:</p>
          <p className="car-price">
            $ <span>{total}</span>
          </p>
        </div>

        <Link to="/checkout">
          <button id="go-to-checkout">
            Checkout
            <span>
              <FaBolt />
            </span>
          </button>
        </Link>
        <Link to="/cart">
          <button id="go-to-cart">
            Go to cart
            <span>
              <FaCartShopping />
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
