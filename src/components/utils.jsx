export const convertFloatToStar = (value) => {
  let stars = "";

  for (let number = 1; number <= 5; number++) {
    if (number <= value) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  // console.log(stars);
  return stars;
};

// export const addToCart = (item) => {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart.push(item);
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// export const getCartCount = () => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   return cart.length;
// };
