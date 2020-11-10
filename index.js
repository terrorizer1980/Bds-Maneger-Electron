process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const electron = require('electron')
var path = require('path')
const { app, BrowserWindow } = require('electron')
function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 620,
    icon: path.join(__dirname, 'pages/assents/mcpe.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false
    }
  })
  win.loadFile('pages/index.html');
  win.on('close', function(e) {const choice = require('electron').dialog.showMessageBoxSync(this,{type: 'question', buttons: ['Yes', 'No'], title: 'Confirm', message: 'Did you stop the server?' });
    if (choice === 1) {
      e.preventDefault();
    }
  });
}
function notfoundFolder() {
  // Cria uma janela de navegação de erro.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 600,
    icon: path.join(__dirname, 'pages/assents/mcpe.png'),
    webPreferences: {
      sandbox: true
    }
  })
  win.loadFile('pages_erro/notfoundFolder.html')
}
function archnotamd64() {
  // Cria uma janela de navegação de erro.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 600,
    icon: path.join(__dirname, 'pages/assents/mcpe.png'),
    webPreferences: {
      sandbox: true
    }
  })
  win.loadFile('pages_erro/notamd.html');
}
var ch1 = require('child_process'); var codet = ch1.execSync('IF EXIST "C:/mcpe/" ( IF EXIST "c:/mcpe/bedrock_server.exe" ( exit 0 ) ELSE ( exit 1 ) ) ELSE ( exit 1 )');
var ch2 = require('child_process'); var archst = ch2.execSync('@echo off & if %PROCESSOR_ARCHITECTURE%==AMD64 ( exit 0 ) else ( exit 1 )');
if (codet == 0){
  if (archst == 0) {
    app.whenReady().then(createWindow);
  } else {
    app.whenReady().then(archnotamd64);
  }    
} else {
  app.whenReady().then(notfoundFolder);
}

// app.quit();
//  app.whenReady().then(createWindow)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
// App close handler
app.on('before-quit', function() {
  var exec = require('child_process').exec;
  var child = exec('FOR /F "usebackq tokens=2" %i% IN (`tasklist ^| findstr /r /b "bedrock_server*[.]exe"`) DO taskkill /pid /F %i%', {
      detached: false,
      shell: true
  });
  child.stdout.on('data', function (data) {
      console.log('kill all bds servers')
  });
});
