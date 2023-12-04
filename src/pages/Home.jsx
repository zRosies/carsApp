import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../css/home.css";
import { getCars } from "../connection/connection";
import Button from "../components/button";
import HomeForm from "../components/Homeform";
import { Link } from "react-router-dom";
import picture from "../img/medio.jpg";
import Loading from "../components/loading";

function Home() {
  const [carlist, setCard] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCarList = async () => {
    const result = await getCars();

    setCard(result["cars"]);

    setTimeout(() => {
      setLoading(false);
    }, 900);
  };

  useEffect(() => {
    getCarList();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          {carlist.map((car) => {
            // console.log(car);
            return (
              <div key={car.id}>
                {car.name === "R8" ? (
                  <img src={car.image.url} alt="react" id="hero" />
                ) : null}
              </div>
            );
          })}

          <section className="container">
            <div className="discover">
              <p>New in Stock</p>
              <h1>Upgrade Your</h1>
              <h1>Driving Experience</h1>
              <div>
                <Button />
              </div>
            </div>
            <HomeForm></HomeForm>
          </section>
          <div className="body">
            <h1>Welcome to Veloster</h1>
            <section className="divisor">
              <div>
                <h4>Variety of Cars</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae beatae quisquam magni adipisci est! Voluptatibus
                </p>
              </div>
              <div>
                <h4>Competitive Price</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
                  architecto accusamus consequuntur facilis ea, dignissimos
                  itaque
                </p>
              </div>
              <div>
                <h4>Support 24h</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quisquam, reprehenderit. Incidunt ea, repellendus laborum
                </p>
              </div>
            </section>
            <section className="secondsection">
              <div>
                <p>For all tastes</p>
                <h3>Enjoy The Comfort That Only Veloster cars can give.</h3>
                <p>
                  At our car rental service, we turn wishes into reality. With
                  just two clicks, embark on a journey tailored to your desires.
                  Say yes to convenience, and let us pave the way for your
                  extraordinary travel experience.
                </p>
                <Link to="/cars">
                  <button>Discover</button>
                </Link>
              </div>
              <div className="side">
                <img src={picture} alt="test" />
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
