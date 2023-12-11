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
  const [searchInput, setIsSearchOpen] = useState(false);

  const [localStorageChange, setLocalStorageChange] = useState(false);

  useEffect(() => {
    countCarNumber();
  }, [localStorageChange]);

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageChange((prevState) => !prevState);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    countCarNumber();
    const handleScroll = () => {
      console.log(location.pathname);
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

  const setIsSearch = () => {
    if (searchInput) {
      setIsSearchOpen(false);
      return;
    }
    setIsSearchOpen(true);
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
          {searchInput && (
            <form action="" className="form" onSubmit={() => {}}>
              <label htmlFor="search">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                />
              </label>
            </form>
          )}
          <FontAwesomeIcon icon={faSearch} onClick={setIsSearch} />
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
        <MobNav open={menuOpen} location={location.pathname} />
      </header>
    </>
  );
};

export default Navbar;
