import { Link } from "react-router-dom";

const ProductList = ({ beerCookie, data }) => {
  const addProduct = (product) => {
    beerCookie(product);
  };

  return (
    <div id="productList">
      <div className="container">
        {data.map((elem, index) => {
          const beerId = elem.id;
          return (
            <>
              <div key={index} className="info_beer">
                <button
                  onClick={() =>
                    addProduct({
                      id: beerId,
                      name: elem.name,
                      image: elem.image_url,
                      quantite: 1,
                    })
                  }
                >
                  +
                </button>
                <Link to={`/beerdetail/${beerId}`}>
                  <p>{elem.name}</p>
                  <p>{elem.boil_volume.value + " " + elem.boil_volume.unit}</p>
                  <img src={elem.image_url} alt="" />
                </Link>
                <div className="button_list"></div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
