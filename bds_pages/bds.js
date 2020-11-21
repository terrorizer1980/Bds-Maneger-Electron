var exec = require('child_process').exec;
if (process.platform == 'win32'){
    var systemDir = exec(`echo %cd%`);
    systemDir.stdout.on('data', function (data){
        if (data == 'C:\\Windows\\System32'){
            alert('Exit to app');
            require('electron').app.quit;
        };
    });
};
if (process.platform == 'win32'){
    var bdsFound = exec(`IF EXIST ${process.cwd()}/bds ( IF EXIST bds/bedrock_server.exe ( echo sucess & exit 0 ) ELSE ( echo erro not found executable & exit 1 ) ) ELSE ( echo erro no fould & exit 1 )`, {detached: false,shell: true});
} else if (process.platform == 'linux') {
    var bdsFound = exec(`if [ -d ${process.cwd()}/bds/ ];then if [ -e ${process.cwd()}/bds/bedrock_server ];then echo 'exist';exit 0;else echo 'not exist software'; exit 1;fi; else echo 'not exist foud'; exit 1; fi`, {detached: false,shell: true});
}
bdsFound.on('exit', function (code) {
    if (code == 0){
        var coreS = document.createElement("script");
        coreS.src = 'assents/js/core_scripts.js';
        document.getElementById('scr').appendChild(coreS);
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
        // document.getElementById('configbuttom').click
    }
});