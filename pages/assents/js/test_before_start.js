var status = localStorage.getItem('bds_status')
var blank = ''

function stating() {
    var scripts = document.createElement("script");
    scripts.src = 'assents/js/start.js';
    console.log(scripts)
    document.getElementById("scr").appendChild(scripts);
}

if (status == blank){
    console.log('Init server')
    localStorage.setItem('bds_status', 'stoped')
}
if (status == 'started') {
        var spawn = require('child_process').spawn;
        var killbds = spawn('tasklist /fi "imagename eq bedrock_server.exe" | find /i "bedrock_server.exe" > nul & if not errorlevel 1 (taskkill /f /im "bedrock_server.exe" > nul && exit 0) else (exit 1)', {
            shell: true
        });
        killbds.on('exit', function (code) {
            if (code == 0){
                localStorage.setItem('bds_status', 'stoped')
                killbds.stdin.end();
                window.location.reload(true);
            } else {
                localStorage.setItem('bds_status', 'stoped')
                killbds.stdin.end();
                window.location.reload(true);
            }
        });
} else {
    document.addEventListener("DOMContentLoaded", stating);
}

