function Dashboard({ monedas }) {

  return (

  <div>

    <h2>🪙 Información Importante</h2>

    <div className="info-box">

      <div className="monedas-container">

        <div className="moneda">🪙</div>
        <div className="moneda">🪙</div>
        <div className="moneda">🪙</div>

      </div>

      <h3>Saldo Actual</h3>

      <h1 className="saldo">{monedas}</h1>
       
      <p>Monedas</p>
     <p>👉 Usa el botón Ahorrar para llenar tu alcancía 🐷
       </p>
    </div>

  </div>

);

}

export default Dashboard;