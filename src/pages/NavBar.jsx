import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    // console.log(location.pathname);
    const handleScroll = () => {
      if (location.pathname === "/cars" || window.scrollY > 10) {
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

  return (
    <>
      <header className={isScrolled ? "active" : ""}>
        <Link to="/">
          <img src="./logo4.png" alt="test" />
        </Link>
        {/* <span></span> */}
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
          <FontAwesomeIcon icon={faShoppingCart} />

          <Link to="/cars">
            <button>Explore Vehicles</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
