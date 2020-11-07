var is = require("electron-is");

var he = window.innerHeight - 70;
var wi = window.innerWidth - 70;
console.log(wi);console.log(he)
var clsa = ('height:'+ he + 'px;'+'width:'+ wi +'px;')
document.getElementById('LOG').setAttribute("style", clsa); 
// document.getElementById('LOG').style = (size)

// start server
console.log('Inicializado')
var exec = require('child_process').exec;
var child = exec('C:/mcpe/bedrock_server.exe', {
    detached: false,
    shell: true
});
child.stdout.on('data', function (data) {
document.getElementById('LOG').innerHTML += (data)
});