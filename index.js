#!/usr/bin/env node
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const { app, BrowserWindow } = require("electron");
const path = require("path");

function BdsWin() {
    // Create Win
    const win = new BrowserWindow({
        minWidth: 500,
        minHeight: 500,
        icon: path.resolve("./bds_pages/assents/mcpe.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            sandbox: false,
            experimentalFeatures: true,
            preload: path.resolve(__dirname, "preload.js")
        }
    });
    win.loadFile(path.resolve("./bds_pages/default/index.html"));
    win.maximize();
    return win
}

// Open Windows
app.whenReady().then(function () {
    BdsWin();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) BdsWin()
    })
})

// Detect and kill servers
app.on("window-all-closed", function () {app.quit() || process.exit(0)})

// Reopen Windows
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) BdsWin();
});
