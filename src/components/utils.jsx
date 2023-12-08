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

export const getCartInfo = (setCart) => {
  const cartInfo = JSON.parse(localStorage.getItem("cart"));
  setCart(cartInfo);
};

export const getPriceInfo = (
  carInformation,
  setTotal,
  setFee,
  setItems,
  setCarsPrice
) => {
  let price = 0;
  let fee = 0;
  let items = 0;
  let cars = 0;
  carInformation.map((item) => {
    const { car, paymentInfo } = item;
    fee += parseFloat(paymentInfo.fee);
    price += parseFloat(paymentInfo.price);
    cars += parseFloat(car.price) * parseFloat(paymentInfo.cars);
    items += parseFloat(paymentInfo.cars);
  });
  setTotal(price);
  setFee(fee);
  setItems(items);
  setCarsPrice(cars);
};

export const parseLocalInfo = (storageKey) => {
  const local = localStorage.getItem(storageKey);
  const data = JSON.parse(local) || [];
  return data;
};
