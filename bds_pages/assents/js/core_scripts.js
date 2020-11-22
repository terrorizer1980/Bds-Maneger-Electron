// Core Script
// This is the script that manages and sends commands to the server (This is the script that manages and sends commands to the server (a bridge as we can call).
// it will serve to communicate to and start the server. and it is a mandatory item for bds_maneger to work.
var blank = ''  
function startServer() {
    if (localStorage.getItem('bds_status') == 'started'){
        console.log('Your Server has already started');
    } else {
        localStorage.setItem('bds_status', 'started');
        var inject = document.createElement("iframe");inject.id = 'serveinjectstart';inject.style.display = 'none';document.body.appendChild(inject); 
        var scripts = document.createElement("script");scripts.src = `${process.cwd()}/bds_pages/assents/js/start.js`;scripts.id = 'ServerStarted';document.getElementById('serveinjectstart').appendChild(scripts);
    };
};
function stopserver(){
    if (localStorage.getItem('bds_status') == 'stoped'){
        console.log('Your server is already stopped');
    } else {
        setTimeout(() => {
            serverstated.stdin.write('say Server is stop in 10s\n');
            console.log('Server is stop in 10s');
            setTimeout(() => {
                serverstated.stdin.write('say Server is stop in 9s\n');
                console.log('Server is stop in 9s');
                setTimeout(() => {
                    serverstated.stdin.write('say Server is stop in 8s\n');
                    console.log('Server is stop in 8s');
                    setTimeout(() => {
                        serverstated.stdin.write('say Server is stop in 7s\n');
                        console.log('Server is stop in 7s');
                        setTimeout(() => {
                            serverstated.stdin.write('say Server is stop in 6s\n');
                            console.log('Server is stop in 6s');
                            setTimeout(() => {
                                serverstated.stdin.write('say Server is stop in 5s\n');
                                console.log('Server is stop in 5s');
                                setTimeout(() => {
                                    serverstated.stdin.write('say Server is stop in 4s\n');
                                    console.log('Server is stop in 4s');
                                    setTimeout(() => {
                                        serverstated.stdin.write('say Server is stop in 3s\n');
                                        console.log('Server is stop in 3s');
                                        setTimeout(() => {
                                            serverstated.stdin.write('say Server is stop in 2s\n');
                                            console.log('Server is stop in 2s');
                                            setTimeout(() => {
                                                serverstated.stdin.write('say Server is stop in 1s\n');
                                                console.log('Server is stop in 1s');
                                                setTimeout(() => {
                                                    serverstated.stdin.write('say Server is stop\n');
                                                    console.log('Server is stop');
                                                    setTimeout(() => {
                                                        serverstated.stdin.write('stop\n');
                                                    }, 1000);
                                                }, 1000);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
        localStorage.setItem('bds_status', 'stoped');
    }
    /*
    document.getElementById("cmds").setAttribute('disabled','')
    document.getElementById("comsen").setAttribute('disabled','')
    document.getElementById('serveinjectstart').remove();*/
}
function restartServer(){
    if (localStorage.getItem('bds_status') == 'started'){
        stopserver();
        startServer();
    } else {
        startServer();
    };    
}
function worldbackup(){
    var status = localStorage.getItem('bds_status');
    if (status == 'started'){
        stopserver();
    }
    if (status == 'stoped'){
        var today = new Date();var dd = String(today.getDate()).padStart(2, '0');var mm = String(today.getMonth() + 1).padStart(2, '0');var yyyy = today.getFullYear();var hour = today.getHours();var minu = today.getMinutes()
        today = `${yyyy}_${mm}-${dd}@@${minu}-${hour}`;
        var exec = require('child_process').exec;
        if (process.platform == 'win32'){
            var serverstated = exec(`cd ${process.cwd()}/bds/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in desktop'
        } else if (process.platform == 'linux'){
            var serverstated = exec(`cd ${process.cwd()}/bds/worlds/ && tar -czf ~/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in home dir'
        }        
        serverstated.on('exit', function (code) {
            if (code == 0){
                alert(`${mensagemBackup}, with name: bds_backup_World_${today}.tar.gz`);
            } else {
                alert('erro to create backup');
            }
        });
    } else {
        if (confirm('Voçê quer tentar de novo')){
            worldbackup();
        }
    }
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