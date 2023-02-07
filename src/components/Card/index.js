import style from "./Card.module.scss";
import React from "react";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";
function Card({
  id,
  price,
  title,
  onFavorite,
  imageUrl,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [favorit, setIsFavorit] = React.useState(favorited);

  const onSaveCard = () => {
    onPlus({ id, price, title, imageUrl });
  };
  const onFavoriter = () => {
    onFavorite({ id, price, title, imageUrl });
    setIsFavorit(!favorit);
  };
  return (
    <div className={style.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#cfc9c9"
          foregroundColor="#ecebeb"
        >
          <rect
            x="296"
            y="132"
            rx="0"
            ry="0"
            width="2"
            height="0"
          />
          <rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            width="150"
            height="91"
          />
          <rect
            x="0"
            y="108"
            rx="5"
            ry="5"
            width="150"
            height="15"
          />
          <rect
            x="0"
            y="138"
            rx="5"
            ry="5"
            width="93"
            height="15"
          />
          <rect
            x="0"
            y="167"
            rx="5"
            ry="5"
            width="80"
            height="24"
          />
          <rect
            x="114"
            y="161"
            rx="10"
            ry="10"
            width="31"
            height="32"
          />
        </ContentLoader>
      ) : (
        <>
          <div className={style.card__picture}>
            <div className={style.follow}>
              <img
                onClick={onFavoriter}
                src={
                  favorit
                    ? "./images/icon/favoritClick.svg"
                    : "./images/icon/favorit.svg"
                }
                alt="re"
              ></img>
            </div>
            <img
              width="100%"
              height={135}
              src={imageUrl}
              alt="df"
            ></img>
            <p className="text">{title}</p>
          </div>
          <div className={style.card__cocts}>
            <div className={style.costs__prise}>
              <span>Цена:</span>
              <b> {price} руб.</b>
            </div>

            <img
              onClick={onSaveCard}
              src={
                isItemAdded(id)
                  ? "../images/icon/saveOK.svg"
                  : "../images/icon/save.svg"
              }
              alt="re"
            ></img>
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
