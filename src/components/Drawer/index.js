import style from "./drawer.module.scss";

function Drawer({ onClose, onDelite, items = [] }) {
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
                <div className={style.cartItem}>
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
              <button>Оформить заказ</button>
            </div>
          </>
        ) : (
          <div class={style.cartEmpty}>
            <img
              width="120px"
              height="120px"
              src="./images/empty-cart.jpg"
              alt="Empty"
            />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button
              onClick={onClose}
              class={style.greenButton}
            >
              <img
                src="./images/arrow.svg"
                alt="Arrow"
              />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Drawer;
