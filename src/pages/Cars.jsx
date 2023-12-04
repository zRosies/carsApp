import { getCars } from "../connection/connection";
import { useEffect, useState } from "react";
import "../css/cars.css";
import { convertFloatToStar } from "../components/utils";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Loading from "../components/loading";

export default function Cars() {
  const [carsInfo, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCarsInfo = async () => {
    try {
      const response = await getCars();
      setCars(response["cars"]);
      setTimeout(() => {
        setLoading(false);
      }, 1100);

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCarsInfo();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

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

    if (!isCarInFavorites) {
      favorites = [...favorites, car];

      storedFavorites = [...storedFavorites, car];
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setFavorites(storedFavorites);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const isFavorite = (car) => {
    return favorites.some((favoriteCar) => favoriteCar.id === car.id);
  };

  // console.log(favorites);

  return (
    <>
      <main>
        {loading ? (
          <Loading />
        ) : (
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
        )}
      </main>
    </>
  );
}
