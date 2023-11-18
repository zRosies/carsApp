import "../css/details.css";
import { useState, useEffect } from "react";
import { getCar } from "../connection/connection";
import { useParams } from "react-router-dom";
import { convertFloatToStar } from "../components/ConvertToStar";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaCreditCard, FaCcPaypal } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";

const Details = () => {
  const [carInfo, setCars] = useState([]);
  const { id } = useParams();

  const getCarsInfo = async () => {
    try {
      const response = await getCar(id);

      // setCars(response);
      console.log(response["cars"]);

      return setCars(response["cars"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getCarsInfo(id);
  }, []);
  // console.log(carInfo);

  return (
    <>
      <main>
        <section>
          {carInfo.map((car) => {
            console.log(car);
            return (
              <>
                <div key={car.id} className="container">
                  <div className="description">
                    <div className="photo">
                      <img src={car.image.url} alt={car.name} width={300} />
                    </div>
                    <p>
                      {car.carBrand} {car.name}
                    </p>
                    <p className="star">{convertFloatToStar(car.carAvg)}</p>
                    <p className="seats">Seats: {car.seats}</p>
                    <p>
                      Description: <span>{car.description}</span>{" "}
                    </p>
                  </div>
                  <div className="info">
                    <form action="">
                      <label htmlFor="name">
                        Name:
                        <input type="name" id="name" />
                      </label>
                      <label htmlFor="phone">
                        Phone:
                        <input type="phone" id="phone" />
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
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                          />
                        </label>
                      </fieldset>

                      <label htmlFor="date">
                        Date:
                        <input type="date" id="date" />
                      </label>
                      <label htmlFor="date">
                        Quantity of days:
                        <input
                          type="number"
                          id="number"
                          className="form-control"
                          min={1}
                        />
                      </label>
                      <fieldset>
                        <p>Price: $ {car.price}</p>
                        <p>Total: {}</p>
                      </fieldset>
                      <button type="submit"> Rent Now!</button>
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
