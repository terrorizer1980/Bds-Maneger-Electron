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
        }
    }
    
}

function sendco(ele) {
    if(event.keyCode == 13) {
        document.getElementById("comsen").click();
    }
}


// const { DownloadItem } = require('electron');
// const { localStorage } = require('globalthis/implementation');

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
            if (confirm('You not have latest Version, is open in new Windows Download Pages')){
                window.open("https://github.com/Sirherobrine23/Bds_Maneger-for-Windows/releases", 'Github Release Download Pages');
            }
        }
    }
);

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
