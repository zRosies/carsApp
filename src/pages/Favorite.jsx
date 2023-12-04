import { useEffect, useState } from "react";
import "../css/cars.css";
import { convertFloatToStar } from "../components/utils";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const MyFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = () => {
    const data = localStorage.getItem("favorites");
    const favorites = JSON.parse(data);
    setFavorites(favorites);
  };

  const removeFromFavorites = (carIndex) => {
    const data = localStorage.getItem("favorites");
    const newFavorites = JSON.parse(data);
    newFavorites.splice(carIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    setFavorites(newFavorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <div>
        <section className="carsSection">
          {favorites.map((car, index) => {
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
                <div className="price-div">
                  <p className="price-car">
                    ${car.price}
                    <span>/Day</span>
                  </p>
                  <span
                    id="heart"
                    onClick={() => {
                      removeFromFavorites(index);
                    }}
                  >
                    <FaHeart />
                  </span>
                </div>
                <Link to={`/details/${car.id}`}>
                  <button>Details</button>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default MyFavorite;