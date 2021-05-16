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
  // const [productBeer, setProductBeer] = useState(Cookies.get("productBeer"));
  const [panier, setPanier] = useState([]);

  // Function qui ajoute un produit au panier ou modifie la quantité
  const myCart = (value) => {
    const tab = [...panier];
    if (tab.length === null) {
      tab.push(value);
      setPanier(tab);
    } else {
      let isPresent = false;
      for (let i = 0; i < tab.length; i++) {
        if (tab[i].id === value.id) {
          isPresent = true;
          if (tab[i].quantite >= 1) {
            tab[i].quantite = tab[i].quantite + 1;
          } else {
            tab.splice(i, 1);
          }
        }
      }
      if (isPresent === false) {
        tab.push(value);
      }
      setPanier(tab);
      Cookies.set("productBeer", tab, { expires: 7 });
    }
  };

  // Function qui supprime un produit du panier
  const removeCart = (value) => {
    panier.splice(value, 1);
    setPanier(panier);
    Cookies.set("productBeer", panier, { expires: 7 });
  };

  // Route vers les différentes pages (componenents, containers)
  return (
    <div className="App">
      <Router>
        <Header panier={panier} />
        <Switch>
          <Route path="/beercart">
            <BeerCart panier={panier} removeCart={removeCart} />
          </Route>
          <Route path="/beerdetail/:beerId">
            <BeerDetail myCart={myCart} />
          </Route>
          <Route path="/">
            <BeerList myCart={myCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
