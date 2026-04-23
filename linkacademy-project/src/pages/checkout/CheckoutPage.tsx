import axios from "axios";
import { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { ThemeToggle } from "../../components/ThemeToggle";
import "./checkout-header.css";
import "./CheckoutPage.css";
import type { CartItem, DeliveryOption} from "../../types/cart";
import type { PaymentSummary as PaymentSummaryType } from "../../types/cart";

type CheckoutPageProps = {
  cart: CartItem[];
  loadCart: () => Promise<void>;
};

export function CheckoutPage({ cart, loadCart }: CheckoutPageProps) {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]); // array e mai bun pentru liste
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryType | null>(null); // null e mai bun pentru obiect

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      ); //API call pentru a calcula optiunile de livrare
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary"); //API call pentru a calcula la fiecare metoda de plata
      setPaymentSummary(response.data);
    };

    fetchCheckoutData();
  }, [cart]); // de fiecare data cand cart se schimba, dam refresh la pagina pentru a se updata si payment summary

  let totalQuantity = 0;

  cart.forEach ((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            
            Checkout (
            <a className="return-to-home-link" href="/">
              {totalQuantity}
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <ThemeToggle />
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart = {loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart = {loadCart} />
        </div>
      </div>
    </>
  );
}
