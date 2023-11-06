import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img src="./logo4.png" alt="test" />
        </Link>
        {/* <span></span> */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/cars">Shop</Link>
            </li>
            <li>
              <Link>Team</Link>
            </li>
            <li>
              <Link>About</Link>
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
