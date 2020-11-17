// start server (Inject in iframe)
// Very important file to start the server in NodeJs and leave it in the background.
document.getElementById('LOG').innerHTML = '';
console.log('Iniciando');
localStorage.setItem('bds_status', 'started');
var exec = require('child_process').exec;
if (process.platform == 'win32'){
    document.getElementById('SystemProcess').innerHTML = 'Windows Version';
    var bdsDIRpathexe = `${__dirname}/../bds/bedrock_server.exe`;
} else if (process.platform == 'linux'){
    document.getElementById('SystemProcess').innerHTML = 'Linux Version';
    var bdsDIRpathexe = `LD_LIBRARY_PATH=${__dirname}/../bds/.  ${__dirname}/../bds/bedrock_server`
}
var serverstated = exec(bdsDIRpathexe, {detached: false,shell: true});
serverstated.stdout.on('data', function (data) {document.getElementById('LOG').innerHTML += (data)});