import { motion } from "framer-motion";
import React, { useState } from "react";


function Juego({ monedas, setMonedas }) {
  const [mostrarMoneda, setMostrarMoneda] =
useState(false);
  const limiteDiario =
  Number(localStorage.getItem("limiteDiario")) || 100;

const ganadoHoy =
  Number(localStorage.getItem("ganadoHoy")) || 0;
  const hoy = new Date().toLocaleDateString();

const fechaGuardada =
  localStorage.getItem("fechaMonedas");
  if (fechaGuardada !== hoy) {

  localStorage.setItem("fechaMonedas", hoy);

  localStorage.setItem("ganadoHoy", 0);

}

  const ahorrar = () => {

  if (ganadoHoy >= limiteDiario) {

    alert(
      "⚠️ Has alcanzado el límite diario de monedas"
    );

    return;

  }
  setMostrarMoneda(true);

setTimeout(() => {
  setMostrarMoneda(false);
}, 1000);

  setMonedas(monedas + 10);

  localStorage.setItem(
    "ganadoHoy",
    ganadoHoy + 10
  );
  alert("💰 Has ahorrado 10 monedas");

};
const [mensaje, setMensaje] = useState("");

const [ultimoCambio, setUltimoCambio] = useState(0);

  const gastar = () => {

  const confirmar = window.confirm(
    "¿Seguro que deseas gastar tus monedas?"
  );

  if (!confirmar) return;

  if (monedas >= 10) {

    setMonedas(monedas - 10);

    setUltimoCambio(-10);

    setMensaje("⚠️ Gastaste 10 monedas");

    setTimeout(() => {

      setMensaje("");

    }, 3000);

  } else {

    setMensaje("❌ No tienes suficientes monedas");

    setTimeout(() => {

      setMensaje("");

    }, 3000);

  }

  };
   const deshacerCambio = () => {

  setMonedas(monedas - ultimoCambio);

  setMensaje("↩️ Acción deshecha");

  setTimeout(() => {

    setMensaje("");

  }, 3000);

  };
  
  return (

  <div>
    {mensaje && (

  <div className="mensaje-feedback">

    <p>{mensaje}</p>

    <button onClick={deshacerCambio}>
      ↩️ Deshacer
    </button>

   </div>

   )}

    <h2>💰 Acciones Financieras</h2>

    <div className="acciones-centro">

      <motion.button
          className="btn-ahorrar"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           onClick={ahorrar}
      >
         Ahorrar 💰
         </motion.button>
         <div className="limite-box">

  <h4>📊 Progreso Diario</h4>

  <p>
    💰 {ganadoHoy} de {limiteDiario} monedas
  </p>

  <progress
    value={ganadoHoy}
    max={limiteDiario}
  ></progress>

</div>

      <motion.button
       className="btn-gastar"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={gastar}
      >
        Gastar 🛒
      </motion.button>

    </div>
    {mostrarMoneda && (

  <div className="moneda-flotante">
    💰 +10
  </div>

)}

  </div>

);

}

export default Juego;