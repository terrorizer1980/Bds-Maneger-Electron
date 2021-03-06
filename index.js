#!/usr/bin/env node
const bds = require("@the-bds-maneger/bds_maneger_api")
const {app, BrowserWindow } = require("electron");
// const { BrowserWindow } = require('@electron/remote')
var fs = require("fs");
const path = require("path")

require("@electron/remote/main").initialize()

const cwds = path.join(process.cwd(), "package.json")
var current_path
if (fs.existsSync(cwds))
  current_path = process.cwd()
else
  current_path = path.resolve(".", "resources", "app")
  console.log(`Current dire: ${__dirname}, process: ${process.cwd()}, ${current_path}`)

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true"
function createWindow () {
  // Load Pages
  const bds_maneger_config = path.join(bds.bds_dir, "bds_maneger-config.json")
  var config_load
  if (fs.existsSync(bds_maneger_config)) {
    config_load = JSON.parse(fs.readFileSync(bds_maneger_config, "utf-8")).default_pages;
  } else {
  var default_config = "{\"default_pages\": \"default\",\n  \"config\": {\n    \"Still setting up the settings\": false\n  }\n}"
    fs.writeFileSync(bds_maneger_config, default_config);
    config_load = JSON.parse(default_config).default_pages;
  }
  var load_pages
  if (config_load === "default"){
    let page_index = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "default", "config.json"))).index
    load_pages = path.join(current_path, "bds_pages", "default", page_index)
  } else {
    var page_index = JSON.parse(fs.readFileSync(path.join(current_path, "bds_pages", "custom_pages", config_load, "config.json"))).index
    load_pages = path.join(current_path, "bds_pages", "custom_pages", config_load, page_index)
  }
  // Load Pages
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
app.whenReady().then(() => {
  createWindow()
  app.on("activate", function () {if (BrowserWindow.getAllWindows().length === 0) createWindow()})
})
app.on("window-all-closed", () => {
  console.log("Deteting bds Server is reuning")
  if (bds.detect()){
    bds.kill();
    console.log("Sonic?");
  } else
    console.log("Tails?")
    console.log("Going out ...")
    app.quit()
    process.exit(0)
})
app.on("activate", () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});