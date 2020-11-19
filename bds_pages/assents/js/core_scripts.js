// Core Script
// This is the script that manages and sends commands to the server (This is the script that manages and sends commands to the server (a bridge as we can call).
// it will serve to communicate to and start the server. and it is a mandatory item for bds_maneger to work.
var blank = ''  
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
    setTimeout(() => {
        serverstated.stdin.write('say Server is stop in 10s\n');
        console.log('Server is stop in 10s');
        setTimeout(() => {
            serverstated.stdin.write('say Server is stop in 9s\n');
            console.log('Server is stop in 9s');
            setTimeout(() => {
                serverstated.stdin.write('say Server is stop in 8s\n');
                console.log('Server is stop in 8s');
                setTimeout(() => {
                    serverstated.stdin.write('say Server is stop in 7s\n');
                    console.log('Server is stop in 7s');
                    setTimeout(() => {
                        serverstated.stdin.write('say Server is stop in 6s\n');
                        console.log('Server is stop in 6s');
                        setTimeout(() => {
                            serverstated.stdin.write('say Server is stop in 5s\n');
                            console.log('Server is stop in 5s');
                            setTimeout(() => {
                                serverstated.stdin.write('say Server is stop in 4s\n');
                                console.log('Server is stop in 4s');
                                setTimeout(() => {
                                    serverstated.stdin.write('say Server is stop in 3s\n');
                                    console.log('Server is stop in 3s');
                                    setTimeout(() => {
                                        serverstated.stdin.write('say Server is stop in 2s\n');
                                        console.log('Server is stop in 2s');
                                        setTimeout(() => {
                                            serverstated.stdin.write('say Server is stop in 1s\n');
                                            console.log('Server is stop in 1s');
                                            setTimeout(() => {
                                                serverstated.stdin.write('say Server is stop\n');
                                                console.log('Server is stop');
                                                setTimeout(() => {
                                                    serverstated.stdin.write('stop\n');
                                                }, 1000);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
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
            var serverstated = exec(`cd ${process.cwd()}/bds/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in desktop'
        } else if (process.platform == 'linux'){
            var serverstated = exec(`cd ${process.cwd()}/bds/worlds/ && tar -czf ~/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
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
    var download_url = obj3[0].assets[1]
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
 var fs = require("fs");
var fss = require("fs");
if (fs.existsSync(`${process.cwd()}/token.txt`)) {
    var token = fs.readFileSync(`${process.cwd()}/token.txt`, "utf-8").replace('\n', '');
} else {
    var token = "nulu";
}
// admins
if (fs.existsSync(`${process.cwd()}/telegram_admin.json`)) {
    var admins = fss.readFileSync(`${process.cwd()}/telegram_admin.json`, 'utf-8');
} else {
    fs.appendFile(`${process.cwd()}/telegram_admin.json`, '{"sh23_bot_not_config": {"allow": true}}', function (err) {if (err) throw err;console.log('allow all users');});
    setTimeout(() => {console.log('');}, 5);
    var admins = fss.readFileSync(`${process.cwd()}/telegram_admin.json`, 'utf-8');
    
}

if (token == 'nulu'){
    console.log('Telegram bot disabled token.txt not exist')
} else {
    if (token ==  blank){
        console.log('Telegram bot disabled token.txt blank')
    } else {
        console.log('Telegram bot enabled')
        const TelegramBot = require('node-telegram-bot-api');
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
            var user = msg.from.username
            console.log(user)
            
            var adm = JSON.parse(admins)
            for(index in adm){if (user == index){var adm2 = `adm.${index}.allow`} else if (index == 'sh23_bot_not_config'){var adm2 = `adm.${index}.allow`};index++;}
            
            if (eval(adm2) == true){
                if (t1 == 'start'){
                    if (localStorage.getItem('bds_status') == 'started'){
                        bot.sendMessage(chatId, `Server Is reuning now`);
                    } else {
                        console.log('Stating')
                        localStorage.setItem('teste', 'start')
                        bot.sendMessage(chatId, `Stating server`);
                        bot.sendMessage(chatId, ` You server files is to ${process.cwd()}/bds, Reuning in ${more}`);
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
                        bot.sendMessage(chatId, `Your server will be stopped in 10s`);
                    } else {
                        bot.sendMessage(chatId, `Your server is stopped`);
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
            } else {
                console.log('not allowed, for admins')
                bot.sendMessage(chatId, `Allowed to admins, ${user} not admin`);
            }
        });
    
    
        // Send Comand
        bot.onText(/\/command (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        var t2 = match[1];
        if (localStorage.getItem('bds_status') == 'started'){
            // Commands
            const fss = require('fs')
            
            var user = msg.from.username
            console.log(user)
            
            var adm = JSON.parse(admins)
            for(index in adm){if (user == index){var adm2 = `adm.${index}.allow`} else if (index == 'sh23_bot_not_config'){var adm2 = `adm.${index}.allow`};index++;}
            
            if (eval(adm2) == true){
                // Command allowed
                if (t2 == 'get'){
                    bot.sendMessage(chatId, `${document.getElementById('commandsends').value}`);
                } else {
                    if (t2 == 'stop'){
                        bot.sendMessage(chatId, `User /bds stop`);
                    } else {
                        document.getElementById('comsen').setAttribute('disabled','');
                        var blank = '';
                        if (t2 == blank) {
                            document.getElementById('comsen').removeAttribute('disabled');
                            bot.sendMessage(chatId, `Commands is in blank`);
                        } else {
                            var before_get_command = document.getElementById("LOG").innerHTML;
                            document.getElementById("commandsends").value += 'Command Send: '+t2+'\n';
                            document.getElementById('comsen').removeAttribute('disabled');
                            document.getElementById('cmds').value = '';
                            serverstated.stdin.write(t2+'\n');
                            bot.sendMessage(chatId, `wait ...`);
                            setTimeout(() => {
                                var list_his = document.getElementById("LOG").innerHTML.replace(before_get_command, '');
                                bot.sendMessage(chatId, list_his);
                            }, 3600);
                            // time out end
                        };
                    };
                };
                // Command allowed
            } else {
                // Command denied
                console.log(`this user telegram ${user} atempt to send command`)
                bot.sendMessage(chatId, `Allowed to admins, ${user} not admin`);
                // Command denied
            };
        // end
        // status bds
        } else {
            bot.sendMessage(chatId, `You Server is Stoped`);
        }
        });
        // start
        bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        var mensagem1 = 'welcome to Bds Maneger'
        var mensagem2 = 'Commands Available: '
        var mensagem3 = '/bds (start, stop, restart, status and log),\n/command (Commands to server), \n/start (That Message), \nnot Anything else use the command /help'
        bot.sendMessage(chatId, `${mensagem1}\n ${mensagem2}\n ${mensagem3}\n`);
        });
    
        bot.onText(/\/help/, (msg, match) => {
            const chatId = msg.chat.id;
            var helpMenu = match[1];
            
            if (helpMenu == 'bds'){
                var bds_ = 'The commands are simple here: \n\n\n\n start: Start the server if it has not started, if it has already started it will be ignored \n\n stop: It will go to the server and show a log \n\n restart: Restart the server and everyone will be disconnected shortly thereafter \n\n log: Shows the total log of the server'
            } else if (helpMenu == 'command'){
                var bds_ = '/command it explains itself, it serves to send commands to a direct server without having to go to bds_maneger to send commands'
            } else if (helpMenu == 'info'){
                var bds_ = '/info gives the ip information of the remote server or where the server is running from, as well as its location via ip.'
            } else {
                var h1 = 'welcome to Bds Maneger \nOne thing, the messages sent to the bot will be redirected to the console of bds_maneger and Minecraft. \n\n We have the following commands for now: \n\n /bds \n\n/command'
                var bds_ = `${h1} \n\n\n Commands do not exist or misspelled, use \"/help bds\", \"/help command\", \"/help info\"`
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
    
        // All messages
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
             if (msg.text.includes('/start')){
                return false
             } else if (msg.text.includes('/bds')){
                 return false
             } else if (msg.text.includes('/command')){
                return false
             } else if (msg.text.includes('/info')){
                return false
             } else if (msg.text.includes('/help')){
                return false
             } else {
                var men1 = `the ${msg.from.username} sent a message on the telegram: ${msg.text}`;
                console.log(`Telegram bot say: ${men1}`);
                if (localStorage.getItem('bds_status') == 'started'){
                    serverstated.stdin.write(`say Telegram Bot ${men1}\n`);
                }
             }
        });
        // End Bot
    }
}


/*
// Admins Members check
// ----------------

var user = msg.from.username
var adm = JSON.parse(admins)
for(index in adm){if (user == index){var adm2 = `adm.${index}.allow`;} else if (index == 'sh23_bot_not_config'){var adm2 = `adm.${index}.allow`;};index++;}
console.log(eval(adm2))
if (eval(adm2) == true){
    // Command allowed

    // Command allowed
} else {
    // Command denied
    console.log(`this user telegram ${user} atempt to send command`)
    bot.sendMessage(chatId, `Allowed to admins, ${user} not admin`);
    // Command denied
}
*/