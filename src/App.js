import { useState, useEffect } from "react";

import "./App.css";

import Dashboard from "./components/Dashboard";
import Juego from "./components/Juego";
import Tienda from "./components/Tienda";
import Meta from "./components/Meta";
import Login from "./components/Login";
import { motion } from "framer-motion";
import PanelPadres from "./components/PanelPadres";


function App() {
  const usuarioGuardado = localStorage.getItem("usuario");
  const monedasGuardadas = localStorage.getItem("monedas");

  const [monedas, setMonedas] = useState(
  monedasGuardadas ? Number(monedasGuardadas) : 50
  );

  const [usuario, setUsuario] = useState(
  usuarioGuardado || ""
 );
  const [pagina, setPagina] = useState("inicio");
  const [rol, setRol] = useState(
  localStorage.getItem("rol") || ""
  );
  const [padreRegistrado, setPadreRegistrado] = useState(
  localStorage.getItem("usuarioPadre") ? true : false
);
  const [limiteDiario, setLimiteDiario] = useState(
  localStorage.getItem("limiteDiario") || 100
);
   useEffect(() => {

  localStorage.setItem("usuario", usuario);
  localStorage.setItem("monedas", monedas);
  localStorage.setItem("rol", rol);

}, [usuario, monedas, rol]);

  
  const cerrarSesion = () => {

  localStorage.removeItem("usuario");
  localStorage.removeItem("rol");

  setUsuario("");
  setRol("");

};

if (!rol) {

  return (

    <div className="container">

      <h1>FinanzasKids 💰</h1>

      <h2>¿Quién usará la aplicación?</h2>

      <button onClick={() => {
        setRol("nino");
        setUsuario("");
      }}>
        👦 Niño
      </button>

      <button onClick={() => {
        setRol("padre");
        setUsuario("");
      }}>
        👨‍👩‍👧 Padre/Madre
      </button>

    </div>

  );

} 
if (!usuario) {

  return (

    <div className="container">

      <div className="card">

        <h3>
          Rol seleccionado:
          {rol === "nino"
            ? " 👦 Niño"
            : " 👨‍👩‍👧 Padre/Madre"}
        </h3>

        <button
  className="btn-regresar"
  onClick={() => setRol("")}
>
  ⬅️ Cambiar Rol
</button>

        <br /><br />

        <Login
          setUsuario={setUsuario}
          rol={rol}
        />

      </div>

    </div>

  );

}

return (

  <div className="container">

    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Bienvenido {usuario} 🎮
    </motion.h1>

    <button onClick={cerrarSesion}>
      Cerrar Sesión 🚪
    </button>

    {rol === "nino" && (

  <div className="nav-menu">

    <h2>📌 Navegación Principal</h2>

    <button onClick={() => setPagina("inicio")}>
      🏠 Inicio
    </button>

    <button onClick={() => setPagina("tienda")}>
      🛒 Tienda
    </button>

    <button onClick={() => setPagina("metas")}>
      🐷 Alcancía
    </button>

  </div>

   )}
    {rol === "padre" && (
    <PanelPadres
  monedas={monedas}
  setMonedas={setMonedas}
/>
    )}

    {rol === "nino" && (

  <>

    {pagina === "inicio" && (

      <>
        <motion.div
          className="card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Dashboard monedas={monedas} />
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Juego
            monedas={monedas}
            setMonedas={setMonedas}
          />
        </motion.div>
      </>

    )}

    {pagina === "tienda" && (

      <motion.div
        className="card"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <Tienda
          monedas={monedas}
          setMonedas={setMonedas}
        />
      </motion.div>

    )}

    {pagina === "metas" && (

      <motion.div
        className="card"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        <Meta
           monedas={monedas}
           rol={rol}
        />
      </motion.div>

    )}

  </>

)}

   </div>

);

}

export default App;