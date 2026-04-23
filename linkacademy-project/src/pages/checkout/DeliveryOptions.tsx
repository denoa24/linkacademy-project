import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";
import type { CartItem, DeliveryOption } from "../../types/cart";

type DeliveryOptionsProps = {
  cartItem: CartItem;
  deliveryOptions: DeliveryOption[];
  loadCart: () => Promise<void>;
};

export function DeliveryOptions({cartItem, deliveryOptions, loadCart}: DeliveryOptionsProps) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

          const updateDeliveryOption = async () => {
            axios.put (`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id, //vrem ca deliveryOptionId din backend sa fie updatat cu id-ul optiunii selectate
            });
            await loadCart(); //reincarcam cosul dupa update
          };

        return (
          <div key={deliveryOption.id} className="delivery-option"
          onClick = {updateDeliveryOption}>
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange = {() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
