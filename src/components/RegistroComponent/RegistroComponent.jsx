import "./RegistroComponent.css";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroComponent({handleNavbar, handleFooter}) {
  const navigate = useNavigate();

  useEffect(() => {
    handleNavbar(false);
    handleFooter(false);
    
    return () => {
      handleNavbar(true);
      handleFooter(true);
    };
  }, [handleNavbar, handleFooter]);

  return (
    <div>
        <h1>Registro</h1>
    </div>
  );
}

export default RegistroComponent;