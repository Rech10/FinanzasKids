import { useState, useEffect } from "react";
import { motion } from "framer-motion";


function Meta({ monedas, rol }) {

  const [nombreMeta, setNombreMeta] = useState(
    localStorage.getItem("nombreMeta") || ""
  );

  const [cantidadMeta, setCantidadMeta] = useState(
    localStorage.getItem("cantidadMeta") || ""
  );

  const [recompensa, setRecompensa] = useState(
    localStorage.getItem("recompensa") || ""
  );
  const [metas, setMetas] = useState(
  JSON.parse(localStorage.getItem("metas")) || []
  
);
const [metaEliminada, setMetaEliminada] = useState(null);

const [mostrarUndo, setMostrarUndo] = useState(false);

const [confirmacionActiva, setConfirmacionActiva] = useState(false);


  useEffect(() => {

  localStorage.setItem("nombreMeta", nombreMeta);

  localStorage.setItem("cantidadMeta", cantidadMeta);

  localStorage.setItem("recompensa", recompensa);

}, [nombreMeta, cantidadMeta, recompensa]);

    const guardarMeta = () => {

  if (
    nombreMeta.trim() === "" ||
    cantidadMeta.trim() === "" ||
    recompensa.trim() === ""
  ) {
    alert("Completa todos los campos");
    return;
  }

  const nuevaMeta = {
    nombre: nombreMeta,
    cantidad: cantidadMeta,
    recompensa: recompensa
  };

  const nuevasMetas = [...metas, nuevaMeta];

  setMetas(nuevasMetas);

  localStorage.setItem(
    "metas",
    JSON.stringify(nuevasMetas)
  );

  alert("🎯 Meta guardada");
  
  setNombreMeta("");
setCantidadMeta("");
setRecompensa("");

setMostrarFormulario(false);

};
   const eliminarMeta = (indexEliminar) => {

  const confirmar = window.confirm(
    "¿Seguro que deseas eliminar esta meta?"
  );

  if (!confirmar) return;

  setConfirmacionActiva(false);

  setTimeout(() => {

    setConfirmacionActiva(true);

  }, 2000);

  const metaBorrada = metas[indexEliminar];

  setMetaEliminada(metaBorrada);

  const metasActualizadas = metas.filter(
    (_, index) => index !== indexEliminar
  );

  setMetas(metasActualizadas);

  localStorage.setItem(
    "metas",
    JSON.stringify(metasActualizadas)
  );

  setMostrarUndo(true);

  setTimeout(() => {

    setMostrarUndo(false);

  }, 5000);

};
const deshacerEliminar = () => {

  if (!metaEliminada) return;

  const nuevasMetas = [...metas, metaEliminada];

  setMetas(nuevasMetas);

  localStorage.setItem(
    "metas",
    JSON.stringify(nuevasMetas)
  );

  setMostrarUndo(false);

};
useEffect(() => {

  const timer = setTimeout(() => {

    setConfirmacionActiva(true);

  }, 2000);

  return () => clearTimeout(timer);

}, []);

const [mostrarFormulario, setMostrarFormulario] =
useState(false);

  return (

    <div>

      <h2>📋 Mis Metas</h2>

<button
  onClick={() =>
    setMostrarFormulario(!mostrarFormulario)
  }
>
  {mostrarFormulario
    ? "🔼 Ocultar Formulario"
    : "🔽 Crear Nueva Meta"}
</button>

<br /><br />
      {(nombreMeta || cantidadMeta || recompensa) && (

        <div className="mensaje-retorno">

          <h3>
            ¡Bienvenido de nuevo! Continúa creando tu meta 🎯
          </h3>

        </div>

      )}
{mostrarFormulario && (
      <div className="formulario-meta">
        <div className="siguiente-paso">

  <h3>📝 Guía para crear tu meta</h3>

  {!nombreMeta && (
    <p>👉 Paso 1: Escribe el nombre de tu meta</p>
  )}

  {nombreMeta && !cantidadMeta && (
    <p>👉 Paso 2: Agrega la cantidad de monedas</p>
  )}

  {nombreMeta && cantidadMeta && !recompensa && (
    <p>👉 Paso 3: Agrega tu recompensa</p>
  )}

  {nombreMeta && cantidadMeta && recompensa && (
    <p>✅ ¡Todo listo! Ahora guarda tu meta.</p>
  )}

</div>

        <button onClick={guardarMeta}>
        Guardar Meta 🎯
        </button>

        <input
          type="text"
          placeholder="Nombre de la meta"
          value={nombreMeta}
          onChange={(e) => setNombreMeta(e.target.value)}
          className={nombreMeta ? "completado" : ""}
         />

         <input
          type="number"
          placeholder="Cantidad de monedas"
          value={cantidadMeta}
          onChange={(e) => setCantidadMeta(e.target.value)}
          className={cantidadMeta ? "completado" : ""}
         />

         <input
          type="text"
          placeholder="Recompensa deseada"
          value={recompensa}
          onChange={(e) => setRecompensa(e.target.value)}
          className={recompensa ? "completado" : ""}
         />

          </div>
          )}

           


          {rol === "padre" && mostrarUndo && (

        <div className="undo-box">

        <p>
        ✅ Meta eliminada correctamente.
        </p>

        <p>
         ¿Deseas deshacer esta acción?
         </p>

         <button onClick={deshacerEliminar}>
          ↩️ Deshacer
         </button>

         <button onClick={() => setMostrarUndo(false)}>
         ❌ Cerrar
          </button>

  </div>

)}
         

          <h2>📋 Metas Guardadas</h2>

{metas.map((meta, index) => {

  const progresoMeta = Math.min(
    (monedas / Number(meta.cantidad)) * 100,
    100
  );

  return (

    <div key={index} className="meta-card">

      <h3>{meta.nombre}</h3>

      <p>💰 {meta.cantidad} monedas</p>

      <p>🎁 {meta.recompensa}</p>

      <h4>🐷 Progreso de ahorro</h4>

      <progress
        value={progresoMeta}
        max="100"
        style={{
          width: "100%",
          height: "25px"
        }}
      />

      <p>
        {Math.floor(progresoMeta)}% completado
      </p>

      {progresoMeta >= 100 && (

        <motion.h3
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 1
          }}
        >
          🏆 ¡Meta completada!
        </motion.h3>

      )}

      {rol === "padre" && (

        <button
          className="btn-eliminar"
          disabled={!confirmacionActiva}
          onClick={() => eliminarMeta(index)}
        >
          ⚠️ Eliminar ❌
        </button>

      )}

    </div>

  );

})}

    </div>

  );

}

export default Meta;