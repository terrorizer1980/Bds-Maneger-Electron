var fs = require("fs");
var fss = require("fs");
const TelegramBot = require('node-telegram-bot-api');
/* ------------------------------------------------- */
if (process.platform == 'linux'){
    var system = 'Linux System'
} else if (process.platform == 'win32'){
    var system = 'Windows System'
}
/* ------------------------------------------------- */
if (fs.existsSync(`${process.cwd()}/token.txt`)) {
    var token = fs.readFileSync(`${process.cwd()}/token.txt`, "utf-8").replaceAll('\n', '');
} else {
    var token = "nulo";
}
/* ------------------------------------------------- */
if (fs.existsSync(`${process.cwd()}/telegram_admin.json`)) {
    var admins = fss.readFileSync(`${process.cwd()}/telegram_admin.json`, 'utf-8');
} else {
    var admins = 'disabled';
}
/* ------------------------------------------------- */
if (token == 'nulo'){
    console.log('Telegram Bot Disabled not have token.txt')
} else {
    if (admins == 'disabled'){
        console.log('Telegram Diasabled not have telegram_admin.json')
    } else {
        const TelegramBot = require('node-telegram-bot-api');
        const bot = new TelegramBot(token, {polling: true});
        var blank = '';
        /* Bds command controler */
        bot.onText(/\/bds (.+)/, (msg, match) => {
            var user = msg.from.username;
            var adm = JSON.parse(admins);
            for(index in adm){if (user == index){var adm2 = `adm.${index}.allow`} else if (index == 'sh23_bot_not_config'){var adm2 = `adm.${index}.allow`};index++;}; /* check admin By username */
            if (eval(adm2) == true){
                const chatId = msg.chat.id;
                var t1 = match[1];
                if (t1 == 'start'){
                    if (localStorage.getItem('bds_status') == 'started'){
                        bot.sendMessage(chatId, `Server Is reuning now`);
                    } else {
                        bot.sendMessage(chatId, `Stating server`);
                        startServer();
                    }; /* Start Server End */
                } else if (t1 == 'stop'){
                    if (localStorage.getItem('bds_status') == 'started'){
                        console.log('stopping')
                        bot.sendMessage(chatId, `Your server will be stopped in 10s`);
                        bot.sendMessage(chatId, `Stoping server`);
                        stopserver();
                        var GetDivorTextarea = document.getElementById('LOG').tagName
                        if (GetDivorTextarea == "TEXTAREA"){
                            bot.sendMessage(chatId, `${document.getElementById("LOG").value}`);
                        } else {
                            bot.sendMessage(chatId, `${document.getElementById("LOG").innerHTML}`);
                        };
                    } else {
                        bot.sendMessage(chatId, `Your server is stopped`);
                    } /* Stop Server */
                } else if (t1 == 'restart'){
                    bot.sendMessage(chatId, `Restating server`);
                    restartServer();
                    /* Server restart */
                } else if (t1 == 'status'){
                    console.log('Requiset status')
                    bot.sendMessage(chatId, `Server status is: ${localStorage.getItem('bds_status')}`);
                    /* Bds status */
                } else if (t1 == 'log') {
                    bot.sendMessage(chatId, `Geting you log`);
                    bot.sendMessage(chatId, `${document.getElementById('LOG').innerHTML}`);
                    /* you Log */
                } else if (t2 == 'info') {
                    docu
                } else {
                    bot.sendMessage(chatId, `use: start, stop, restart, status and log; ${t1} is not command.`);
                } /* End /bds command */
            } else {
                console.log('not allowed, for admins')
                bot.sendMessage(chatId, `Allowed to admins, ${user} not admin`);
            };
        }); /* End /bds command Telegram */
        /* --------------------------------------------------------------------------------------------------- */
        /* Send Command to Server */
        bot.onText(/\/command (.+)/, (msg, match) => {
            const chatId = msg.chat.id;
            var t2 = match[1];
            if (localStorage.getItem('bds_status') == 'started'){
                var user = msg.from.username
                var adm = JSON.parse(admins)
                for(index in adm){if (user == index){var adm2 = `adm.${index}.allow`} else if (index == 'sh23_bot_not_config'){var adm2 = `adm.${index}.allow`};index++;}; /* check admin By username */
                if (eval(adm2) == true){
                    if (t2 == 'stop'){
                        bot.sendMessage(chatId, `User /bds stop`);
                    } else if (t2.includes('say')){
                        bot.sendMessage(chatId, `User chat to send mensage`);
                    } else {
                        var GetDivorTextarea = document.getElementById('LOG').tagName
                        if (GetDivorTextarea == "TEXTAREA"){
                            var before_get_command = document.getElementById('LOG').value
                        } else {
                            var before_get_command = document.getElementById('LOG').innerHTML
                        }
                        serverstated.stdin.write(t2+'\n');
                        bot.sendMessage(chatId, `wait ...`);
                        setTimeout(() => {
                            if (GetDivorTextarea == "TEXTAREA"){
                                var list_his = document.getElementById("LOG").value.replace(before_get_command, '');
                            } else {
                                var list_his = document.getElementById("LOG").innerHTML.replace(before_get_command, '');
                            };
                            bot.sendMessage(chatId, list_his);
                        }, 1000);
                    };
                } else {
                    console.log(`this user telegram ${user} atempt to send command`)
                    bot.sendMessage(chatId, `Allowed to admins, ${user} not admin`);
                }; /* Admin check end */
            } else {
                bot.sendMessage(chatId, `You Server is Stoped`);
            }; /* Bds Status Check End */
        }); /* Send Command End */
        /* --------------------------------------------------------------------------------------------------- */
        /* Primeira conversar com o bot */
        bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id; bot.sendMessage(chatId, `Welcome to Bds Maneger Bot\n\n Telegram bot commands:\n /bds {start, stop, restart, status and log}\n /command {bds commands}\n /info {Get ip info and more} and /help`);
        }); /* End Start */
        /* --------------------------------------------------------------------------------------------------- */
        /* Help Command */
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
        }); /* End Help command */
        /* --------------------------------------------------------------------------------------------------- */
        bot.onText(/\/info/, (msg) => {
            const chatId = msg.chat.id;
            fetch(`http://ip-api.com/json/?fields=status,message,country,lat,lon,isp,org,as,asname,reverse,mobile,proxy,hosting,query`).then(response => response.json()).then(obj2 => {const lat = obj2.lat;const lon = obj2.lon;const ippu = obj2.query;const ipre = obj2.reverse;const isp = obj2.isp;const name = obj2.org;const country = obj2.country;const proxy = obj2.proxy;bot.sendLocation(msg.chat.id, lat, lon);bot.sendMessage(chatId, `Ip Publico: ${ippu}, Ip Reverso: ${ipre} \nProvedor: ${isp} \nNome do Provedor: ${name} \ncountry: ${country} \nProxy: ${proxy}`);});
            bot.sendMessage(chatId, `Reuning in ${system}`);
        }); /* End */
        /* --------------------------------------------------------------------------------------------------- */
        /* Telegram chat */
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            /* Ignore Telegram Commands */ if (msg.text.includes('/start')){return false} else if (msg.text.includes('/bds')){return false} else if (msg.text.includes('/command')){return false} else if (msg.text.includes('/info')){return false} else if (msg.text.includes('/help')){return false} else {
                var Console_men1 = `Telegram Bot: ${msg.from.username} sent a message on the telegram: ${msg.text}`;
                var Mcpe_men1 = `Telegram: ${msg.from.username}, ${msg.text}`
                console.log(Console_men1);
                    if (localStorage.getItem('bds_status') == 'started'){serverstated.stdin.write(`say ${Mcpe_men1}\n`);};
            }
        }); /* End chat */
        /* --------------------------------------------------------------------------------------------------- */
    }; /*End Admin if*/
}; /*End exist token file*/

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