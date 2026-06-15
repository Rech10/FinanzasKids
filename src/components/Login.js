import { useState } from "react";

function Login({ setUsuario, rol })  {

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  console.log("Rol recibido:", rol);
  const iniciarSesion = () => {

  // 👦 Niño
  if (rol === "nino") {

    if (nombre.trim() !== "") {
      setUsuario(nombre);
    } else {
      alert("Escribe tu nombre");
    }

    return;
  }

  // 👨‍👩‍👧 Padre

  const usuarioGuardado =
    localStorage.getItem("usuarioPadre");

  const passwordGuardada =
    localStorage.getItem("passwordPadre");

  // Primera vez: crear cuenta
  if (!usuarioGuardado) {

    if (
      nombre.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Completa todos los campos");
      return;
    }

    localStorage.setItem(
      "usuarioPadre",
      nombre
    );

    localStorage.setItem(
      "passwordPadre",
      password
    );

    alert(
      "Cuenta de padre creada correctamente"
    );

    setUsuario(nombre);

    return;
  }

  // Iniciar sesión

  if (
    nombre === usuarioGuardado &&
    password === passwordGuardada
  ) {

    setUsuario(nombre);

  } else {

    alert(
      "Usuario o contraseña incorrectos"
    );

  }

};

  return (

    <div>

      <h2>🔐 Iniciar Sesión</h2>

      <input
  type="text"
  placeholder="Escribe tu nombre"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>

{rol === "padre" && (

  <>

    <br /><br />

    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

  </>

)}

<br />

<button onClick={iniciarSesion}>
  Entrar 🎮
</button>
    </div>

  );

}

export default Login;