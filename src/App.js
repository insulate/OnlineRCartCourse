import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from '../src/components/NavBar.js'
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="product" element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
