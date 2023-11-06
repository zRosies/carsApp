import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../css/home.css";
import { getCars } from "../connection/connection";
import Button from "../components/button";
import HomeForm from "../components/Homeform";

function Home() {
  const [carlist, setCard] = useState([]);

  const getCarList = async () => {
    const result = await getCars();

    setCard(result["cars"]);
  };

  useEffect(() => {
    getCarList();
  }, []);

  // console.log(carlist);

  return (
    <>
      <main>
        {carlist.map((car) => {
          return (
            <>
              {car.name === "r5" ? (
                <div className="card">
                  <img src={car.image.url} alt="react" />
                </div>
              ) : null}
            </>
          );
        })}

        <section className="container">
          <section className="discover">
            <p>New in Stock</p>
            <h1>Upgrade Your</h1>
            <h1>Driving Experience</h1>
            <div>
              {/* <button>Discover More</button>
          <button>Meet R5</button> */}
              <Button />
            </div>
          </section>
          <HomeForm></HomeForm>
        </section>
        <div className="body">
          <h1>Welcome to Veloster</h1>
          <div className="divisor">
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
                architecto accusamus consequuntur facilis ea, dignissimos itaque
              </p>
            </div>
            <div>
              <h4>Support 24h</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quisquam, reprehenderit. Incidunt ea, repellendus laborum
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
