#!/usr/bin/env node
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
console.log("Starting Bds Maneger");
const bds = require("@the-bds-maneger/core");
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const {resolve, join} = path;

// Load remote
const custom_pagesPath = join(bds.bds_dir, "CustomPages");
if (!(fs.existsSync(custom_pagesPath))) fs.mkdirSync(custom_pagesPath, {recursive: true});

const current_path = resolve(__dirname);
function BdsWin() {
    var page_path;
    
    if (bds.bds_config.bds_pages === "default") page_path = path.join(current_path, "bds_pages", "default");
    else if (bds.bds_config.bds_pages === "new-default") page_path = path.join(current_path, "bds_pages", "new-default");
    else page_path = path.join(custom_pagesPath, bds.bds_config.bds_pages);

    // Config Electron Window
    const config_electron_window = {
        minWidth: 500,
        minHeight: 500,
        icon: path.join(current_path, "bds_pages", "assents", "mcpe.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            sandbox: false,
            experimentalFeatures: true
        }
    };
    // Config and Pages
    const PagesConfig = JSON.parse(fs.readFileSync(join(page_path, "config.json"), "utf8"));
    const load_pages = join(page_path, PagesConfig.index)
    if (PagesConfig.preload) config_electron_window.webPreferences.preload = join(page_path, PagesConfig.preload);
    
    // Create Win
    const win = new BrowserWindow(config_electron_window);
    win.loadFile(load_pages);
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
app.on("window-all-closed", function () {
    if (bds.detect()) bds.kill();
    else app.quit() || process.exit(0)
})

// Reopen Windows
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) BdsWin();
});
