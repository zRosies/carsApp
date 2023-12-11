import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { convertFloatToStar } from "../components/utils";

const CarCards = ({ carsInfo }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (car) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!Array.isArray(favorites)) {
      favorites = [];
    }

    // ----Avoiding duplicated ---
    const isCarInFavorites = favorites.some(
      (favoriteCar) => favoriteCar.id === car.id
    );

    //-- Here I am adding the favorites and removing already existing favorites

    if (!isCarInFavorites) {
      storedFavorites = [...storedFavorites, car];
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setFavorites(storedFavorites);
    } else {
      const updatedFav = favorites.filter((item) => item.id != car.id);

      localStorage.setItem("favorites", JSON.stringify(updatedFav));
      setFavorites(updatedFav);
    }
  };
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const isFavorite = (car) => {
    return favorites.some((favoriteCar) => favoriteCar.id === car.id);
  };

  return (
    <>
      <section className="carsSection">
        {carsInfo.map((car) => {
          const carFavorited = isFavorite(car);

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
                    addFavorite(car);
                  }}
                >
                  {/* <FaHeart /> */}
                  {carFavorited ? <FaHeart /> : <FaRegHeart />}
                </span>
              </div>
              <Link to={`/details/${car.id}`}>
                <button>Details</button>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default CarCards;
