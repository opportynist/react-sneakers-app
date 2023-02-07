import React from "react";
import AppContext from "../context";
import style from "../components/Drawer/drawer.module.scss";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div class={style.cartEmpty}>
      <img
        width="120px"
        src={image}
        alt="Empty"
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        class={style.greenButton}
      >
        <img
          alt="Arrow"
          src="./images/arrow.svg"
        />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
