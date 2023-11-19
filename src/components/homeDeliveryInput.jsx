import { useState } from "react";

const HomeDelivery = () => {
  const [isDelivery, setIsDelivery] = useState(false);

  return (
    <>
      <p id="delivery">Home Delivery?</p>
      <div className={"home-delivery"}>
        <button
          onClick={() => {
            setIsDelivery(false);
          }}
          className={!isDelivery ? "active2" : "no"}
        >
          No
        </button>
        <button
          onClick={() => {
            setIsDelivery(true);
          }}
          className={isDelivery ? "active2" : "yes"}
        >
          Yes
        </button>
      </div>
    </>
  );
};

export default HomeDelivery;
