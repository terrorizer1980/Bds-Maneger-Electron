// Core Script
// This is the script that manages and sends commands to the server (This is the script that manages and sends commands to the server (a bridge as we can call).
// it will serve to communicate to and start the server. and it is a mandatory item for bds_maneger to work.
  
function startServer() {
    document.getElementById('startButtom').removeAttribute('onclick');
    document.getElementById('StopButtom').setAttribute('onclick', 'stopserver();')
    var inject = document.createElement("iframe");
    inject.id = 'serveinjectstart';
    document.getElementById('scr').appendChild(inject);
    // 
    var scripts = document.createElement("script");
    scripts.src = 'assents/js/start.js';
    scripts.id = 'ServerStarted';
    document.getElementById('serveinjectstart').appendChild(scripts);
}
function stopserver(){
    document.getElementById('startButtom').setAttribute('onclick','startServer();');
    document.getElementById('StopButtom').removeAttribute('onclick');
    serverstated.stdin.write('stop\n');
    localStorage.setItem('bds_status', 'stoped');
    document.getElementById("cmds").setAttribute('disabled','')
    document.getElementById("comsen").setAttribute('disabled','')
    document.getElementById('serveinjectstart').remove();
    return '0'
}
function restartServer(){
    stopserver();
    startServer();
}
function worldbackup(){
    var status = localStorage.getItem('bds_status');
    if (status == 'started'){
        stopserver();
    }
    if (status == 'stoped'){
        var today = new Date();var dd = String(today.getDate()).padStart(2, '0');var mm = String(today.getMonth() + 1).padStart(2, '0');var yyyy = today.getFullYear();var hour = today.getHours();var minu = today.getMinutes()
        today = `${yyyy}_${mm}-${dd}@@${minu}-${hour}`;
        var exec = require('child_process').exec;
        if (process.platform == 'win32'){
            var serverstated = exec(`cd ${__dirname}/../bds/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in desktop'
        } else if (process.platform == 'linux'){
            var serverstated = exec(`cd ${__dirname}/../bds/worlds/ && tar -czf ~/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in home dir'
        }        
        serverstated.on('exit', function (code) {
            if (code == 0){
                alert(`${mensagemBackup}, with name: bds_backup_World_${today}.tar.gz`);
            } else {
                alert('erro to create backup');
            }
        });
    } else {
        if (confirm('Voçê quer tentar de novo')){
            worldbackup();
        }
    }
};
function checkedBox(){
    // var getAutostart = document.getElementById('autostart').checked
    if (document.getElementById('autostart').checked){
        localStorage.setItem('autostartBds', '1');
        localStorage.setItem('autostartBds', '1');
        localStorage.setItem('autostartBds', '1');
    } else {
        localStorage.setItem('autostartBds', '0');
        localStorage.setItem('autostartBds', '0');
        localStorage.setItem('autostartBds', '0');
    }
}

if (localStorage.getItem('autostartBds') == 1){
    startServer();
    console.log('Auto Start')
    document.getElementById('autostart').setAttribute('checked', 'true');
} else {
    console.log('Not auto start Bds');
    document.getElementById('autostart').removeAttribute('checked');
}


function log_download() {
    var type = 'text/plain'
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const filename = today +'-Log-gui.txt'
    var datavalue = document.getElementById('LOG').value;
    var commandssave = document.getElementById('commandsends').value;
    var blank = ''
    if (datavalue == blank){
        alert('Blank Log')
    } else {
        var file = new Blob([datavalue, '\n', '--------- commands ---------\n', '\n', commandssave], {type: type});
        var a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.getElementById("scr").appendChild(a);
        console.log(url)
        a.click();
    }
}

function auto_resize(){
    var he = window.innerHeight - 150;
    var wi = window.innerWidth - 115;
    var clsa = ('height:'+ he + 'px;'+'width:'+ wi +'px;')
    document.getElementById('LOG').setAttribute("style", clsa); 
}
function resizecommands(){
    var wi = window.innerWidth * 30 / 90;
    var clsa = ('width:'+ wi +'px;')
    document.getElementById('commandsends').setAttribute("style", clsa);
}
setInterval(function(){
    auto_resize();
    resizecommands();
}, 0);


function sendcomand() {
    document.getElementById('comsen').setAttribute('disabled','')
    var blank = '';
    var command = document.getElementById('cmds').value
    if (command == 'stop'){
        alert('Use Stop in options');
        var command = document.getElementById('cmds').value
    } else {
        if (command == blank) {
            document.getElementById('comsen').removeAttribute('disabled')
            alert('command is blank')
        } else {
            document.getElementById('comsen').removeAttribute('disabled')
            document.getElementById('cmds').value = ''
            document.getElementById("commandsends").value += 'Command Send: '+command+'\n'
            serverstated.stdin.write(command+'\n');
        };
    };
};
function sendco(ele) {
    if(event.keyCode == 13) {
        document.getElementById("comsen").click();
    }
}

// ----------------------------
// Check App Version
fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/stable/package.json').then(response => response.text()).then(dataURLv => {
    var JSONvv = JSON.parse(dataURLv);
    localStorage.setItem('bds_gitv', JSONvv.version);
    localStorage.setItem('bds_gitv', JSONvv.version);
    localStorage.setItem('bds_gitv', JSONvv.version);
    // 
    var localV = require('electron').remote.app.getVersion();
    const check_latest_version = JSONvv.version >= localV;
        if (check_latest_version){
            console.log('Voçê está na ultima versão')
        } else {
            var pTag = document.createElement("p");
            pTag.id = 'update_app';
            document.getElementById('before_get_update').appendChild(pTag);
            // before_get_update
            var app_update_stable = document.createElement("a");
            app_update_stable.href = localStorage.getItem('url_update');
            app_update_stable.innerHTML = 'Bds Maneger Update Version: '+JSONvv.version;
            app_update_stable.id = 'update_app_download';
            document.getElementById('update_app').appendChild(app_update_stable);
            // console.log('as')
        }
    }
);
// ----------------------------

fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const serverV = obj2.latest;
        const serverVurl = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + serverV + '.zip'
        localStorage.setItem('bds_server_latestV', serverV)
        localStorage.setItem('bds_server_url', serverVurl)
        localStorage.setItem('bds_server_latestV', serverV)
        localStorage.setItem('bds_server_url', serverVurl)
    }
);


fetch('https://api.github.com/repos/Sirherobrine23/Bds_Maneger-for-Windows/releases').then(response => response.text()).then(releaseMSI => {
    const obj3 = JSON.parse(releaseMSI);
     const download_url = obj3[0].assets[1].browser_download_url
     localStorage.setItem('url_update', download_url);
     localStorage.setItem('url_update', download_url);
     localStorage.setItem('url_update', download_url);
    }
);

fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const serverV = obj2.latest;
        const serverVurl = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + serverV + '.zip'
        localStorage.setItem('bds_server_latestV', serverV)
        localStorage.setItem('bds_server_url', serverVurl)
    }
);

// -------------------------------------------------------------------------------------
// Telegram Bot
var blank = ''
const TelegramBot = require('node-telegram-bot-api');
// const token = require(`${__dirname}/token.txt`)
var fs = require("fs");
var token = fs.readFileSync(`${__dirname}/../token.txt`, "utf-8");
const bot = new TelegramBot(token, {polling: true});
// Bds Service Control
bot.onText(/\/bds (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var t1 = match[1];
  
  if (process.platform == 'linux'){
      var more = 'Linux System'
  } else if (process.platform == 'win32'){
      var more = 'Windows System'
  }

  if (t1 == 'start'){
      if (localStorage.getItem('bds_status') == 'started'){
        bot.sendMessage(chatId, `Server Is reuning now`);
      } else {
        console.log('Stating')
        localStorage.setItem('teste', 'start')
        bot.sendMessage(chatId, `Stating server`);
        bot.sendMessage(chatId, ` You server files is to ${__dirname}/../bds, Reuning in ${more}`);
        startServer();
      }      
  } else if (t1 == 'stop'){
    if (localStorage.getItem('bds_status') == 'started'){
        localStorage.setItem('teste', 'stop')
        console.log('stopping')
        bot.sendMessage(chatId, `Stoping server`);
        stopserver();
        bot.sendMessage(chatId, `Log`);
        bot.sendMessage(chatId, `${document.getElementById("LOG").innerHTML}`);
    } else {
        bot.sendMessage(chatId, `You Server Is Stoped`);
    }
  } else if (t1 == 'restart'){
      console.log('Restating')
      bot.sendMessage(chatId, `Restating server`);
      restartServer();
  } else if (t1 == 'status'){
    console.log('Requiset status')
    bot.sendMessage(chatId, `Server status is : ${localStorage.getItem('bds_status')}`);
  } else if (t1 == 'log') {
    bot.sendMessage(chatId, `Geting you log`);
    bot.sendMessage(chatId, `Wait ...`);
    bot.sendMessage(chatId, `${document.getElementById('LOG').innerHTML}`);
  } else {
    bot.sendMessage(chatId, `use: start, stop, restart, status and log; ${t1} is not command.`);
  }
});


