const { resolve } = require("path")

function BdsManegerSettings(){
    open(resolve(__dirname, "config.html"));
}

document.getElementById("WorldBackup").onclick = () => {
    const backup_folder = bds_core.backup();
    alert(`Backup file in path: ${backup_folder.file_path}`)
}

document.getElementById("WorldBackupIndrive").onclick = () => {
    if ((bds_core.bds_config.Google_Drive_root_backup_id === undefined || 
        bds_core.bds_config.Google_Drive_root_backup_id === "" || 
        bds_core.bds_config.Google_Drive_root_backup_id === null)) alert("The Save Backup in Root Drive")
    bds_core.drive_backup((file) => {
        console.log(file);
        alert(`Backup save, ID: ${JSON.stringify(file.data.id)}`)
    })
}

document.getElementById("ProjectAbout").onclick = () => {
    open(resolve(__dirname, "About.html"))
}

setInterval(() => {
    if (bds_core.bds_detect()) {
        document.getElementById("Reunning").style.display = "block";
        document.getElementById("Stopped").style.display = "none"
    } else {
        document.getElementById("Stopped").style.display = "block";
        document.getElementById("Reunning").style.display = "none"
    }
}, 300);

global.HistoricNumber = 0
// Command input
global.TheCommands = JSON.parse((localStorage.getItem("CommmandHistoric") || "[]"))
const commandArea = document.getElementById("CommandAreaInput")
commandArea.onkeydown = () => {
    // console.log(event.keyCode);
    if(event.keyCode === 38) {
        global.HistoricNumber = global.HistoricNumber + 1
        if (global.TheCommands[global.HistoricNumber]) commandArea.value = global.TheCommands[global.HistoricNumber]; else global.HistoricNumber = global.HistoricNumber - 1
    }
    if(event.keyCode === 40) {
        global.HistoricNumber = global.HistoricNumber - 1
        if (global.TheCommands[global.HistoricNumber]) commandArea.value = global.TheCommands[global.HistoricNumber]; else global.HistoricNumber = global.HistoricNumber + 1
    }
    if(event.keyCode === 13) {
        global.TheCommands.push(commandArea.value);
        localStorage.setItem("CommmandHistoric", JSON.stringify(global.TheCommands, null, 4))
        document.getElementById("CommandSendID").click();
    }
}
commandArea.oninput = () => {
    if (commandArea.value.charAt(0) === "/") commandArea.value = commandArea.value.replace("/", "");
    if (commandArea.value === "stop") {alert("User the giant button here on the side or down here");commandArea.value = ""};
}

// Command click
const CommandClick = document.getElementById("CommandSendID")
CommandClick.onclick = () => {
    if (bds_core.bds_detect()) {
        bds_core.command(commandArea.value);
        global.HistoricNumber = 0
        commandArea.value = "";
    } alert("Start the Server")
}


const themeMap = {
    dark: "light",
    light: "DarkColors",
    DarkColors: "dark"};
const theme = localStorage.getItem('theme') || (tmp = Object.keys(themeMap)[0], localStorage.setItem('theme', tmp), tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);
function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);};
document.getElementById('themeButton').onclick = toggleTheme;

function startServer(){
    if (bds_detect()) alert("Your server is running"); else {
        var bds_EXIT = document.getElementById("LOG").innerHTML
        if (bds_EXIT.includes("Quit correctly")) document.getElementById("LOG").innerHTML = ""
        global.serverstated = bds_start();
        serverstated.log(function (data) {
            document.getElementById("LOG").innerHTML += data;
            document.getElementById("LOG").scrollTo(0, 9999)
        });
    }
}

function restartServer(){
    if (bds_detect()) bds_stop()
    startServer();
}

function log_save(){
    alert("Your log file is being automatically saved to the Server directory")
}
bds_control.telegram.launch();