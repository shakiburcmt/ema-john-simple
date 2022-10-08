import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
  // return { products , initialCart};  this part is from productsAndCartLoader
  const { products, initialCart } = useLoaderData();
  return (
    <div>
      <h2>This is orders: {products.length}</h2>
      <p>Initial{initialCart.length}</p>
    </div>
  );
};

export default Orders;