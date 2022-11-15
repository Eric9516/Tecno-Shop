import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Registro from "./Pages/Registro";
import Login from "./Pages/Login";
import NavBar from "./Components/NavBar";
import Producto from "./Pages/Producto";
import ProductosAlta from "./Pages/ProductosAlta";

const estilos = {
    app: {
        display: "flex",
    },
};
function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/producto/:id" element={<Producto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/productos/alta" element={<ProductosAlta />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
