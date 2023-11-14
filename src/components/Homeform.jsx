import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../css/home.css";
import { getCars } from "../connection/connection";

function HomeForm() {
  const [carlist, setCard] = useState([]);
  const [brand, setBrand] = useState("");

  const getCarList = async () => {
    const result = await getCars();

    setCard(result["cars"]);
  };

  useEffect(() => {
    getCarList();
  }, []);

  // console.log(carlist);

  const seenCarBrands = [];

  return (
    <>
      <div className="get">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Find Your Ride</h1>
          <p>Brand</p>
          <select
            name="select"
            id="select"
            defaultValue={brand}
            key="aaaa"
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          >
            Brand
            <option defaultValue="aaa" disabled selected>
              Select a Brand
            </option>
            {carlist.map((car) => {
              if (!seenCarBrands.includes(car.carBrand)) {
                seenCarBrands.push(car.carBrand); // Mark the brand as seen
                return (
                  <option key={car.carBrand} value={car.carBrand}>
                    {car.carBrand}
                  </option>
                );
              }
              return null;
            })}
          </select>
          <p>Car</p>
          <select defaultValue={brand} key={"brand"}>
            <option value="bbbb" disabled selected>
              Select a car
            </option>
            {carlist.map((car) => {
              if (car.carBrand === brand) {
                return (
                  <option key={car.name} value={car.name}>
                    {car.name}
                  </option>
                );
              }
              return null;
            })}
          </select>
          <button type="submit">Get Started</button>
          <input type="submit" hidden />
        </form>
      </div>
    </>
  );
}

export default HomeForm;
