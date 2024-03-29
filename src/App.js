import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Registro } from "./Pages/Registro";
import { Login } from "./Pages/Login";
import { NavBar } from "./Components/NavBar";
import { VerDetalle } from "./Pages/VerDetalle";
import { ProductosAlta } from "./Pages/ProductosAlta.jsx";
import { ProductosMod } from "./Pages/ProductosMod";
import AuthProvider from "./Context/AuthContext";
import { Comprar } from "./Pages/Compra";
import { Perfil } from "./Pages/Perfil";
import { Carrito } from "./Pages/Carrito";
import { PersonalizacionSitio } from "./Pages/PersonalizacionSitio.jsx";

const App = () => {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/comprar/:id" element={<Comprar />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/perfil/:id" element={<Perfil />} />
                        <Route path="/carrito/:id" element={<Carrito />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/producto/:id" element={<VerDetalle />} />
                        <Route path="/producto/alta" element={<ProductosAlta />} />
                        <Route path="/producto/editar/:id" element={<ProductosMod />} />
                        <Route path="/estilos/:id" element={<PersonalizacionSitio />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;
