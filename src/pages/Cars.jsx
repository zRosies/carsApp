"use client";
import { getCars } from "../connection/connection";
import { useEffect, useState } from "react";
import "../css/cars.css";
import { convertFloatToStar } from "../components/ConvertToStar";
import { Link } from "react-router-dom";

export default function Home() {
  const [carsInfo, setCars] = useState([]);
  const getCarsInfo = async () => {
    try {
      const response = await getCars();
      // console.log(response);
      // setCars(response);
      // console.log(response);
      setCars(response["cars"]);

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getCarsInfo();
  }, []);
  // console.log(carsInfo);

  return (
    <>
      <main>
        <section className="carsSection">
          {carsInfo.map((car) => {
            // console.log(car);

            return (
              <div key={car.id} className="carDiv">
                <div className="imageBox">
                  <img
                    src={car.image.url}
                    alt={car.name}
                    width={800}
                    height={800}
                  ></img>
                </div>
                <div className="carBrand">
                  <h3>{car.carBrand}</h3>
                  <p>{car.name}</p>
                </div>
                <div className="stars">
                  <span>{convertFloatToStar(car.carAvg)}</span>
                  <span>{car.carAvg}</span>
                </div>

                <p className="price-car">
                  ${car.price}
                  <span>/Day</span>
                </p>
                <Link to={`/details/${car.id}`}>
                  <button>Details</button>
                </Link>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
