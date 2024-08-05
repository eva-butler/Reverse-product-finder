// src/SimilarItemsTable.js
import React from 'react';
import './SimilarItemsTable.css';

const SimilarItemsTable = ({ items }) => {
  // Limit to 5 items
  const limitedItems = items.slice(0, 5);

  return (
    <div className="table-container">
      <h2>Similar Items</h2>
      <table>
        <thead>
          <tr>
            <th>Link</th>
            <th>Image</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {limitedItems.map((item, index) => (
            <tr key={index}>
              <td><a href={item.link} target="_blank" rel="noopener noreferrer">Product Link</a></td>
              <td><img src={item.image} alt={item.description} className="product-image" /></td>
              <td>{item.price}</td>
              <td>{item.sales}</td>
              <td>
                {item.availability.includes('SOLD OUT') && <span className="availability sold-out">SOLD OUT</span>}
                {item.availability.includes('In Store') && <span className="availability in-store">In Store</span>}
                {item.availability.includes('Online') && <span className="availability online">Online</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimilarItemsTable;
