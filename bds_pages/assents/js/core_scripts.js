// Core Script
// This is the script that manages and sends commands to the server (This is the script that manages and sends commands to the server (a bridge as we can call).
// it will serve to communicate to and start the server. and it is a mandatory item for bds_maneger to work.
function LogOut(dados){
    var GetDivorTextarea = document.getElementById('LOG').tagName
    if (GetDivorTextarea == "TEXTAREA"){
        document.getElementById('LOG').value += `${dados}`
    } else {
        var scripts = document.createElement("p");
        scripts.innerHTML = dados;
        document.getElementById('LOG').appendChild(scripts);
    };
};
function startServer() {
    if (localStorage.getItem('bds_status') == 'started'){
        LogOut('Your Server has already started');
    } else {
        localStorage.setItem('bds_status', 'started');
        var inject = document.createElement("iframe");inject.id = 'serveinjectstart';inject.style.display = 'none';document.body.appendChild(inject); 
        var scripts = document.createElement("script");scripts.src = `${process.cwd()}/bds_pages/assents/js/start.js`;scripts.id = 'ServerStarted';document.getElementById('serveinjectstart').appendChild(scripts);
    };
};
function stopserver(){
    if (localStorage.getItem('bds_status') == 'stoped'){
        LogOut('Your server is already stopped');
    } else {
        serverstated.stdin.write(`say voce\n`);
        for (let index = 1; index < 12; index++) {
            setTimeout(function timer() {
                if (index == '11'){
                    serverstated.stdin.write('stop\n');
                    localStorage.setItem('bds_status', 'stoped');
                    log_save();
                } else {
                    serverstated.stdin.write(`say Server is stop in ${index}s\n`);
                    console.log(`Server is stop in ${index}s`);
                    LogOut(`Server is stop in ${index}s\n`);
                };
            }, index * 1000);
        };
    };
};
function restartServer(){
    if (localStorage.getItem('bds_status') == 'started'){
        stopserver();
        startServer();
    } else {
        startServer();
    };    
}
function worldbackup(){backupS1();};
function backupS1(){
    require('bds_maneger_api').backup()
};



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
            serverstated.stdin.write(command+'\n');
        };
    };
};
function sendco(ele) {
    if(event.keyCode == 13) {
        document.getElementById("comsen").click();
    }
};

function log_save() {
    const log_save_fs = require('fs')
    if (process.platform == 'win32'){
        var output_dir = `${process.env.USERPROFILE}`
    } else if (process.platform == 'linux'){
        var output_dir = `${process.env.HOME}`
    };
    if (GetDivorTextarea == "TEXTAREA"){
        var Log_value = document.getElementById('LOG').value;
        var Log = Log_value.replaceAll('<p>').replaceAll('</p>')
    } else {
        var Log = document.getElementById('LOG').innerHTML.replaceAll('</p>', '\n').replaceAll('<p>', '\n');
    };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;
    const filename = `${output_dir}/${today}_Bds-log_by_Bds-Maneger.txt`
    var GetDivorTextarea = document.getElementById('LOG').tagName
    log_save_fs.writeFile(filename, `---- Start ----\n\n ${Log}\n\n---- End ----`, function (err) {
        if (err) throw err;
            console.log('Log Save in home dir')
    });
};