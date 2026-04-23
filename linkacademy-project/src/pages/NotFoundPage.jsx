import { Header } from '../components/Header';
import './NotFoundPage.css';

export function NotFoundPage({ cart, loadCart }) {
  return (
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

    
      <Header cart={cart} loadCart={loadCart}/>

     
      <div className="not-found-message">
        Page not found
      </div>
    </>
  );
}