import "../css/details.css";
import { useState, useEffect } from "react";
import { getCar } from "../connection/connection";
import { useNavigate, useParams } from "react-router-dom";
import { convertFloatToStar } from "../components/utils";
import { FaBolt, FaCartShopping } from "react-icons/fa6";
import { IoMdPeople, IoMdSpeedometer } from "react-icons/io";
import { GiHorseHead } from "react-icons/gi";
import QuantityInput from "../components/quantityInput";
import HomeDelivery from "../components/homeDeliveryInput";
import TotalPrice from "../components/totalPrice";
import confetti from "canvas-confetti";

const Details = () => {
  const [carInfo, setCars] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isDelivery, setIsDelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fee, setFee] = useState(0);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [addedInformation, setAddedInformation] = useState(false);

  const getCarsInfo = async () => {
    try {
      const response = await getCar(id);
      return setCars(response["cars"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCarsInfo(id);
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleDelivery = (delivery) => {
    setIsDelivery(delivery);
  };

  const displayInfo = () => {
    setAddedInformation(true);
    setTimeout(() => {
      setAddedInformation(false);
    }, 2000);
  };

  const addToCartInfo = (animation = true) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const clientOption = {
      cars: quantity,
      delivery: isDelivery,
      date: date,
      price: totalPrice,
      fee: fee,
    };

    const cartInformation = {
      car: carInfo[0],
      paymentInfo: clientOption,
    };

    cart.push(cartInformation);

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart)) || [];

    displayInfo();
    if (animation) {
      confetti({
        particleCount: 30,

        spread: 100,
        origin: { x: 0.85, y: 0.3 },
      });
    }
  };

  const submitInfoAndRedirect = () => {
    addToCartInfo(false);
    navigate("/checkout");
  };

  return (
    <>
      <main>
        <section>
          {carInfo.map((car) => {
            return (
              <>
                <div key={car.id} className="car-container">
                  {/*--------------------- car description here----------------- */}
                  <div className="description">
                    <div className="photo">
                      <img src={car.image.url} alt={car.name} width={300} />
                      <p className="seats">
                        <IoMdPeople />
                        <span>{car.seats}</span>
                      </p>
                      <p className="speed">
                        <IoMdSpeedometer />
                        <span>{car.speed}</span>
                      </p>
                      <p className="horse">
                        <GiHorseHead />
                        <span>{car.hpower}</span>
                      </p>
                    </div>
                    <div className="brand">
                      <div>
                        <p>
                          {car.carBrand} {car.name}
                        </p>
                        <p className="star">{convertFloatToStar(car.carAvg)}</p>
                      </div>
                      <span>${car.price}</span>
                    </div>

                    <p className="desc">
                      Description: <span>{car.description}</span>{" "}
                    </p>
                  </div>
                  {/*--------------------- form here----------------- */}
                  <div className="info">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <label htmlFor="date">
                        Date:
                        <input
                          type="date"
                          id="date"
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </label>
                      <QuantityInput
                        handleQuantityChange={handleQuantityChange}
                      />
                      <HomeDelivery handleDelivery={handleDelivery} />

                      <p className="ptitle">Payment</p>
                      <TotalPrice
                        quantity={quantity}
                        car={car}
                        setTotal={setTotalPrice}
                        setFee={setFee}
                        isDelivery={isDelivery}
                        fee={fee}
                      />

                      <div className="buttons">
                        <button
                          type="submit"
                          className="rent"
                          onClick={submitInfoAndRedirect}
                        >
                          Rent Now <FaBolt />
                        </button>
                        <button
                          type=""
                          className="addtocart"
                          onClick={addToCartInfo}
                        >
                          Add to cart <FaCartShopping />
                        </button>
                      </div>
                      {addedInformation && (
                        <>
                          <div className="added-info">
                            <p>
                              <span>{car.carBrand} </span>
                              {car.name} has been added to the cart
                            </p>
                          </div>
                          <div className="added">
                            <img src={car.image.url} alt={car.name} />
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Details;
