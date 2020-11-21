var fs = require("fs");
var fss = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

if (fs.existsSync(`${process.cwd()}/token.txt`)) {
    var token = fs.readFileSync(`${process.cwd()}/token.txt`, "utf-8").replace('\n', '');
} else {
    var token = "nulo";
}
if (fs.existsSync(`${process.cwd()}/telegram_admin.json`)) {
    var admins = fss.readFileSync(`${process.cwd()}/telegram_admin.json`, 'utf-8');
} else {
    var admins = 'disabled';
}

if (token == 'nulo'){
    console.log('Telegram Bot Disabled')
} else {
    if (admins == 'disabled'){
        return false
    } else {
        bot.onText(/\/bds/, (msg,match) => {
            const chatId = msg.chat.id;
            const bds = mathch[1]
            if (bds == "stop"){
              startServer();
            } else if (bds == "stop"){
              stopserver();
            } else if (bds == "restart") {
              restartServer();
            } else if (bds == "info"){
              /*getserverinfo();*/
              bot.sendMessage(chatId, `creating the function still!`);
            } else {
              bot.sendMessage(chatId, `Send Select Option`);
              console.log(`Telegram bds command.`)
            }
            
        });
    }; /*End Admin if*/
}; /*End exist token file*/

/*
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
*/

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