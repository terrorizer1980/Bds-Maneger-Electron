function startServer() {
    document.getElementById('startButtom').removeAttribute('onclick')
    var scripts = document.createElement("script");
    scripts.src = 'assents/js/start.js';
    scripts.id = 'ServerStarted';
    document.getElementById('before_get_update').appendChild(scripts);
}
function stopserver(){
    document.getElementById('startButtom').setAttribute('onclick','startServer();')
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
function initstatus(){
    if (confirm('!Cuidado!, isso pode consumir muita memoria ram, e cpu, quer continua')){
        setInterval(function(){
            // tasklist /fi "imagename eq bedrock_server.exe" | find /i "bedrock_server.exe" > nul & if not errorlevel 1 (exit 0) else (exit 1)
            var exec = require('child_process').exec;
            var statuss = exec('tasklist /fi "imagename eq bedrock_server.exe" | find /i "bedrock_server.exe" > nul & if not errorlevel 1 (exit 0) else (exit 1)', {detached: false,shell: true});
            statuss.on('exit', function (code) {
                if (code == 0) {
                    document.getElementById('statsID').style.fill = 'green';
                    document.getElementById('statsIDout').innerHTML = 'You Serve is executing';
                    statuss.stdin.end();
                } else {
                    document.getElementById('statsID').style.fill = 'red';
                    document.getElementById('statsIDout').innerHTML = 'You Serve is stoped';
                    statuss.stdin.end();
                }
            })
        }, 500);
    } else
        return 'Cancelado'
}

    