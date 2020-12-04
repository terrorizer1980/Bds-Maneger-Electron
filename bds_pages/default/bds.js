var os_detect = require('os')
var commandExists = require('command-exists');
if (process.platform == 'win32'){
    if (os_detect.arch() == 'x64'){
        console.log(`Platform supported by Minecraft Bedrock Server`)
        console.log(`continue`)
    } else if (os_detect.arch() == 'arm64'){
        alert('Beware that Minecraft Bedrock will be emulated and it will not be the fault of Bds Maneger')
    }
} else if (process.platform == 'linux'){
    if (os_detect.arch() == 'arm64'){
        // invoked without a callback, it returns a promise
        commandExists('qemu-x86_64-static').then(function (command) {
            console.log('This can be very slow')
        }).catch(function () {
            alert(`please install \"qemu-user-static\" and \"binfmt-support\" for emulation and continue`);
            require('electron').app.exit();
        });
    } else {
        alert(`Use an AMD64 (X64) platform or an arm64 that supports AMD64 (x64) emulation`)
    }
} else {
    alert(`Your platform is not supported by Minecraft Bedrock Server`);
    require('electron').app.exit();
};
// --------------------------------------------------------------------------------------------------------------------
var exec = require('child_process').exec;   
if (process.platform == 'win32'){
    var bdsFound = exec(`IF EXIST ${require('bds_maneger_api').server_dir}/ ( IF EXIST ${require('bds_maneger_api').server_dir}/bedrock_server.exe ( echo sucess & exit 0 ) ELSE ( echo erro not found executable & exit 1 ) ) ELSE ( echo erro no fould & exit 1 )`, {detached: false,shell: true});
} else if (process.platform == 'linux') {
    var bdsFound = exec(`if [ -d ${require('bds_maneger_api').server_dir}/ ];then if [ -e ${require('bds_maneger_api').server_dir}/bedrock_server ];then echo 'exist';exit 0;else echo 'not exist software'; exit 1;fi; else echo 'not exist foud'; exit 1; fi`, {detached: false,shell: true});
}
bdsFound.on('exit', function (code) {
    if (code == 0){
        var coreS = document.createElement("script");
        coreS.src = `${process.cwd()}/bds_pages/assents/js/core_scripts.js`;
        document.getElementById('scr').appendChild(coreS);
        // ---------------------------------------------------------------
        var coreS2 = document.createElement("script");
        coreS2.src = `assents/js/core_script.js`;
        document.getElementById('scr').appendChild(coreS2);
    } else {
        document.getElementById('root_container').remove();
        // 
        var sbody = document.createElement("div");
        sbody.id = 'root';
        sbody.setAttribute('class', 'root')
        document.body.appendChild(sbody);
        // 
        var roots = document.createElement("p");
        roots.innerHTML = 'Install Minecraft Bedrock Server in settings menu';
        document.getElementById('root').appendChild(roots);
        // document.getElementById('configbuttom').click
        document.getElementById("configmodal").style.display = "block";
        alert('Install Minecraft Bedrock Server')
    }
});
