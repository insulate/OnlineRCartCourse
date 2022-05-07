import React from "react";
import { ToastContainer } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/installation
import { Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import HomePage from "./pages/HomePage";
import NavBar from '../src/components/NavBar.js'
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import CategoryIndexPage from "./pages/category/IndexPage";
import CategoryCreatePage from "./pages/category/CreatePage";
import CategoryEditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";

const queryClient = new QueryClient()
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="detail/:id/title/:title" element={<DetailPage />} />
          <Route path="hospital" element={<HospitalPage />} />

          <Route path="category" element={<CategoryIndexPage />} />
          <Route path="category/create" element={<CategoryCreatePage />} />
          <Route path="category/edit/:id" element={<CategoryEditPage />} />

          <Route path="upload" element={<UploadPage />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
