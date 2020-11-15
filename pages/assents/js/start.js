// start server (Inject in iframe)
document.getElementById('LOG').innerHTML = '';
console.log('Iniciando');
localStorage.setItem('bds_status', 'started');
var exec = require('child_process').exec;
var bdsDIRpathexe = `${__dirname}/../bds/bedrock_server.exe`
var serverstated = exec(bdsDIRpathexe, {detached: false,shell: true});
serverstated.stdout.on('data', function (data) {document.getElementById('LOG').innerHTML += (data)});