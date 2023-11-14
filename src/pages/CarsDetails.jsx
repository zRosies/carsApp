import "../css/details.css";
import { useState, useEffect } from "react";
import { getCar } from "../connection/connection";
import { useParams } from "react-router-dom";

const Details = () => {
  const [carInfo, setCars] = useState();
  const { id } = useParams();

  const getCarsInfo = async () => {
    try {
      const response = await getCar(id);

      setCars(response);

      setCars(response["cars"]);
      return;
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
        <section>aaaaaaaaaaaaa</section>
      </main>
    </>
  );
};

export default Details;
