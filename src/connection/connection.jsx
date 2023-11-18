import request, { gql } from "graphql-request";

const url = import.meta.env.VITE_URI;

export const getCars = async () => {
  // console.log(url);
  const query = gql`
    query Cars {
      cars {
        carAvg
        carBrand
        createdAt
        id
        name
        price
        publishedAt
        updatedAt
        image {
          url
        }
      }
    }
  `;
  const result = await request(url, query);

  return result;
};

export const getCar = async (carId) => {
  // console.log(carId);
  const query = gql`
    query Cars {
      cars(where: { id: "${carId}" }) {
        carAvg
        carBrand
        createdAt
        name
        price
        publishedAt
        updatedAt
        description
        seats
        image {
          url
        }
      }
    }
  `;

  const result = await request(url, query);
  // console.log(result);
  return result;
};
