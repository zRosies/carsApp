import { useState, useEffect } from "react";
import { getCars } from "../connection/connection";
import { useParams } from "react-router-dom";
import CarCards from "../components/carCard";
import { MdOutlineError } from "react-icons/md";
import "../css/navbar.css";

const Search = () => {
  const [filterdCars, setFilteredCars] = useState([]);

  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const carData = async () => {
    try {
      const response = await getCars();
      setFiltered(response["cars"]);
      setTimeout(() => {
        setLoading(false);
      }, 1100);

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setFiltered = (data) => {
    // console.log(data);
    const queryFormatted = query.toLocaleLowerCase();
    const queryRegex = new RegExp(queryFormatted, "i");

    const newCars = data.filter((car) => {
      return queryRegex.test(car.name) || queryRegex.test(car.carBrand);
    });
    setFilteredCars(newCars);
  };

  useEffect(() => {
    carData();
  }, [query]);

  //   console.log(filterdCars);

  return (
    <>
      {filterdCars?.length > 0 ? (
        <>
          <p className="results">
            {" "}
            Results for {query}... <span>({filterdCars.length}) </span>
          </p>
          <CarCards carsInfo={filterdCars} />
        </>
      ) : (
        <>
          <section className="not-found">
            <p>No results found for {query}...</p>
            <p>
              <MdOutlineError />
            </p>
          </section>
        </>
      )}
    </>
  );
};

export default Search;
