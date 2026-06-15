import { useState, useEffect } from "react";

function Tienda({ monedas, setMonedas }) {

  const [productos, setProductos] = useState([]);

  useEffect(() => {

    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];

    setProductos(productosGuardados);

  }, []);

  const comprar = (producto) => {

    if (monedas >= producto.precio) {

      setMonedas(monedas - producto.precio);

      alert(
        `Compraste ${producto.nombre} 🎁`
      );

    } else {

      alert("No te alcanza");

    }

  };

  return (

    <div>

      <h3>🛒 Tienda</h3>

      {productos.length === 0 && (
        <p>No hay productos disponibles</p>
      )}

      {productos.map((producto, index) => (

        <div key={index}>

          <p>
            {producto.nombre} - 💰 {producto.precio}
          </p>

          <button
            onClick={() => comprar(producto)}
          >
            Comprar
          </button>

          <hr />

        </div>

      ))}

    </div>

  );

}

export default Tienda;