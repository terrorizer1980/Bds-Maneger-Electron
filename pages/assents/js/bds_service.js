function startServer() {
    var iframestart = document.createElement("iframe");
    iframestart.id = 'serveinjectstart';
    iframestart.classList.add('startframe')
    // 
    var scripts = document.createElement("script");
    scripts.src = 'assents/js/start.js';
    scripts.id = 'ServerStarted';
    document.body.appendChild(iframestart);
    document.getElementById('serveinjectstart').appendChild(scripts);
}
function stopserver(){
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
    stopserver();
    var status = localStorage.getItem('bds_status')
    if (status == 'stoped'){
        var exec = require('child_process').exec;
        var serverstated = exec('cd C:/mcpe/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup.tar.gz *', {detached: false,shell: true});
        serverstated.on('exit', function (code) {
            if (code == 0){
                alert('You Backup in to Desktop');
                window.location.reload(true);
            } else {
                alert('erro to create backup');
                window.location.reload(true);
            }
        });
    } else {
        if (confirm('Voçê quer tentar de novo')){
            worldbackup();
        }
    }
    // tar -czf teste.tar.gz C:/mcpe/worlds/
    // tar.exe -czf %USERPROFILE%/Desktop/-bds_backup.zip C:/mcpe/worlds/*
}

// C:\Program Files\Google\Chrome\Application