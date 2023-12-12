import { getCars } from "../connection/connection";
import { useEffect, useState } from "react";
import "../css/cars.css";
import { Helmet } from "react-helmet";
import Loading from "../components/loading";
import CarCards from "../components/carCard";

export default function Cars() {
  const [carsInfo, setCars] = useState([]);
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Veloster | Cars</title>
        <link rel="canonical" href="http://carapp.com.br" />
        <meta
          name="description"
          content="Rent your cars with security and comfort, Veloster is designed to give you the best cars"
        />
      </Helmet>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CarCards carsInfo={carsInfo} />
          </>
        )}
      </main>
    </>
  );
}
