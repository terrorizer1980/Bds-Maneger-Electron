#!/usr/bin/env node
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const bds = require("@the-bds-maneger/core");
const { exec, execSync } = require("child_process");
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const {resolve, join} = require("path");

// Load remote
require("@electron/remote/main").initialize();

var current_path = resolve(__dirname)

function createWindow () {
    var PagesConfig, load_pages;
    if (bds.bds_config.bds_pages === "default") PagesConfig = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "default", "config.json")))
    else {
        let configFile = join(current_path, "bds_pages", "custom_pages", bds.bds_config.bds_pages, "config.json")
        
        if (fs.existsSync(configFile)) PagesConfig = JSON.parse(fs.readFileSync(configFile, "utf8")); else PagesConfig = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "erro", "config.json"), "utf8"));
    }

    const pageLoadDir = path.join(current_path, "bds_pages", "custom_pages", bds.bds_config.bds_pages);
    // Load index file
    if (bds.bds_config.bds_pages === "default") load_pages = path.join(current_path, "bds_pages", "default", PagesConfig.index)
    else {
        if (fs.existsSync(pageLoadDir)) {
            if (PagesConfig.react) {
                execSync("npm install --no-save", {cwd: pageLoadDir})
                const logreact = exec("npm start", {cwd: pageLoadDir})
                logreact.stdout.pipe(fs.WriteStream(resolve(bds.bds_dir, "log", "Bds Maneger React Log.log")))
                load_pages = PagesConfig.index
            } else load_pages = join(pageLoadDir, PagesConfig.index)
        } else load_pages = path.join(current_path, "bds_pages", "erro", JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "erro", "config.json"))).index)
    }
    // Config Electron Window
    const win = new BrowserWindow({
        minWidth: 500,
        minHeight: 500,
        icon: path.join(current_path, "bds_pages", "assents", "mcpe.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            sandbox: false,
            experimentalFeatures: true,
            preload: path.join(current_path, "preload.js")
        }
    });
    if (PagesConfig.react) win.loadURL(load_pages); else win.loadFile(load_pages);
    win.maximize();
    return win
}

// Open Windows
app.whenReady().then(function () {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Detect and kill servers
app.on("window-all-closed", function () {
    if (bds.detect()) bds.kill();
    else app.quit()||process.exit(0)
})

// Reopen Windows
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
