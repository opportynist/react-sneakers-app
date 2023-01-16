import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorite";
import { Route, Routes } from "react-router-dom";
function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [count, setCount] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://63a100f8e3113e5a5c4b4b93.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://63a100f8e3113e5a5c4b4b93.mockapi.io/card")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://63a100f8e3113e5a5c4b4b93.mockapi.io/favori")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onSaveToCard = (obj) => {
    axios.post("https://63a100f8e3113e5a5c4b4b93.mockapi.io/card", obj);

    setCartItems((prev) => [...prev, obj]);
  };
  const onDeliteItemCart = (id) => {
    axios.delete(`/https://63a100f8e3113e5a5c4b4b93.mockapi.io/card/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavoritToCard = async (obj) => {
    try {
      if (favorites.find((Favobj) => Favobj.id === obj.id)) {
        axios.delete(
          `/https://63a100f8e3113e5a5c4b4b93.mockapi.io/favori/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://63a100f8e3113e5a5c4b4b93.mockapi.io/favori",
          obj
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("неудолось добавить в фавориты");
    }
  };
  const onCandgeSearchINput = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="wrapper">
      <div className="wrapper__content">
        {count && (
          <Drawer
            items={cartItems}
            onClose={() => setCount(false)}
            onDelite={onDeliteItemCart}
          />
        )}

        <Header onClickCart={() => setCount(true)}></Header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onCandgeSearchINput={onCandgeSearchINput}
                onFavoritToCard={onFavoritToCard}
                onSaveToCard={onSaveToCard}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                items={favorites}
                onFavoritToCard={onFavoritToCard}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
