import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import AcercaComponent from "./components/AcercaComponent/AcercaComponent";
import ContactoComponent from "./components/ContactoComponent/ContactoComponent";
import RegistroComponent from "./components/RegistroComponent/RegistroComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import PeliculasComponent from "./components/PeliculasComponent/PeliculasComponent";
import PerfilComponent from "./components/PerfilComponent/PerfilComponent";
import EditUserComponent from "./components/EditUserComponent/EditUserComponent"; // Importa EditUserComponent
import FooterComponent from "./components/FooterComponent/FooterComponent"; // Importa FooterComponent
import { UserProvider } from './contexts/UserContext'; // Importa el UserProvider

function App() {
  const [footerFlag, setFooterFlag] = useState(true);
  const [navbarFlag, setNavbarFlag] = useState(true);

  return (
    <UserProvider>
      <Router>
        <div>
          {navbarFlag && <NavbarComponent />}
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route exact path="/acerca-de" element={<AcercaComponent />} />
            <Route exact path="/contacto" element={<ContactoComponent />} />
            <Route exact path="/registro" element={<RegistroComponent handleNavbar={setNavbarFlag} handleFooter={setFooterFlag} />} />
            <Route exact path="/login" element={<LoginComponent handleNavbar={setNavbarFlag} handleFooter={setFooterFlag} />} />
            <Route exact path="/peliculas" element={<PeliculasComponent />} />
            <Route exact path="/perfil" element={<PerfilComponent />} />
            <Route exact path="/editar-perfil/:id" element={<EditUserComponent />} />
          </Routes>
          {footerFlag && <FooterComponent />}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
