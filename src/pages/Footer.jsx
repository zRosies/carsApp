import "../css/footer.css";

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
                <BsFacebook />
              </a>
              <a href="https://www.instagram.com/" target="blank">
                <BsInstagram />
              </a>

              <a href="https://www.twitter.com" target="blank">
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
      </footer>
    </>
  );
};

export default Footer;
