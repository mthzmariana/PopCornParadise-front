// src/components/TicketPageComponent/TicketPageComponent.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './TicketPageComponent.css';

const TicketPageComponent = () => {
  const location = useLocation();
  const { allProducts, total, folio, date } = location.state || {};

  if (!location.state) {
    return <div>No hay información de compra disponible.</div>;
  }

  return (
    <div className="ticket-container">
      <h2>Ticket de Compra</h2>
      <p>Fecha: {date}</p>
      <p>Folio: {folio}</p>
      <div className="ticket-products">
        {allProducts.map((product, index) => (
          <div key={index} className="ticket-product">
            <span>{product.quantity} x {product.nameProduct}</span>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
      <p className="ticket-total">Total: ${total}</p>
    </div>
  );
};

export default TicketPageComponent;
