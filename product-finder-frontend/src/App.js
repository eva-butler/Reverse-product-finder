import React from 'react';
import Header from './Header';
import ImageUpload from './ImageUpload';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ImageUpload />
      </main>
      <Footer />
    </div>
  );
}

export default App;
