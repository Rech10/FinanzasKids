import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Juego from "./Juego";
import { motion } from "framer-motion";
import Meta from "./Meta";

function PanelPadres({ monedas, setMonedas }) {

  const [seccion, setSeccion] = useState("inicio");
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [productos, setProductos] = useState([]);
  const [limiteDiario, setLimiteDiario] = useState(
  localStorage.getItem("limiteDiario") || 100
);
  useEffect(() => {

  const productosGuardados =
    JSON.parse(localStorage.getItem("productos")) || [];

  setProductos(productosGuardados);

}, []);

const agregarProducto = () => {

  if (
    nombreProducto.trim() === "" ||
    precioProducto === ""
  ) {
    alert("Completa todos los campos");
    return;
  }

  const nuevosProductos = [

    ...productos,

    {
      nombre: nombreProducto,
      precio: Number(precioProducto)
    }

  ];

  setProductos(nuevosProductos);

  localStorage.setItem(
    "productos",
    JSON.stringify(nuevosProductos)
  );

  setNombreProducto("");
  setPrecioProducto("");

};

const eliminarProducto = (index) => {

  const nuevosProductos =
    productos.filter((_, i) => i !== index);

  setProductos(nuevosProductos);

  localStorage.setItem(
    "productos",
    JSON.stringify(nuevosProductos)
  );

};
const guardarLimite = () => {

  localStorage.setItem(
    "limiteDiario",
    limiteDiario
  );

  alert("Límite guardado correctamente ✅");

};

  return (

    <div>

      <h2>👨‍👩‍👧 Panel de Padres</h2>

      <div className="nav-menu">

  <button onClick={() => setSeccion("inicio")}>
    🏠 Inicio
  </button>

  <button onClick={() => setSeccion("tienda")}>
    📦 Tienda
  </button>

  <button onClick={() => setSeccion("limite")}>
    💰 Límite
  </button>

  <button onClick={() => setSeccion("metas")}>
    🎯 Metas
  </button>

</div>

<hr />
{seccion === "inicio" && (

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

      <hr />

      {seccion === "tienda" && (

  <div>

    <h3>📦 Administración de Tienda</h3>

    <input
      type="text"
      placeholder="Nombre del producto"
      value={nombreProducto}
      onChange={(e) =>
        setNombreProducto(e.target.value)
      }
    />

    <br /><br />

    <input
      type="number"
      placeholder="Precio"
      value={precioProducto}
      onChange={(e) =>
        setPrecioProducto(e.target.value)
      }
    />

    <br /><br />

    <button onClick={agregarProducto}>
      ➕ Agregar Producto
    </button>

    <hr />

    {productos.map((producto, index) => (

      <div key={index}>

        <p>
          {producto.nombre} - 💰 {producto.precio}
        </p>

        <button
          onClick={() => eliminarProducto(index)}
        >
          🗑 Eliminar
        </button>

        <hr />

      </div>

    ))}

  </div>

)}

      {seccion === "limite" && (

  <div>

    <h3>💰 Configurar Límite Diario</h3>

    <p>
      Máximo de monedas que el niño puede ganar por día.
    </p>

    <input
      type="number"
      value={limiteDiario}
      onChange={(e) =>
        setLimiteDiario(e.target.value)
      }
    />

    <br /><br />

    <button onClick={guardarLimite}>
      Guardar Límite
    </button>

    <p>
      Límite actual: {limiteDiario} monedas
    </p>

  </div>

)}

      {seccion === "metas" && (

  <div>

    <h3>🎯 Metas del Niño</h3>

    <Meta
      monedas={monedas}
      rol="padre"
    />

  </div>

)}
    </div>

  );

}

export default PanelPadres;