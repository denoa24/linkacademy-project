import { Product } from './Product';
import type { Product as ProductType } from '../../types/cart';

type ProductsGridProps = {
  products: ProductType[];
  loadCart: () => Promise<void>;
};

export function ProductsGrid({ products, loadCart }: ProductsGridProps) {
    return (
  <div className="products-grid">
    {products.map((product) => {
      return (
        <Product key= {product.id} product = {product} loadCart = {loadCart} />
      );
    })}
  </div>
    );
}
