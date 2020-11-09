var is = require("electron-is");
function backupMAP(){
    stopserver();
    const status = localStorage.getItem('bds_status')
    if (status = 'stoped'){
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
    }
}



// tar -czf teste.tar.gz C:/mcpe/worlds/
// tar.exe -czf %USERPROFILE%/Desktop/-bds_backup.zip C:/mcpe/worlds/*
