import "../css/details.css";
import { useState, useEffect } from "react";
import { getCar } from "../connection/connection";
import { useParams } from "react-router-dom";
import { convertFloatToStar } from "../components/utils";
import { FaBolt, FaCartShopping } from "react-icons/fa6";
import { IoMdPeople, IoMdSpeedometer } from "react-icons/io";
import { GiHorseHead } from "react-icons/gi";
import QuantityInput from "../components/quantityInput";
import HomeDelivery from "../components/homeDeliveryInput";

const Details = () => {
  const [carInfo, setCars] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isDelivery, setIsDelivery] = useState(false);
  const [date, setDate] = useState("");
  const { id } = useParams();

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleDelivery = (delivery) => {
    setIsDelivery(delivery);
  };

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

  const addToCartInfo = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const clientOption = {
      cars: quantity,
      delivery: isDelivery,
      date: date,
    };

    const cartInformation = {
      car: carInfo[0],
      paymentInfo: clientOption,
    };

    cart.push(cartInformation);

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart)) || [];
  };

  console.log(quantity);
  console.log(isDelivery);
  console.log(date);

  return (
    <>
      <main>
        <section>
          {carInfo.map((car) => {
            // console.log(car);
            return (
              <>
                <div key={car.id} className="car-container">
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
                    <p>
                      {car.carBrand} {car.name}
                    </p>
                    <p className="star">{convertFloatToStar(car.carAvg)}</p>

                    <p>
                      Description: <span>{car.description}</span>{" "}
                    </p>
                  </div>
                  <div className="info">
                    <form
                      action=""
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
                      <p id="price">Price: ${car.price}</p>
                      <p className="ptitle">Payment</p>
                      <fieldset>
                        <p>Fees: $ 00.00</p>
                        <p>Total: $ 00.00</p>
                      </fieldset>
                      <div className="buttons">
                        <button type="submit" className="rent">
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
                    </form>
                  </div>
                </div>
              </>
            );
          })}
        </section>
        {/* <section>aaaaaaaaaaaaa</section> */}
      </main>
    </>
  );
};

export default Details;
