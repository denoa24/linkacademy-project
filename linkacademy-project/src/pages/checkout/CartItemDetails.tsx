import React from 'react';
import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import type { CartItem } from "../../types/cart";

type CartItemDetailsProps = {
  cartItem: CartItem;
  loadCart: () => Promise<void>;
};

export function CartItemDetails({ cartItem, loadCart }: CartItemDetailsProps) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState<string>(String(cartItem.quantity));

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    //facem switch intre true si false pentru isUpdatingQuantity
    if (isUpdatingQuantity) {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: Number(quantity),
        });
        await loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleQuantityKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      updateQuantity();

    } else if (keyPressed === 'Escape') {
      setQuantity(String(cartItem.quantity));
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdatingQuantity 
            ? <input type="text" className="quantity-textbox" 
                value={quantity} onChange={updateQuantityInput}
                onKeyDown={handleQuantityKeyDown}
            />
            : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
