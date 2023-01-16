import style from "./Card.module.scss";
import React from "react";

function Card({
  price,
  title,
  onFavorite,
  imageUrl,
  onPlus,
  favorited = false,
}) {
  const [coun, setCount] = React.useState(false);
  const [favorit, setISFavorit] = React.useState(favorited);
  const onSaveCard = () => {
    onPlus({ price, title, imageUrl });
    setCount(!coun);
  };
  const onFavoriter = () => {
    onFavorite({ price, title, imageUrl });
    setISFavorit(!favorit);
  };
  return (
    <div className={style.card}>
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
          width={130}
          height={112}
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
          src={coun ? "../images/icon/saveOK.svg" : "../images/icon/save.svg"}
          alt="re"
        ></img>
      </div>
    </div>
  );
}
export default Card;
