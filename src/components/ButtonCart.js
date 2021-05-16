const Button = ({ removeCart, cart, setArrayCookie, elem }) => {
  return (
    <div id="button">
      <button // button qui retire 1 à la quantité
        onClick={() => {
          const tab = [...cart]; // Je créé une copie du tableau initial
          for (let i = 0; i < tab.length; i++) {
            if (tab[i].id === elem.id) {
              if (tab[i].quantite >= 1) {
                tab[i].quantite = tab[i].quantite - 1;
              } else {
                removeCart(i); // function en argument du container qui remonte les informations dans App.js
              }
            }
          }
          setArrayCookie(tab); //Jactualise mon tableau et le stock dans arrayCookie
        }}
      >
        -
      </button>

      <button // button qui ajoute 1 à la quantité
        onClick={() => {
          const tab = [...cart]; // Je créé une copie du tableau initial
          for (let i = 0; i < tab.length; i++) {
            if (tab[i].id === elem.id) {
              if (tab[i].quantite >= 1) {
                tab[i].quantite = tab[i].quantite += 1;
              } else {
                tab[i].quantite = 1;
              }
            }
          }
          setArrayCookie(tab); //Jactualise mon tableau et le stock dans arrayCookie
        }}
      >
        +
      </button>
      {/* <p>click two for supp</p> */}
    </div>
  );
};

export default Button;
