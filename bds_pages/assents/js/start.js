// start server (Inject in iframe)
// Very important file to start the server in NodeJs and leave it in the background.
document.getElementById('LOG').innerHTML = '';
console.log('Iniciando');
localStorage.setItem('bds_status', 'started');
var exec = require('child_process').exec;
if (process.platform == 'win32'){
    document.getElementById('SystemProcess').innerHTML = 'Windows Version';
    var bdsDIRpathexe = `${process.cwd()}/bds/bedrock_server.exe`;
} else if (process.platform == 'linux'){
    document.getElementById('SystemProcess').innerHTML = 'Linux Version';
    var bdsDIRpathexe = `cd ${process.cwd()}/bds/ && chmod 777 bedrock_server && LD_LIBRARY_PATH=${process.cwd()}/bds/.  ${process.cwd()}/bds/bedrock_server`
}
var serverstated = exec(bdsDIRpathexe, {detached: false,shell: true});
serverstated.stdout.on('data', function (data) {document.getElementById('LOG').innerHTML += (data)});