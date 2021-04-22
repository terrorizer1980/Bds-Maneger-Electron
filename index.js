#!/usr/bin/env node
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
const bds = require("@the-bds-maneger/core");
const { exec, execSync } = require("child_process");
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path")
const {resolve, join} = require("path")
require("@electron/remote/main").initialize()

var current_path = resolve(__dirname)
const bds_maneger_config = path.join(bds.bds_dir, "bds_config.json")

// Load Bds Maneger config
var config_load
if (fs.existsSync(bds_maneger_config)) config_load = bds.bds_config.bds_pages; else config_load = "default";

function createWindow () {
  var load_config
  if (config_load === "default") load_config = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "default", "config.json")))
  else {
    let configFile = join(current_path, "bds_pages", "custom_pages", config_load, "config.json")
    if (fs.existsSync(configFile)) load_config = JSON.parse(fs.readFileSync(configFile, "utf8"))
    else load_config = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "erro", "config.json"), "utf8"));
  }
  
  var load_pages, pageLoadDir = path.join(current_path, "bds_pages", "custom_pages", config_load);
  if (config_load === "default") load_pages = path.join(current_path, "bds_pages", "default", load_config.index)
  else {
    if (fs.existsSync(pageLoadDir)) {
      if (load_config.react) {
        execSync("npm install --no-save", {cwd: pageLoadDir})
        const logreact = exec("npm start", {cwd: pageLoadDir})
        logreact.stdout.pipe(fs.WriteStream(resolve(bds.bds_dir, "log", "Bds Maneger React Log.log")))
        load_pages = load_config.index
      }
      else load_pages = join(pageLoadDir, load_config.index)

    }
    else load_pages = path.join(current_path, "bds_pages", "erro", JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "erro", "config.json"))).index)
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
  if (load_config.react) win.loadURL(load_pages);
  else win.loadFile(load_pages);
  win.maximize();
}
app.whenReady().then(function () {createWindow();app.on("activate", function () {if (BrowserWindow.getAllWindows().length === 0) createWindow()})})
app.on("window-all-closed", function () {
  if (bds.detect()) bds.kill();
  else app.quit()||process.exit(0)
})
app.on("activate", () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});
