import { useEffect, useState } from "react";
import "../css/home.css";
import { getCars } from "../connection/connection";
import { useNavigate } from "react-router-dom";

function HomeForm() {
  const [carlist, setCard] = useState([]);
  const [brand, setBrand] = useState("");
  const [carId, setCarId] = useState("");
  const navigate = useNavigate();

  const getCarList = async () => {
    const result = await getCars();

    setCard(result["cars"]);
  };

  useEffect(() => {
    getCarList();
  }, []);

  // console.log(carId);
  // console.log(carlist);

  const seenCarBrands = [];
  console.log(carId);
  return (
    <>
      <div className="get">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`details/${carId}`);
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
            required
          >
            Brand
            <option value="" disabled>
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
          <select
            key={"brand"}
            onChange={(e) => {
              setCarId(e.target.value);
            }}
            required
          >
            <option value="">Select a car</option>
            {carlist.map((car) => {
              if (car.carBrand === brand) {
                return (
                  <option key={car.name} value={car.id}>
                    {car.name}
                  </option>
                );
              }
              return null;
            })}
          </select>
          <button type="submit">Get Started</button>
          {/* <input type="submit" hidden="" /> */}
        </form>
      </div>
    </>
  );
}

export default HomeForm;
