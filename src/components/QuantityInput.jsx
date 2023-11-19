import { useState } from "react";

const QuantityInput = ({ handleQuantityChange }) => {
  const [value, setValue] = useState(1);
  handleQuantityChange(value);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  const addValue = () => {
    setValue(value + 1);
  };

  const subtractValue = () => {
    if (value != 1) {
      setValue(value - 1);
    }
  };

  return (
    <>
      <p id="days">Days</p>
      <div className="quantity">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          readOnly
          min={1}
        />
        <button onClick={addValue} className="plus">
          +
        </button>
        <button onClick={subtractValue} className="less">
          -
        </button>
      </div>
    </>
  );
};

export default QuantityInput;
