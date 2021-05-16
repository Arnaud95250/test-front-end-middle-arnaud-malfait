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
    //si le tableau est vide je push le produit
    if (tab.length === null) {
      tab.push(value);
      setPanier(tab);
    } else {
      let isPresent = false;
      for (let i = 0; i < tab.length; i++) {
        //je boucle sur mon tableau
        if (tab[i].id === value.id) {
          isPresent = true;
          // si la quantite est supérieur ou égale à 1
          if (tab[i].quantite >= 1) {
            tab[i].quantite = tab[i].quantite + 1; // j'ajoute 1 à la quantité initiale
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
    panier.splice(value, 1); // je récupère l'id du produit et le retire du panier
    setPanier(panier); // j'actualise le panier
    Cookies.set("productBeer", panier, { expires: 7 }); // je stock la modification du panier dans un cookies qui restera enregistré 7 jours
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
