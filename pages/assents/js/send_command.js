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