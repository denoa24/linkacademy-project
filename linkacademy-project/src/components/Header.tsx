import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ThemeToggle } from './ThemeToggle';
import './header.css';
import type { CartItem } from '../types/cart';

type HeaderProps = {
  cart: CartItem[];
};


export function Header({ cart }: HeaderProps) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search');

   const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach ((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      searchProducts();

    } else if (keyPressed === 'Escape') {
      setSearch('');
    }
  };


  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
          value={search} onChange={updateSearchInput} onKeyDown={handleSearchKeyDown}
        />

        <button className="search-button"
          onClick={searchProducts}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <ThemeToggle />
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
