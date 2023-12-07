import "../../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import logo from "../../img/logo4.png";

import Cart from "../cart";
import MobNav from "./MobileNav";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [carsInCart, setCarsInCart] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const [localStorageChange, setLocalStorageChange] = useState(false);

  useEffect(() => {
    countCarNumber();
  }, [localStorageChange]);

  useEffect(() => {
    const handleStorageChange = () => {
      // Update the state to force a re-render when localStorage changes
      setLocalStorageChange((prevState) => !prevState);
    };

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    countCarNumber();
    const handleScroll = () => {
      if (location.pathname != "/" || window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    setMenuOpen(false);
    setCartOpen(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const countCarNumber = () => {
    if (localStorage.getItem("cart") != null) {
      const cars = localStorage.getItem("cart");
      setCarsInCart(JSON.parse(cars).length);
    }
  };
  const handleCartMouseLeave = () => {
    setCartOpen(false);
  };

  const setIsCartOpen = () => {
    if (cartOpen) {
      setCartOpen(false);
      return;
    }
    setCartOpen(true);
  };

  const handleMenuOpen = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(true);
  };

  return (
    <>
      <header className={isScrolled ? "active" : ""}>
        <Link to="/">
          <img src={logo} alt="test" id="logo" />
        </Link>

        <nav className="navbar">
          <ul>
            <li>
              <Link to="/team">Team</Link>
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
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="cart"
            onClick={setIsCartOpen}
          />
          <span className="counter">{carsInCart}</span>

          <span></span>

          <Link to="/cars" id="explore">
            <button>Explore Vehicles</button>
          </Link>
          {cartOpen && <Cart cartClosed={handleCartMouseLeave} />}

          <IoIosMenu id="menu" onClick={handleMenuOpen} />
        </div>
        <MobNav open={menuOpen} />
      </header>
    </>
  );
};

export default Navbar;
