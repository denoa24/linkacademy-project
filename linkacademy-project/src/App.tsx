import { Routes, Route} from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HomePage } from './pages/home/HomePage.jsx' 
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages//orders/OrdersPage.jsx'
import { ThemeToggle } from './components/ThemeToggle.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import './App.css'
import { Footer } from './components/Form'


function App() {
      const [cart, setCart] = useState([]);

        const loadCart = async () => {
          const response = await axios.get('/api/cart-items?expand=product')
          setCart(response.data);
        }

      useEffect(() => {
        loadCart();
}, []);

  return (
    <>
    <ThemeToggle />
    <Routes>
      <Route index element = {<HomePage cart = {cart} loadCart = {loadCart}/>} />
      <Route path ="checkout" element={<CheckoutPage cart = { cart } loadCart = {loadCart} />} />
      <Route path ="orders" element={<OrdersPage cart = { cart } loadCart = { loadCart } />} />
      <Route path ="*" element={<NotFoundPage cart = { cart } loadCart = { loadCart } />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
