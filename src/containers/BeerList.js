import axios from "axios";
import { useState, useEffect } from "react";

import Pagination from "../components/Pagination";

// import components
import Search from "../components/Search";
import ProductList from "../components/ProductList";

const BeerList = ({ beerCookie }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?per_page=10&page=${offset}`
        );
        setData(response.data);
        setIsLoading(false);
        return;
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [offset]);

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

  const searchBeer = async (value) => {
    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?per_page=10&beer_name=${value}`
      );
      setData(response.data);
    } catch (error) {}
  };

  return (
    <div id="beerList">
      <Search searchBeer={searchBeer} />
      {isLoading ? (
        <div>
          <p>En cours de chargement</p>
        </div>
      ) : (
        <>
          <Pagination offset={offset} pagination={pagination} />
          <ProductList beerCookie={beerCookie} data={data} />
        </>
      )}
    </div>
  );
};

export default BeerList;
