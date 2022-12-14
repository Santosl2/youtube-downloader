// ./public/electron.js
const path = require("path");

const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");

require("./lib/server.cjs");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 435,
    height: 575,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "./icon.png"),
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }

  globalShortcut.register("Control+Shift+I", () => {
    // When the user presses Ctrl + Shift + I, this function will get called
    // You can modify this function to do other things, but if you just want
    // to disable the shortcut, you can just return false
    return false;
  });
});
