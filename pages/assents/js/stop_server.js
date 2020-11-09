var is = require("electron-is");
function stopserver(){
    serverstated.stdin.write('stop\n');
    localStorage.setItem('bds_status', 'stoped');
    document.getElementById("cmds").setAttribute('disabled','')
    document.getElementById("comsen").setAttribute('disabled','')
}

// C:\Program Files\Google\Chrome\Application