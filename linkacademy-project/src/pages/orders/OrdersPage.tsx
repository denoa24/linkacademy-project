import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react"; // fragment pentru a returna mai multe elemente , putand adauga key
import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";
import type { CartItem as cartItem, Order } from "../../types/cart";

type OrdersPageProps = {
  cart: cartItem[];
  loadCart: () => Promise<void>;
};

export function OrdersPage({ cart, loadCart }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  // fetch orders de la API
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <title>Orders</title>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {

                    const addToCart = async () => {
                      await axios.post("/api/cart-items", {
                        productId: orderProduct.product.id,
                        quantity: 1,
                      });
                      await loadCart();
                    };

                    return (
                      //produsele sunt intr-un obiect product, deci accesam datele prin orderProduct.product
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}{" "}
                          </div>
                          <button className="buy-again-button button-primary"
                            onClick={addToCart}
                          >
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span
                              className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
