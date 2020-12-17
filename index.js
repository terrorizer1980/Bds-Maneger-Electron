#!/usr/bin/env node
var fs = require("fs");
const electron = require('electron')
const path = require('path')
const { app, BrowserWindow } = require('electron')
if (fs.existsSync('./config.json')) {
  var config_load = JSON.parse(fs.readFileSync('./config.json', "utf-8")).default_pages;
} else {
  let createConfig = async function(){fs.writeFileSync('./config.json', `{\n    \"default_pages\": \"default\",\n    \"config\": {\n        \"Still setting up the settings\": false\n    }\n}`);}
  createConfig();
  var config_load = JSON.parse(fs.readFileSync('./config.json', "utf-8")).default_pages;
};
if (config_load == 'default'){
  let JSONC = fs.readFileSync(`bds_pages/default/config.json`)
  var load_pages = `bds_pages/default/` + JSON.parse(JSONC).index
} else {
  let JSONC = fs.readFileSync(`bds_pages/custom_pages/${config_load}/config.json`)
  var load_pages = `bds_pages/custom_pages/${config_load}/` + JSON.parse(JSONC).index
}
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
function createWindow () {
  const win = new BrowserWindow({
    minWidth: 640,
    minHeight: 640,
    icon: path.join(`${process.cwd()}/bds_pages/assents/mcpe.png`),
    webPreferences: {nodeIntegration: true, contextIsolation: false, enableRemoteModule: true, sandbox: false}
  });
  win.loadFile(`${process.cwd()}/${load_pages}`);
  win.maximize();
}
if (process.platform == 'darwin'){
  console.log('Mac OS system Not supported, consulter https://github.com/Sirherobrine23/Bds_Maneger/wiki/systems-support#a-message-for-mac-os-users')
  app.quit()
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  console.log('Going out ...')
  app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
app.on('before-quit', function () {
  const spawn = require('child_process').spawn
  if (process.platform == 'win32') {
    var killbds = spawn('tasklist /fi "imagename eq bedrock_server.exe" | find /i "bedrock_server.exe" > nul & if not errorlevel 1 (taskkill /f /im "bedrock_server.exe" > nul && exit 0) else (exit 1)', { shell: true })
  } else if (process.platform == 'linux') {
    // kill $(ps aux | grep '[p]ython csp_build.py' | awk '{print $2}') https://stackoverflow.com/questions/3510673/find-and-kill-a-process-in-one-line-using-bash-and-regex
    var killbds = spawn('kill $(ps aux | grep \'[b]edrock_server\' | awk \'{print $2}\')', { shell: true })
  }
  killbds.stdout.on('data', function (data) {
    console.log('kill all bds servers')
  })
  killbds.on('exit', function (code) {
    if (code == 0) {
      console.log('all bds maneger is kill')
    } else {
      console.log('There was one to kill the Minecraft Bedrock Servers')
    }
  })
})
