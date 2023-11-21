import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cart from "../components/cart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [carsInCart, setCarsInCart] = useState(0);
  const location = useLocation();

  useEffect(() => {
    contCarNumber();
    const handleScroll = () => {
      if (location.pathname != "/" || window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const contCarNumber = () => {
    if (localStorage.getItem("cart") != null) {
      const cars = localStorage.getItem("cart");
      setCarsInCart(JSON.parse(cars).length);
    }
  };

  return (
    <>
      <header className={isScrolled ? "active" : ""}>
        <Link to="/">
          <img src="./logo4.png" alt="test" />
        </Link>

        <nav className="navbar">
          <ul>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Team</Link>
            </li>

            <li>
              <Link to="/myfavorite">My favorite</Link>
            </li>
            <li>
              <Link to="/cars">Shop</Link>
            </li>
          </ul>
        </nav>
        <div className="cart">
          <FontAwesomeIcon icon={faSearch} />
          <FontAwesomeIcon icon={faShoppingCart} className="cart" />
          <span className="counter">{carsInCart}</span>

          <span></span>

          <Link to="/cars">
            <button>Explore Vehicles</button>
          </Link>
          <Cart />
        </div>
      </header>
    </>
  );
};

export default Navbar;
