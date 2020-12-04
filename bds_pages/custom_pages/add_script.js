var os = require('os')
var commandExists = require('command-exists');
var os_detect = require('os')
var commandExists = require('command-exists');
if (process.platform == 'win32'){
    if (os_detect.arch() == 'x64'){
        console.log(`Platform supported by Minecraft Bedrock Server`)
    } else if (os_detect.arch() == 'arm64'){
        alert('Beware that Minecraft Bedrock will be emulated and it will not be the fault of Bds Maneger')
    }
} else if (process.platform == 'linux'){
    if (os_detect.arch() == 'arm64'){
        // invoked without a callback, it returns a promise
        commandExists('qemu-x86_64-static').then(function (command) {
            console.log('This can be very slow')
        }).catch(function () {
            alert(`please install \"qemu-user-static\" and \"binfmt-support\" for emulation and continue`);
            require('electron').remote.app.exit();
        });
    } else {
        alert(`Use an AMD64 (X64) platform or an arm64 that supports AMD64 (x64) emulation`)
    }
} else {
    alert(`Your platform is not supported by Minecraft Bedrock Server`);
    require('electron').remote.app.exit();
};
// ----------------------------------------------------------------------------------------------------------------
var adds = document.getElementById('scripts');
// Kills
var kill = document.createElement("script");
kill.src = `${process.cwd()}/bds_pages/assents/js/kill_old_BDS.js`;
kill.setAttribute('defer','');
adds.appendChild(kill);
// Core
var coreS = document.createElement("script");
coreS.src = `${process.cwd()}/bds_pages/assents/js/core_scripts.js`;
coreS.setAttribute('defer','');
// Telegram Bot
var TelegramBOT = document.createElement("script");
TelegramBOT.src = `${process.cwd()}/bds_pages/assents/js/telegram-bot.js`;
TelegramBOT.setAttribute('defer','');
adds.appendChild(coreS);
adds.appendChild(TelegramBOT);