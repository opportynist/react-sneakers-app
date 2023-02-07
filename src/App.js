import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorite";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setisRedy] = React.useState(true);
  React.useEffect(() => {
    async function FetcData() {
      setisRedy(true);
      const itemsResponse = await axios.get("http://localhost:3001/items");

      const cardRespons = await axios.get("http://localhost:3001/card");

      const favoritResponse = await axios.get("http://localhost:3001/favori");
      setisRedy(false);
      setCartItems(cardRespons.data);
      setFavorites(favoritResponse.data);
      setItems(itemsResponse.data);
    }
    FetcData();
  }, []);

  const onSaveToCard = async (obj) => {
    try {
      if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/card/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post("http://localhost:3001/card", obj);

        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("неудолось добавить в карзину");
    }
  };

  const onDeliteItemCart = (id) => {
    axios.delete(`http://localhost:3001/card/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavoritToCard = async (obj) => {
    try {
      if (favorites.find((Favobj) => Favobj.id === obj.id)) {
        axios.delete(`http://localhost:3001/favori/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post("http://localhost:3001/favori", obj);

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("неудолось добавить в фавориты");
    }
  };
  const onCandgeSearchINput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onFavoritToCard,
      }}
    >
      <div className="wrapper">
        <div className="wrapper__content">
          {cartOpened && (
            <Drawer
              items={cartItems}
              onClose={() => setCartOpened(false)}
              onDelite={onDeliteItemCart}
            />
          )}

          <Header onClickCart={() => setCartOpened(true)}></Header>
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
                  cartItems={cartItems}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}
export default App;
