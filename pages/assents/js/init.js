var is = require("electron-is");
function stopserver(){
    serverstated.stdin.write('stop\n');
    localStorage.setItem('bds_status', 'stoped')
}
function sendcomand() {
    document.getElementById('btn').setAttribute('disabled','')
    var blank = '';
    var command = document.getElementById('cmds').value
    if (command == blank) {
        document.getElementById('btn').removeAttribute('disabled')
        alert('command is blank')
    } else {
        document.getElementById('btn').removeAttribute('disabled')
        serverstated.stdin.write(command+'\n');
    }
}
// C:\Program Files\Google\Chrome\Application