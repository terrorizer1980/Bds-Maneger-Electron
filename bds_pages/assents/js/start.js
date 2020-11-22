// start server (Inject in iframe)
// Very important file to start the server in NodeJs and leave it in the background.
function LogOut(dados){
    var GetDivorTextarea = document.getElementById('LOG').tagName
    if (GetDivorTextarea == "TEXTAREA"){
        document.getElementById('LOG').value += `${dados}`
    } else {
        var scripts = document.createElement("p");
        scripts.innerHTML = dados;
        document.getElementById('LOG').appendChild(scripts);
    };
};
console.log('Getting Started');
var exec = require('child_process').exec;
if (process.platform == 'win32'){
    var bdsDIRpathexe = `cd ${process.cwd()}/bds/ && bedrock_server.exe`;
} else if (process.platform == 'linux'){
    var bdsDIRpathexe = `cd ${process.cwd()}/bds/ && chmod 777 bedrock_server && LD_LIBRARY_PATH=${process.cwd()}/bds/.  ${process.cwd()}/bds/bedrock_server`
}
var serverstated = exec(bdsDIRpathexe, {detached: false});
serverstated.stdout.on('data', function (data) {LogOut(data)});