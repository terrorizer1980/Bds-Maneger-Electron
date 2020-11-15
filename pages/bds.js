var exec = require('child_process').exec;
var bdsFound = exec(`echo %cd% && IF EXIST bds ( IF EXIST bds/bedrock_server.exe ( echo sucess & exit 0 ) ELSE ( echo erro not found executable & exit 1 ) ) ELSE ( echo erro no fould & exit 1 )`, {detached: false,shell: true});
bdsFound.on('exit', function (code) {
    if (code == 0){
        var coreS = document.createElement("script");
        coreS.src = 'assents/js/core_scripts.js';
        document.getElementById('scr').appendChild(coreS);
        // 
        var bds_version = document.createElement("script");
        bds_version.src = '';
        document.getElementById('scr').appendChild(bds_version);
        // ---------------------------------------------------------------
    } else {
        document.getElementById('root_container').remove();
        // 
        var sbody = document.createElement("div");
        sbody.id = 'root';
        sbody.setAttribute('class', 'root')
        document.body.appendChild(sbody);
        // 
        var roots = document.createElement("p");
        roots.innerHTML = '<<---| Install Minecraft Bedrock Server in settings menu';
        document.getElementById('root').appendChild(roots);
        document.getElementById('configbuttom').click
    }
});


// // Config Modal
// document.getElementById("configbuttom").onclick = function() {
//     document.getElementById("configmodal").style.display = "block";
//   }
//   document.getElementsByClassName("closeConfig")[0].onclick = function() {
//     document.getElementById("configmodal").style.display = "none";
//   }
//   window.onclick = function(event) {
//     if (event.target == document.getElementById("configmodal")) {
//       document.getElementById("configmodal").style.display = "none";
//     }
// }

