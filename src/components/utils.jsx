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
