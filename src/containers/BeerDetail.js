//******************Packages**********************
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//******************Components*******************
import Details from "../components/Details";

const BeerDetail = ({ beerCookie }) => {
  let { beerId } = useParams(); // je récupère et stock l'id produit transmit dans l'URL
  const [data, setData] = useState([]); // Je stock le produit récupèré avec ma requete axios à l'ouverture dans la page (useEffect)
  const [pushQuantite, setPushQuantite] = useState(); // je stock la quantité choisie dans l'input
  const [isLoading, setIsLoading] = useState(true); // state qui permet de gérer l'affichage asynchrone

  //********************************************************************
  //*************************FUNCTION***********************************
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Je récupère le produit avec son id
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers/${beerId}`
        );
        setData(response.data); //  je stock le retour de ma requête dans mon tableau
        setIsLoading(false); // Si la requête axios à abouti (je récupère le produit) je change ma condition et affiche le contenu récupèré
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [beerId]);

  //function ajout de produit dans le panier
  const addProduct = (product) => {
    if (pushQuantite > 0 && pushQuantite.length <= 3 && product) {
      beerCookie(product); // je stock mon objet en argument qui permettra de remonter les infos au component parent (App.js)
    } else {
      alert("3 chiffres maximum autorisé et 1 article minimum");
    }
  };

  //********************************************************************
  //*************************AFFICHAGE***********************************
  return (
    <div id="beerDetail">
      {isLoading ? (
        <div>
          <p>En cours de chargement</p>
        </div>
      ) : (
        <div className="container">
          {/* component Details.js */}
          <Details
            data={data}
            setPushQuantite={setPushQuantite}
            addProduct={addProduct}
            pushQuantite={pushQuantite}
          />
        </div>
      )}
    </div>
  );
};

export default BeerDetail;
