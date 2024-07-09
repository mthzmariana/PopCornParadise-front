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

import AdminTemplate from './templates/AdminTemplate';

function App() {
  const [footerFlag, setFooterFlag] = useState(true);
  const [navbarFlag, setNavbarFlag] = useState(true);

  return (
    <UserProvider>
      <Router>
        <Routes>
        <Route path="/admin/*" element={<AdminTemplate/>} />
          <Route
            path="*"
            element={
              <>
                {navbarFlag && <NavbarComponent />}
                <div>
                  <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/acerca-de" element={<AcercaComponent />} />
                    <Route path="/contacto" element={<ContactoComponent />} />
                    <Route
                      path="/registro"
                      element={
                        <RegistroComponent
                          handleNavbar={setNavbarFlag}
                          handleFooter={setFooterFlag}
                        />
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <LoginComponent
                          handleNavbar={setNavbarFlag}
                          handleFooter={setFooterFlag}
                        />
                      }
                    />
                    <Route path="/peliculas" element={<PeliculasComponent />} />
                    <Route path="/perfil" element={<PerfilComponent />} />
                    <Route path="/editar-perfil/:id" element={<EditUserComponent />} />
                  </Routes>
                </div>
                {footerFlag && <FooterComponent />}
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
