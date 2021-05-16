const Details = ({ data, myCart }) => {
  // const [counter, setCounter] = useState(Number);

  return (
    <div className="container">
      {/* je boucle sur mon tableau pour récupèrer le contenue */}
      {data.map((elem, index) => {
        const productId = elem.id; // je stock l'id du produit dans une variable

        return (
          <div key={index} className="info_beer">
            <div className="content_img">
              <img src={elem.image_url} alt="" />
            </div>
            <div className="content_text">
              <p>
                <span>Name beer: </span> {elem.name}
              </p>
              <p>
                <span>Volume: </span>{" "}
                {elem.boil_volume.value + " " + elem.boil_volume.unit}
              </p>
              <p>
                <span>Brewers tips: </span>
                {elem.brewers_tips}
              </p>
              <p>
                <span>Déscription: </span> {elem.description}
              </p>
              <div className="add_product">
                {/* j'ajoute un produit => array[(objet)] */}
                <button
                  onClick={() =>
                    myCart({
                      id: productId,
                      name: elem.name,
                      image: elem.image_url,
                      quantite: 1,
                    })
                  }
                >
                  Ajouter au panier
                </button>
                {/* <h1>{counter}</h1> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Details;
