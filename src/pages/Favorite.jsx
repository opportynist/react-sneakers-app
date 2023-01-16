import Card from "../components/Card";

function Favorites({ items, onFavoritToCard }) {
  return (
    <div className="wrapper__cotol">
      <div className="">
        <h1 className="title">Мои закладки</h1>
      </div>

      <div className="wrapper__card">
        {items.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavoritToCard={onFavoritToCard}
            onFavorite={(obj) => onFavoritToCard(obj)}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
