// ProductList.jsx














import React from 'react';
import ProductItem from './ProductItem';

const dummyProducts = [
  {
    id: '1',
    image: ['https://picsum.photos/200/300?random=1'],
    name: 'Classic Sneakers',
    price: 49.99,
  },
  {
    id: '2',
    image: ['https://picsum.photos/200/300?random=2'],
    name: 'Sporty T-Shirt',
    price: 29.99,
  },
  {
    id: '3',
    image: ['https://picsum.photos/200/300?random=3'],
    name: 'Leather Wallet',
    price: 19.99,
  },
  {
    id: '4',
    image: ['https://picsum.photos/200/300?random=4'],
    name: 'Denim Jacket',
    price: 89.99,
  },
  {
    id: '5',
    image: ['https://picsum.photos/200/300?random=5'],
    name: 'Smart Watch',
    price: 199.99,
  },
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
      {dummyProducts.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
