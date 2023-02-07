import Card from "../components/Card";
import React from "react";
import AppContext from "../context";
function Favorites() {
  const { favorites, onFavoritToCard } = React.useContext(AppContext);

  return (
    <div className="wrapper__cotol">
      <div className="">
        <h1 className="title">Мои закладки</h1>
      </div>

      <div className="wrapper__card">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavoritToCard={onFavoritToCard}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
