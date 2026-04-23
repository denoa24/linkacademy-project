export type Product = {
  id?: string;
  name: string;
  priceCents: number;
  image: string;
  rating?: {
    stars: number;
    count: number;
  }
};

export type CartItem = {
  productId: string;
  quantity: number;
  deliveryOptionId?: string;
  product: Product;
};

export type DeliveryOption = {
  id: string;
  name: string;
  priceCents: number;
  estimatedDeliveryTimeMs: number;
};

export type PaymentSummary = {
  subtotalCents: number;
  taxCents: number;
  shippingCosts: number;
  totalCents: number;
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  totalCostCents: number;
};


export type Order = {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
    products: {
    product: Product;
    estimatedDeliveryTimeMs?: number;
    quantity: number;
}[];
};