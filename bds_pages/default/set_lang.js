const fs = require("fs")
const path = require("path");
// eslint-disable-next-line no-unused-vars
const lang = JSON.parse(fs.readFileSync(path.join(__dirname, "l10n.json")))
const language_json = eval(`lang.${electron_locale_system}`) 
console.log(language_json)

document.getElementById("world_name").innerHTML = language_json.message.root.server_settings.world_name
document.getElementById("desc").innerHTML = language_json.message.root.server_settings.description

document.getElementById("surv").innerHTML = language_json.message.root.server_settings.gamemode.survival
document.getElementById("crea").innerHTML = language_json.message.root.server_settings.gamemode.creative
document.getElementById("aven").innerHTML = language_json.message.root.server_settings.gamemode.adventure


document.getElementById("eas").innerHTML = language_json.message.root.server_settings.difficulty.easy
document.getElementById("nor").innerHTML = language_json.message.root.server_settings.difficulty.normal
document.getElementById("har").innerHTML = language_json.message.root.server_settings.difficulty.hard

document.getElementById("deafult_pl").innerHTML = language_json.message.root.server_settings.default_p
document.getElementById("s_time_out").innerHTML = language_json.message.root.server_settings.timeout
document.getElementById("max_play").innerHTML = language_json.message.root.server_settings.max
document.getElementById("sett_xb").innerHTML = language_json.message.root.server_settings.xb
document.getElementById("sett_whi").innerHTML = language_json.message.root.server_settings.whi
document.getElementById("sett_cheats").innerHTML = language_json.message.root.server_settings.cheats

document.getElementById("settings_fild").innerHTML = language_json.message.root.server_settings.settings_fild
document.getElementById("drive_id_text").innerHTML = language_json.message.root.server_settings.drive_id_text
document.getElementById("bds-Server_download_text").innerHTML = language_json.message.root.server_settings.bds_Server_download_text
document.getElementById("start_up").innerHTML = language_json.message.root.server_settings.start_up



document.getElementById("vis").innerHTML = language_json.message.root.server_settings.permission.visitor
document.getElementById("mem").innerHTML = language_json.message.root.server_settings.permission.member
document.getElementById("ope").innerHTML = language_json.message.root.server_settings.permission.operator
document.getElementById("buttom_start").innerHTML = language_json.message.buttom.start
document.getElementById("buttom_stop").innerHTML = language_json.message.buttom.stop
document.getElementById("buttom_restart").innerHTML = language_json.message.buttom.restart
document.getElementById("buttom_theme").innerHTML = language_json.message.buttom.themes
document.getElementById("buttom_backup").innerHTML = language_json.message.buttom.backup
document.getElementById("buttom_settings").innerHTML = language_json.message.buttom.settings
document.getElementById("buttom_about").innerHTML = language_json.message.buttom.about
document.getElementById("cmds").placeholder = language_json.message.root.log.command_input
document.getElementById("comsen").value = language_json.message.root.log.send_command