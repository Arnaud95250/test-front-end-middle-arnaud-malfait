//******************Packages*******************
import axios from "axios";
import { useState, useEffect } from "react";
//******************Components*******************
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";

const BeerList = ({ myCart }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(1);

  //********************************************************************
  //*************************FUNCTION***********************************
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?per_page=10&page=${offset}`
        );
        setData(response.data); // Je stock le retour de la requète axios dans un state data
        setIsLoading(false); // je modifie isLoading qui gère l'affichage conditionel
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [offset]);

  // Function qui gère la pagination
  const pagination = async (nb) => {
    setOffset(nb);
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?per_page=10&page=${nb}`
      );
      setData(response.data);
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function qui gère la barre de recherche
  const searchBeer = async (value) => {
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?per_page=10&beer_name=${value}`
      );
      setData(response.data);
    } catch (error) {}
  };
  //********************************************************************
  //*************************AFFICHAGE***********************************
  return (
    <div id="beerList">
      <Search searchBeer={searchBeer} />
      {isLoading ? ( // si aucun contenue n'est charger après la requète axios j'affiche en cours de chargement
        <div>
          <p>En cours de chargement</p>
        </div>
      ) : (
        <>
          {/* Components Pagination.js */}
          <Pagination offset={offset} pagination={pagination} />
          {/* Components ProductList.js */}
          <ProductList myCart={myCart} data={data} />
        </>
      )}
    </div>
  );
};

export default BeerList;
