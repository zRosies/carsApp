import "../../css/footer.css";

import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsTelephoneFill,
} from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <>
      <footer>
        <h1>Veloster Cars</h1>
        <div className="info">
          <div className="socials">
            <div>
              <h3>Socials</h3>
              <FontAwesomeIcon icon={faLocationDot} />
              <a href="https://maps.app.goo.gl/eJTfjJffQroRxakG6">
                Capitol Hill, Salt Lake City, UT, USA
              </a>
            </div>
            <div>
              <BsTelephoneFill />
              <span>+1 (942) 2342-2345</span>
            </div>
            <div className="media">
              <a href="https://www.facebook.com/" target="blank">
                <span style={{ display: "none" }}>fb</span>
                <BsFacebook />
              </a>
              <a href="https://www.instagram.com/" target="blank">
                <span style={{ display: "none" }}>Instagram</span>

                <BsInstagram />
              </a>

              <a href="https://www.twitter.com" target="blank">
                <span style={{ display: "none" }}>twt</span>
                <BsTwitter />
              </a>
            </div>
          </div>
          <div className="shop">
            <h3>Shop</h3>
            <p>BMW</p>
            <p>Porshe</p>
            <p>Volvo</p>
          </div>
          <div className="company">
            <h3>Company</h3>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
        </div>
        <p id="desc">
          Gustavo Bispo 2023 | Not a real Business | All rights reserved &copy;
        </p>
      </footer>
    </>
  );
};

export default Footer;
