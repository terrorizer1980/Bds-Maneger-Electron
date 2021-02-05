#!/usr/bin/env node
const bds = require('bds_maneger_api')
const {app, BrowserWindow } = require('electron');
var fs = require("fs");
const path = require('path')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
function createWindow () {
  // Load Pages
  const bds_maneger_config = path.join(bds.bds_dir, "bds_maneger-config.json")
  if (fs.existsSync(bds_maneger_config)) {
    var config_load = JSON.parse(fs.readFileSync(bds_maneger_config, "utf-8")).default_pages;
  } else {
  var default_config = `{"default_pages": "default",\n  "config": {\n    "Still setting up the settings": false\n  }\n}`
    fs.writeFileSync(bds_maneger_config, default_config);
    var config_load = JSON.parse(default_config).default_pages;
  };
  if (config_load == 'default'){
    let JSONC = JSON.parse(fs.readFileSync(`bds_pages/default/config.json`)).index
    var load_pages = path.join(process.cwd(), 'bds_pages', 'default', JSONC)
  } else {
    var JSONC = JSON.parse(fs.readFileSync(`bds_pages/custom_pages/${config_load}/config.json`)).index
    var load_pages = path.join(process.cwd(), 'bds_pages', 'custom_pages', config_load, JSONC)
  }
  // Load Pages
  const win = new BrowserWindow({
    minWidth: 500,
    minHeight: 500,
    icon: path.join(process.cwd(), "bds_pages", "assents", "mcpe.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      experimentalFeatures: true,
      preload: path.join(process.cwd(), 'preload.js')
    }
  });
  win.loadFile(load_pages);  
  if (!(process.env.ELECTRON_TEST.includes("true"))) {win.maximize();}
}
/* if (process.platform == 'darwin'){
  console.log('Mac OS system Not supported, consulter https://Bds-Maneger/Bds-Maneger/wiki/systems-support#a-message-for-mac-os-users')
  require('electron').shell.openExternal("https://Bds-Maneger/Bds-Maneger/wiki/systems-support#a-message-for-mac-os-users")
  app.quit()
} */
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch(() => {
  console.warn(`Error opening a Bds Maneger window Exiting with eror 12`)
  process.exit(12)
})
app.on('window-all-closed', () => {
  console.log(`Deteting bds Server is reuning`)
  if (bds.detect()){
    bds.kill();
    console.log(`Sonic?`);
  } else
    console.log('Tails?')
    console.log('Going out ...')
    app.quit()
})
app.on('activate', () => {if (BrowserWindow.getAllWindows().length === 0) {createWindow()}});