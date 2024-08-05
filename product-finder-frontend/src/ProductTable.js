// src/ProductTable.js
import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Link</th>
            <th>Price</th>
            <th>Description</th>
            <th>Sales</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td><a href={product.link} target="_blank" rel="noopener noreferrer">Product Link</a></td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.sales}</td>
              <td>
                {product.availability.includes('SOLD OUT') && <span className="availability sold-out">SOLD OUT</span>}
                {product.availability.includes('In Store') && <span className="availability in-store">In Store</span>}
                {product.availability.includes('Online') && <span className="availability online">Online</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