// Send Comand
bot.onText(/\/command (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var t2 = match[1];
  if (localStorage.getItem('bds_status') == 'started'){
    if (t2 == 'get'){
        bot.sendMessage(chatId, `${document.getElementById('commandsends').value}`);
      } else {
        if (t2 == 'stop'){
            bot.sendMessage(chatId, `User /bds stop`);
        } else {
            document.getElementById('comsen').setAttribute('disabled','')
            var blank = '';
            if (t2 == blank) {
                document.getElementById('comsen').removeAttribute('disabled')
                bot.sendMessage(chatId, `Commands is in blank`);
            } else {
                var before_get_command = document.getElementById("LOG").innerHTML
                document.getElementById("commandsends").value += 'Command Send: '+t2+'\n'
                document.getElementById('comsen').removeAttribute('disabled')
                document.getElementById('cmds').value = ''
                serverstated.stdin.write(t2+'\n');
                // var after_get_command = 
                bot.sendMessage(chatId, `wait ...`);
                setTimeout(() => {
                    var list_his = document.getElementById("LOG").innerHTML.replace(before_get_command, '<--: Log ')
                    bot.sendMessage(chatId, list_his);
                }, 3600);
            }
        }
      }
  // status bds
  } else {
    bot.sendMessage(chatId, `You Server is Stoped`);
  }
});
// start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  // var t2 = match[1];
  var mensagem1 = 'welcome to Bds Maneger'
  var mensagem2 = 'Comandos Disponivel: '
  var mensagem3 = '/bds (start, stop, restart, status and log),\n/command (Commands to server), \n/start (Essa Mensagem), \n Qualquer Outra coisa use o comando /help'
  bot.sendMessage(chatId, `${mensagem1}\n ${mensagem2}\n ${mensagem3}\n`);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    var h1 = 'welcome to Bds Maneger \nUma coisa, as mensagem enviadas para o bot será redirecionado para o console do bds_maneger e do Minecraft. \n\n Temos os seguintes comandos por enquanto: \n\n/bds \n\n/command'
    bot.sendMessage(chatId, `${h1}`);
});

bot.onText(/\/info (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const ipR = match[1];
    fetch(`http://ip-api.com/json/${ipR}?fields=status,message,country,lat,lon,isp,org,as,asname,reverse,mobile,proxy,hosting,query`).then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const lat = obj2.lat;
        const lon = obj2.lon;
        const ippu = obj2.query;
        const ipre = obj2.reverse;
        const isp = obj2.isp;
        const name = obj2.org;
        const country = obj2.country;
        const proxy = obj2.proxy;
        bot.sendLocation(msg.chat.id, lat, lon);
        bot.sendMessage(chatId, `Ip Publico: ${ippu}, Ip Reverso: ${ipre} \nProvedor: ${isp} \nNome do Provedor: ${name} \ncountry: ${country} \nProxy: ${proxy}`);
        }
    );
});

bot.onText(/\/help (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    var helpMenu = match[1];
    var h1 = 'welcome to Bds Maneger \nUma coisa, as mensagem enviadas para o bot será redirecionado para o console do bds_maneger e do Minecraft. \n\n Temos os seguintes comandos por enquanto: \n\n/bds \n\n/command'
    bot.sendMessage(chatId, `${h1}`);
    if (helpMenu == 'bds'){
        var bds_ = 'O comandos são simples aqui: \n\n\n\n start: Iniciar o servidor caso não tenha iniciado, se ja foi iniciado ele será ignorado \n\n stop: Ele ira para o servidor e mostrarar um log \n\n restart: Reinicia o servidor e todos serão desconectar logo em seguida \n\n log: Mostra o log total do servidor '
    } else if (helpMenu == 'command'){
        var bds_ = 'o /command ele se alto explica, ele server para mandar comandos para servidor direto sem ter ir no bds_maneger para mandar o comandos'
    } else if (helpMenu == 'info'){
        var bds_ = 'o /info ele da as informações do ip do servidor remoto ou de onde o servidor esta rodando, além tambem sua localização via ip.'
    } else {
        var bds_ = "Comandos não existe ou foi escrito errado"
    }
    bot.sendMessage(chatId, `${bds_}`);
});

bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    fetch(`http://ip-api.com/json/?fields=status,message,country,lat,lon,isp,org,as,asname,reverse,mobile,proxy,hosting,query`).then(response => response.text()).then(serverVURLv => {
        bot.sendMessage(chatId, `Device Ip`);
        const obj2 = JSON.parse(serverVURLv);
        const lat = obj2.lat;
        const lon = obj2.lon;
        const ippu = obj2.query;
        const ipre = obj2.reverse;
        const isp = obj2.isp;
        const name = obj2.org;
        const country = obj2.country;
        const proxy = obj2.proxy;
        bot.sendLocation(msg.chat.id, lat, lon);
        bot.sendMessage(chatId, `Ip Publico: ${ippu}, Ip Reverso: ${ipre} \nProvedor: ${isp} \nNome do Provedor: ${name} \ncountry: ${country} \nProxy: ${proxy}`);}
    );
});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var men1 = `${msg.from.username} send ${msg.text}`
    // bot.sendMessage(chatId, `Uma Mensagem foi mandada para o console`);
    console.log(`Telegram bot say: ${men1}`)
    if (localStorage.getItem('bds_status') == 'started'){
        serverstated.stdin.write(`say ${men1}\n`);
    }
  });