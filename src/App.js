//******************SCSS**************************
import "./App.scss";
import "./assets/scss/containers/beerList.scss";
import "./assets/scss/containers/beerDetail.scss";
import "./assets/scss/containers/beerCart.scss";
import "./assets/scss/components/header.scss";
import "./assets/scss/components/footer.scss";
import "./assets/scss/components/search.scss";
import "./assets/scss/components/productList.scss";
import "./assets/scss/components/pagination.scss";
//******************Components*******************
import Header from "./components/Header";
import Footer from "./components/Footer";
//******************Containers*******************
import BeerList from "./containers/BeerList";
import BeerDetail from "./containers/BeerDetail";
import BeerCart from "./containers/BeerCart";
//******************Packages**********************
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [productBeer, setProductBeer] = useState(Cookies.get("productBeer"));
  const [arrayCookie, setArrayCookie] = useState([]);
  const cart = arrayCookie;
  console.log(productBeer);

  const beerCookie = (beer) => {
    // if (!beer.id === cart.indexOf(beer.id)) {
    if (beer) {
      const newtArrayCookie = [...arrayCookie]; // Je créé une copie de mon tableau arrayCookie
      newtArrayCookie.push(beer); // je push le produit ajouté dans mon tableau
      setArrayCookie(newtArrayCookie); // j'actualise mon tableau d'origine avec la copie
      setProductBeer(arrayCookie);
      Cookies.set("productBeer", arrayCookie, { expires: 7 }); // création du cookie Cookies.set("nom_du_cookie", paramettre que je stock, { la date ou le cookie doit disparaitre: 7 });
    } else {
      console.log("error");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header beerCookie={beerCookie} cart={cart} />
        <Switch>
          <Route path="/beercart">
            <BeerCart beerCookie={beerCookie} cart={cart} />
          </Route>
          <Route path="/beerdetail/:beerId">
            <BeerDetail beerCookie={beerCookie} />
          </Route>
          <Route path="/">
            <BeerList beerCookie={beerCookie} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
