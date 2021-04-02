#!/usr/bin/env node
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
const bds = require("@the-bds-maneger/core")
const {app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path")
const {resolve} = require("path")
require("@electron/remote/main").initialize()

var current_path = resolve(__dirname)
const bds_maneger_config = path.join(bds.bds_dir, "bds_config.json")

// Load Bds Maneger config
var config_load
if (fs.existsSync(bds_maneger_config)) config_load = JSON.parse(fs.readFileSync(bds_maneger_config, "utf-8")).bds_pages;
else config_load = "default";

function createWindow () {
  var load_pages
  if (config_load === "default") load_pages = path.join(current_path, "bds_pages", "default", JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "default", "config.json"))).index)
  else {
    if (fs.existsSync(load_pages = path.join(current_path, "bds_pages", "custom_pages", config_load, JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "custom_pages", config_load, "config.json"))).index))) load_pages = path.join(current_path, "bds_pages", "custom_pages", config_load, JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "custom_pages", config_load, "config.json"))).index)
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
  win.loadFile(load_pages);
  win.maximize();
}
app.whenReady().then(function () {createWindow();app.on("activate", function () {if (BrowserWindow.getAllWindows().length === 0) createWindow()})})
app.on("window-all-closed", function () {
  if (bds.detect()) bds.kill();
  else app.quit()||process.exit(0)
})
app.on("activate", () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});
