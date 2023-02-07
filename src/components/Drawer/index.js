import style from "./drawer.module.scss";
import Info from "../Info";
import React from "react";
import AppContext from "../../context";
import axios from "axios";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onDelite, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderComplite, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`http://localhost:3001/orders`, {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`http://localhost:3001/card/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };
  return (
    <div className={style.overlay}>
      <div className={style.drawer}>
        <h2 className={style.title}>
          Корзина{" "}
          <button onClick={onClose}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                fill="#B5B5B5"
              />
            </svg>
          </button>
        </h2>
        {items.length > 0 ? (
          <>
            <div className={style.drawer__goods}>
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className={style.cartItem}
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className={style.cartItem__img}
                  ></div>
                  <div className={style.cartItem__costs}>
                    <div className={style.cartItem__costs__prise}>
                      <span>{obj.title}</span>

                      <b>{obj.price} руб</b>
                    </div>
                    <button>
                      <svg
                        onClick={() => onDelite(obj.id)}
                        width="11"
                        height="11"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                          fill="#B5B5B5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.drawer__finel_costs}>
              <ul className={style.list_costs}>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
              >
                Оформить заказ
              </button>
            </div>
          </>
        ) : (
          <>
            <Info
              title={isOrderComplite ? "Заказ оформлен" : " Корзина пустая"}
              description={
                isOrderComplite
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
              }
              image={
                isOrderComplite
                  ? "./images/complited-order.jpg"
                  : "./images/empty-cart.jpg"
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Drawer;
