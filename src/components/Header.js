//******************Packages*******************
import { Link } from "react-router-dom";
import caddy from "../assets/img/cart.png";

const Header = (panier) => {
  const cart = panier.panier;

  return (
    <div id="header">
      <ul>
        <Link to="/">
          <li>Beer List</li>
        </Link>
        <Link to="/beercart">
          <li>Beer Cart</li>
        </Link>
        <Link to="/beercart">
          <div className="notif">
            <img src={caddy} alt="right" />
            <span>{cart.length}</span>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
