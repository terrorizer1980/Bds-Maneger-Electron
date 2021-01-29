function startServer(){
    var bds_EXIT = document.getElementById('LOG').innerHTML
    if (bds_EXIT.includes("Quit correctly")){
        document.getElementById('LOG').innerHTML = ""
    }
    global.serverstated = bds_start();
    serverstated.stdout.on('data', function (data) {
        document.getElementById('LOG').innerHTML += data;
        document.getElementById('LOG').scrollTo(0, 9999)
    });
};

function restartServer(){
    if (bds_detect()){
        bds_stop()
    };
    startServer();
}

function DownloadBDS(){
    bds_download(document.getElementById('bds-Server_download').value)
};
document.getElementById('bds-Server_download').innerHTML = bds_control.version_select;
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
            bds_command(command)
        };
    };
};

function log_save(){
    alert(`Your log file is being automatically saved to the Server directory`)
}

bds_control.telegram.launch();

setInterval(() => {
    var str = document.getElementById('title');
    var bds_status = localStorage.getItem('bds_status');
    if (bds_status === 'true'){
        var msg = `The server is running`
    } else {
        var msg = `The server is stopped`
    }
    str.innerHTML = `Bds Maneger \\-/ ${msg}`
}, 1000);

function setID(){
    const gd_id = document.getElementById('drive_id').value
    localStorage.setItem('GDID', gd_id);
    alert('Sucess')
}
document.getElementById('drive_id').value = localStorage.getItem('GDID')