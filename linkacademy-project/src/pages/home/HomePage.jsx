import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import CheckmarkIcon from '../../assets/images/icons/checkmark.png';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then((response) => {
            setProducts(response.data);
        });
    }, []);
    

    return (
        <>
            <title>Linkacademy Project</title>
            <link rel="icon" type="image/svg+xml" href="homeicon.svg" />

            <Header cart={cart}/>

            <div className="home-page">
            <ProductsGrid products={products}/>
            </div>
        </>
    );
}