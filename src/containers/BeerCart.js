//******************Packages*******************
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//******************Components*******************
import Button from "../components/ButtonCart";

const BeerCart = ({ panier, removeCart }) => {
  const cart = panier;
  const [arrayCookie, setArrayCookie] = useState(cart);

  //********************************************************************
  //*************************FUNCTION***********************************
  useEffect(() => {
    const fetchData = async () => {
      try {
        setArrayCookie(cart);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [cart]);

  //********************************************************************
  //*************************AFFICHAGE***********************************
  return (
    <div id="beerCart">
      {arrayCookie.length >= 1 ? (
        <div className="container">
          {/* je boucle sur mon tableau de produit  */}
          {arrayCookie.map((elem, index) => {
            const beerId = elem.id; // je stock l'id produit dans une variable
            return (
              <div key={index} className="content_product">
                {/* je redirige l'utilisateur su la containers BeerDetails.js */}
                <Link to={`/beerdetail/${beerId}`}>
                  <img src={elem.image} alt="" />
                </Link>
                <div className="content_product_info">
                  <div>
                    <label>Name:</label>
                    <p>{elem.name}</p>
                  </div>
                  <div>
                    <label>Qt:</label>
                    <p>{elem.quantite}</p>
                  </div>
                </div>

                <div className="button">
                  {/* Components Button.js */}
                  <Button
                    removeCart={removeCart}
                    cart={cart}
                    setArrayCookie={setArrayCookie}
                    elem={elem}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // si je n'ai rien dans le panier j'affiche Empty cart
        <div className="content_no_cart">
          <div className="no_cart">
            <h1>Empty cart</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeerCart;
