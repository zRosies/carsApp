import { useState, useEffect } from "react";
import { getCars } from "../connection/connection";
import { useParams } from "react-router-dom";
import CarCards from "../components/carCard";

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
    console.log(data);
    const queryFormatted = query.toLocaleLowerCase();
    // console.log(queryFormatted);
    const queryRegex = new RegExp(queryFormatted, "i");
    // console.log(data);
    const newCars = data.filter((car) => {
      let carFormatted = car.name.toLowerCase();
      let brandFormatted = car.carBrand.toLowerCase();

      return (
        // carFormatted.includes(query) || brandFormatted.includes(queryFormatted)
        queryRegex.test(carFormatted) || queryRegex.test(brandFormatted)
      );
    });
    setFilteredCars(newCars);
  };

  useEffect(() => {
    carData();
  }, [query]);

  //   console.log(carInfo);
  console.log(filterdCars);

  return (
    <>
      <CarCards carsInfo={filterdCars} />
    </>
  );
};

export default Search;
