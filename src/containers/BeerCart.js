import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BeerCart = (beerCookie) => {
  const cart = beerCookie.cart;
  const [arrayCookie, setArrayCookie] = useState(cart);

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

  const remove = (index) => {
    const value = arrayCookie.indexOf(index);
    console.log(value);
    // if (value > -1) {
    arrayCookie.splice(value, 1);
    setArrayCookie(arrayCookie);
    // }
    // console.log(arrayCookie);
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
                <Link className="content_product_info">
                  <div>
                    <label>Name </label>
                    <p>{elem.name}</p>
                  </div>
                  <div>
                    <label>Quantity </label>
                    <p>{elem.quantite}</p>
                  </div>
                </Link>

                <div>
                  <button>+</button>
                  <button onClick={() => remove(index)}>-</button>
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
