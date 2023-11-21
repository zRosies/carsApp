const TotalPrice = ({ car, setTotal, setFee, quantity, isDelivery, fee }) => {
  const calculatePrice = (carPrice, quantity, delivery = false) => {
    let totalPrice = carPrice * quantity;

    if (delivery) {
      totalPrice = deliveryFee(totalPrice);
    } else if (!delivery) {
      setFee(0);
    }
    setTotal(totalPrice);

    return parseFloat(totalPrice);
  };

  const deliveryFee = (totalPrice) => {
    setFee(totalPrice * 0.05);
    return totalPrice + totalPrice * 0.05;
  };

  return (
    <fieldset>
      <p className="total">
        <span>Fee: ${fee} </span>
        <span>Total: ${calculatePrice(car.price, quantity, isDelivery)}</span>
      </p>
    </fieldset>
  );
};

export default TotalPrice;
