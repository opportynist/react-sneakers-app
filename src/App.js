import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [count, setCount] = React.useState(false);
  React.useEffect(() => {
    fetch("https://63a100f8e3113e5a5c4b4b93.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);
  const onSaveToCard = (obj) => {
    let tre = cartItems.some(
      (test) => JSON.stringify(test) === JSON.stringify(obj)
    );
    if (!tre) {
      console.log(tre);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  return (
    <div className="wrapper">
      <div className="wrapper__content">
        {count && (
          <Drawer
            items={cartItems}
            onClose={() => setCount(false)}
          />
        )}

        <Header onClickCart={() => setCount(true)}></Header>
        <div className="wrapper__cotol">
          <div className="title__search">
            <h1 className="title">Все кросовки</h1>
            <div className="title__search_search__block">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="17px"
                height="17px"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
              <input placeholder="Поиск..."></input>
            </div>
          </div>
          <div className="wrapper__card">
            {items.map((item) => (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={(obj) => onSaveToCard(obj)}
                onFavorite={() => console.log("favorit ")}
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
