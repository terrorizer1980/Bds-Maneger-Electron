function startServer(){
    global.serverstated = bds_start();
    serverstated.stdout.on('data', function (data) {
        document.getElementById('LOG').innerHTML += data;
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
document.getElementById('bds-Server_download').innerHTML = bds_control.get_version();
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
function sendco(ele) {
    if(event.keyCode == 13) {
        document.getElementById("comsen").click();
    }
};

function log_save(){
    alert(`Your log file is being automatically saved to the Server directory`)
}

bds_control.telegram.launch();

setInterval(() => {
    var str = document.getElementById('title');
    var bds_status = bds_control.Storage().getItem('bds_status');
    if (bds_status === 'true'){
        var Sonic = `Sonic is running, we hope Tails can keep up`
    } else {
        var Sonic = `Tails is looking for Sonic, on Green Hill`
    }
    str.innerHTML = `Bds Maneger: ${Sonic}`
}, 1000);

function setID(){
    const gd_id = document.getElementById('drive_id').value
    bds_control.Storage().setItem('GDID', gd_id);
    alert('Sucess')
}
document.getElementById('drive_id').value = bds_control.Storage().getItem('GDID')

for (let index in themes_list) {
    const element = themes_list[index].name;
    const url = themes_list[index].zip_url;
    const doc = document.createElement('option')
    doc.setAttribute('value', url)
    doc.innerHTML = element
    document.getElementById('themes_no_by_sirherobrine23').appendChild(doc);
    index++
}