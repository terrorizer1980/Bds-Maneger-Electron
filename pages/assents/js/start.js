// start server (Inject in iframe)
document.getElementById('LOG').innerHTML = '';
console.log('Iniciando');
localStorage.setItem('bds_status', 'started');
var exec = require('child_process').exec;
var serverstated = exec('C:/mcpe/bedrock_server.exe', {
    detached: false,
    shell: true
});
serverstated.stdout.on('data', function (data) {
    document.getElementById('LOG').innerHTML += (data)
});