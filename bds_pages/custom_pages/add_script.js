var adds = document.getElementById('scripts');
// Kills
var kill = document.createElement("script");
kill.src = `${process.cwd()}/bds_pages/assents/js/kill_old_BDS.js`
kill.setAttribute('defer','')
// Core
var coreS = document.createElement("script");
coreS.src = `${process.cwd()}/bds_pages/assents/js/core_scripts.js`
coreS.setAttribute('defer','')
// Telegram Bot
var TelegramBOT = document.createElement("script");
TelegramBOT.src = `${process.cwd()}/bds_pages/assents/js/telegram-bot.js`
TelegramBOT.setAttribute('defer','')
adds.appendChild(kill);
adds.appendChild(coreS);
adds.appendChild(TelegramBOT);