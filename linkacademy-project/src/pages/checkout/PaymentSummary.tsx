import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import type { PaymentSummary as PaymentSummaryType } from "../../types/cart";

type PaymentSummaryProps = {
  paymentSummary: PaymentSummaryType | null;
  loadCart: () => Promise<void>;
};

export function PaymentSummary({paymentSummary, loadCart }: PaymentSummaryProps) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();
    navigate('/orders'); //navigate nu este asincron, nu trebuie pus await
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && (
        <>
          {/* totalItems si toate celalte valori, luate din backend, care se pot lua si din Dev tools -> network -> payment */}
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary"
          onClick= {createOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
