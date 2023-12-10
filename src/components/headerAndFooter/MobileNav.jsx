import { Link } from "react-router-dom";
import "../../css/navbar.css";

const MobNav = ({ open }) => {
  return (
    <>
      <nav className={`mobNav ${open ? "active" : ""}`}>
        <ul>
          <Link to="/team">
            <li>Team</li>
          </Link>
          <Link to="/myfavorite">
            <li>My favorite</li>
          </Link>
          <Link to="/cars">
            <li>Shop</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default MobNav;
