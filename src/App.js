import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes, Navigate } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import ProductsDetails from "./pages/ProductsDetails";
import { Toaster } from 'react-hot-toast';




const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<Invoice />} />
          <Route path="/create/:id" element={<Invoice />} />
          <Route path="/edit/:id" element={<Invoice />} />
          <Route path="/products" element={<ProductsDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </Container>
    </div>
  );
};

export default App;
