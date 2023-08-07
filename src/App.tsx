import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import ProductsList from './components/ProductList';

import Navbar from './components/navbar';
import Footer from './components/footer';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductsList/>}/>
        <Route path="/edit/:id" element={<EditProduct/>} />
        <Route path='/add' element={<AddProduct/>}/>
      </Routes>
      <Footer />
    </div>
  
  );
}

export default App;

