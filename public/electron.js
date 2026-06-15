const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {

  console.log("Electron iniciado");

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true
  });

  win.webContents.openDevTools();

  const ruta = path.join(
    __dirname,
    "build",
    "index.html"
  );

  console.log("Ruta:", ruta);

  win.loadFile(ruta);

}

app.whenReady().then(createWindow);