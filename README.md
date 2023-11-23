"use client";
import Image from "next/image";
import { getCars } from "./fetchInfo/connection";
import { useEffect, useState } from "react";

export default function Home() {
  const [carsInfo, setCars] = useState([]);
  const getCarsInfo = async () => {
    try {
      const response: any = await getCars();
      // console.log(response);
      // setCars(response);
      // console.log(response);
      setCars(response["cars"]);

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const object: any = getCarsInfo();
  }, []);
  console.log(carsInfo);

  const convertFloatToStar = (value: number) => {
    let stars: string = "";
    for (let number = 1; number <= 5; number++) {
      if (number <= value) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }
    return stars;
  };

  return (
    <>
      <section className="flex flex-wrap m-4 m-auto my-2">
        {carsInfo.map((car: any) => {
          console.log(car);

          return (
            <>
              <div className="w-[250px] mx-2 my-6 shadow-md shadow-black">
                <div className="w-[100%] h-[200px] overflow-hidden">
                  <Image
                    className="w-[100%] h-[100%] hover:scale-110 duration-300 ease-in-out object-cover"
                    src={car.image.url}
                    alt={car.name}
                    width={800}
                    height={800}
                  ></Image>
                </div>
                <div className="flex justify-center font-bold">
                  <h3 className="font-[2em] mx-1 ">{car.carBrand}</h3>
                  <p>{car.name}</p>
                </div>
                <div className="font-[2rem] text-[1.2rem] mx-3">
                  <span className="">{convertFloatToStar(car.carAvg)}</span>
                  <span>{car.carAvg}</span>
                </div>

                <p className="mx-3">
                  ${car.price}
                  <span>/Day</span>
                </p>
                <button className="flex my-6 p-3 bg-black w-[90%] text-white m-auto justify-center hover:bg-bt duration-200 ease-in-out">
                  Details
                </button>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}



import './style.scss';

import { app_base_url } from '../../services/api';

const GridProductCard = ({ data, containerName = 'container' }) => {
  const isMobileView = window.innerWidth <= 768;

  return (
    <div className={`grid-${containerName}`}>
      {data.map(image => {
        return (
          <div
            key={image.id}
            className={`grid-${image.name}`}
          >
            <a href={image.slug}>
              <img
                // if it is mobile apply the images with another ratio
                src={
                  isMobileView
                    ? `https://cdn.speedsize.com/${process.env.REACT_APP_CLIENT_ID}/${app_base_url + image.src_mob}/f_auto`
                    : `https://cdn.speedsize.com/${process.env.REACT_APP_CLIENT_ID}/${app_base_url + image.src}/f_auto`
                }
                alt={image.slug}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default GridProductCard;


