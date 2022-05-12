import React from "react";
import { ToastContainer } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/installation
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import UserStoreProvider from "./context/UserContext";
// redux setup
import { Provider } from "react-redux";
// createStore is deprecated and configureStore is recommended
import { createStore } from "redux";
import rootReducer from "./redux/reducers";

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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberPage from "./pages/MemberPage.js";

import PrivateRoute from "./guard/PrivateRoute";
import CartPage from "./pages/CartPage";

const store = createStore(rootReducer);

const queryClient = new QueryClient()
function App() {

  return (
    <Provider store={store}>
      <UserStoreProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <NavBar />
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="detail/:id/title/:title" element={<DetailPage />} />
            {/* private route  */}
            <Route path="hospital" element={<PrivateRoute><HospitalPage /></PrivateRoute>} />
            <Route path="category" element={<PrivateRoute><CategoryIndexPage /></PrivateRoute>} />
            <Route path="category/create" element={<PrivateRoute><CategoryCreatePage /></PrivateRoute>} />
            <Route path="category/edit/:id" element={<PrivateRoute><CategoryEditPage /></PrivateRoute>} />
            <Route path="upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
            <Route path="member" element={<PrivateRoute><MemberPage /></PrivateRoute>} />
            <Route path="cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
            {/* end private route  */}

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </QueryClientProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;
