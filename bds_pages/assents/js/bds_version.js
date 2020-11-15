// This script, manage the versions of Minecraft Bedrock Server, this file has not yet been included in core_service.js
// Download BDS Software
// Id selecttion: bds-Server_download
fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(langArray => {
    var newSelect = document.getElementById('bds-Server_download')
        for(index in JSON.parse(langArray).Versions){
            var opt = document.createElement("option");
            opt.value= index;
            opt.innerHTML = JSON.parse(langArray).Versions[index];
            // Taca tudo do select
            newSelect.appendChild(opt);
            index++;
        }
    }
);

function logD(vales){
    var logDownload = document.createElement("p");
    logDownload.innerHTML = vales;
    document.getElementById('BDSLOGDOWNLOAD').appendChild(logDownload);
}

function DownloadBDS(){
    logD("Iniciando o download");
    var jsonNumber = document.getElementById('bds-Server_download').value
    fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(langArray => {
        var Vdown = JSON.parse(langArray).Versions[jsonNumber]
        localStorage.setItem('bds_server_version', Vdown)
        if (process.platform == 'win32'){
            var URLd = `https://minecraft.azureedge.net/bin-win/bedrock-server-${Vdown}.zip`
        } else if (process.platform == 'linux'){
            var URLd = `https://minecraft.azureedge.net/bin-linux/bedrock-server-${Vdown}.zip`
        }
        console.log(URLd, NAMEd)
        var NAMEd = 'bedrock-server-' + Vdown + '.zip'
        // 
        var exec = require('child_process').exec;
        var downloadBDSchild = exec(`cd %TMP% && curl ${URLd} --output ${NAMEd}`);
        downloadBDSchild.stdout.on('data', function (data) {
            logD(data)
        });
        downloadBDSchild.on('exit', function (code) {
            if (code == 0){
                logD('download Sucess');
                logD('init extract');
                // Unzip
                var DecompressZip = require('decompress-zip');
                var ZIP_FILE_PATH = `${process.env.TMP}/${NAMEd}`;
                var unzipper = new DecompressZip(ZIP_FILE_PATH);
                
                // Add the error event listener
                unzipper.on('error', function (err) {
                    logD('Caught an error');
                    logD(err);
                });
                
                // Notify when everything is extracted
                unzipper.on('extract', function (log) {
                    logD('Finished extracting', log+'');
                    logD('-----------------------------------------------------------')
                });
                
                // Notify "progress" of the decompressed files
                unzipper.on('progress', function (fileIndex, fileCount) {
                    console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
                });
                
                // Start extraction of the content
                unzipper.extract({
                    path: 'bds',
                    filter: function (file) {
                        return file.type !== "SymbolicLink";
                    }
                });
                // End Unzip
            }
        });
    });
}

