#!/usr/bin/env node
var fs = require("fs");
if (fs.existsSync('./config.json')) {
  var config_load = JSON.parse(fs.readFileSync('./config.json', "utf-8")).default_pages;
} else {
  var config_load = 'default'
}
if (config_load == 'default'){
  var load_pages = 'bds_pages/index.html'
} else {
  var load_pages = `bds_pages/custom_pages/${config_load}/index.html`
}
// const { autoUpdater } = require('electron-updater');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
const electron = require('electron')
const path = require('path')
const { app, BrowserWindow } = require('electron')
function createWindow () {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 620,
    icon: path.join(`${process.cwd()}/bds_pages/assents/mcpe.png`),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false
    }
  });
  console.log('Dir: '+process.cwd())
  console.log(`Pages Load: ${process.cwd()}/${load_pages}`)
  win.loadFile(`${process.cwd()}/${load_pages}`)
  win.on('close', function (e) {
    const choice = require('electron').dialog.showMessageBoxSync(this, { type: 'question', buttons: ['Yes', 'No'], title: 'Confirm', message: 'Did you stop the server?' })
    if (choice === 1) {
      e.preventDefault()
    }
  })
}
if (process.platform == 'darwin'){
  console.log('Mac OS system Not supported, consulter https://github.com/Sirherobrine23/Bds_Maneger/wiki/systems-support#a-message-for-mac-os-users')
  app.quit()
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
app.on('before-quit', function () {
  const exec = require('child_process').exec
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
