import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BeerCart = ({ panier, removeCart }) => {
  // const [panier, setPanier] = useState([]);
  const cart = panier;
  const [arrayCookie, setArrayCookie] = useState(cart);

  // console.log(render.panier);
  // console.log(removeCart);

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

  const remove = (value) => {
    removeCart(value);
  };

  return (
    <div id="beerCart">
      {arrayCookie.length >= 1 ? (
        <div className="container">
          {arrayCookie.map((elem, index) => {
            const beerId = elem.id;
            return (
              <div key={index} className="content_product">
                <Link to={`/beerdetail/${beerId}`}>
                  <img src={elem.image} alt="" />
                </Link>
                <div className="content_product_info">
                  <div>
                    <label>Name :</label>
                    <p>{elem.name}</p>
                  </div>
                  <div>
                    <label>quantite :</label>
                    <p>{elem.quantite}</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      const tab = [...cart];
                      for (let i = 0; i < tab.length; i++) {
                        if (tab[i].id === elem.id) {
                          if (tab[i].quantite >= 1) {
                            tab[i].quantite = tab[i].quantite - 1;
                          } else {
                            // tab.splice(i, 1);
                            remove(i);
                          }
                        }
                      }
                      setArrayCookie(tab);
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      const tab = [...cart];
                      for (let i = 0; i < tab.length; i++) {
                        if (tab[i].id === elem.id) {
                          if (tab[i].quantite >= 1) {
                            tab[i].quantite = tab[i].quantite += 1;
                          } else {
                            tab[i].quantite = 1;
                          }
                        }
                      }
                      setArrayCookie(tab);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
