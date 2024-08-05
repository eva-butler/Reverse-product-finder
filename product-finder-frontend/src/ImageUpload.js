import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';
import ProductTable from './ProductTable';
import SimilarItemsTable from './SimilarItemsTable';
import StoreMap from './StoreMap';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setImagePreview(null);
      setErrorMessage('Please select a .jpg file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a valid .jpg file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  // Dummy data for the product table
  const dummyProducts = [
    {
      link: 'https://example.com/product1',
      price: '$10.99',
      description: 'Example product 1',
      sales: '10% off',
      availability: ['In Store', 'Online']
    },
    {
      link: 'https://example.com/product2',
      price: '$12.99',
      description: 'Example product 2',
      sales: '20% off',
      availability: ['SOLD OUT']
    }
  ];

  // Dummy data for the similar items table
  const dummySimilarItems = [
    {
      link: 'https://example.com/similar1',
      image: 'https://via.placeholder.com/100',
      price: '$9.99',
      sales: '5% off',
      availability: ['Online']
    },
    {
      link: 'https://example.com/similar2',
      image: 'https://via.placeholder.com/100',
      price: '$11.99',
      sales: '15% off',
      availability: ['In Store', 'Online']
    },
    {
      link: 'https://example.com/similar3',
      image: 'https://via.placeholder.com/100',
      price: '$8.99',
      sales: '10% off',
      availability: ['SOLD OUT']
    },
    {
      link: 'https://example.com/similar4',
      image: 'https://via.placeholder.com/100',
      price: '$13.99',
      sales: '20% off',
      availability: ['In Store']
    },
    {
      link: 'https://example.com/similar5',
      image: 'https://via.placeholder.com/100',
      price: '$14.99',
      sales: '25% off',
      availability: ['Online']
    },
    {
      link: 'https://example.com/similar6',
      image: 'https://via.placeholder.com/100',
      price: '$15.99',
      sales: '30% off',
      availability: ['In Store', 'Online']
    }
  ];

  return (
    <div className="upload-container">
      <div className="upload-content">
        <div className="upload-box">
          {imagePreview ? (
            <img src={imagePreview} alt="Selected" className="image-preview" />
          ) : (
            <p>Choose a .jpg image of the product here</p>
          )}
        </div>
        <div className="upload-controls">
          <p className="description">
            Upload a .jpg image of a product to find the best deals and similar items available online and in stores.
            Our service compares prices across multiple websites to help you find the best offers.
            Additionally, we provide a map that indicates where the in-store options are for different websites.
            Start by selecting an image and clicking the search button to begin your search.
          </p>
          <input type="file" onChange={handleFileChange} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="upload-button" onClick={handleUpload}>Search</button>
        </div>
      </div>
      <ProductTable products={dummyProducts} />
      <SimilarItemsTable items={dummySimilarItems} />
      <StoreMap />
    </div>
  );
};

export default ImageUpload;
