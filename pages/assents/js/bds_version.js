// Download BDS Software
// Id selecttion: bds-Server_download
fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/Server.json').then(response => response.text()).then(langArray => {
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
// const { DownloadItem } = require("electron");

function DownloadBDS(){
    document.getElementById("BDSLOGDOWNLOAD").style.display = "block"
    document.getElementById("BDSLOGDOWNLOAD").value += "Iniciando o download\n";
    var jsonNumber = document.getElementById('bds-Server_download').value
    fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/Server.json').then(response => response.text()).then(langArray => {
        var Vdown = JSON.parse(langArray).Versions[jsonNumber]
        localStorage.setItem('bds_server_version', Vdown)
        var URLd = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + Vdown + '.zip'
        var NAMEd = 'bedrock-server-' + Vdown + '.zip'
        // 
        var exec = require('child_process').exec;
        var downloadBDSchild = exec(`cd %TMP% && curl ${URLd} --output ${NAMEd}`);
        downloadBDSchild.stdout.on('data', function (data) {
            document.getElementById('LOG').innerHTML += (data)
        });
        downloadBDSchild.on('exit', function (code) {
            if (code == 0){
                document.getElementById("BDSLOGDOWNLOAD").value += 'download Sucess\n';
                document.getElementById("BDSLOGDOWNLOAD").value += 'init extract\n';
                // Unzip
                var DecompressZip = require('decompress-zip');
                var ZIP_FILE_PATH = `${process.env.TMP}/${NAMEd}`;
                var unzipper = new DecompressZip(ZIP_FILE_PATH);
                
                // Add the error event listener
                unzipper.on('error', function (err) {
                    document.getElementById("BDSLOGDOWNLOAD").value += 'Caught an error\n';
                    document.getElementById("BDSLOGDOWNLOAD").value += err+'\n';
                });
                
                // Notify when everything is extracted
                unzipper.on('extract', function (log) {
                    document.getElementById("BDSLOGDOWNLOAD").value += 'Finished extracting', log+'\n';
                    document.getElementById("BDSLOGDOWNLOAD").value += '-----------------------------------------------------------'
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
                var exec = require('child_process').exec;
                var dirFiles = exec(`dir`, {detached: false,shell: true});
                dirFiles.stdout.on('data', function (data){
                    document.getElementById("BDSLOGDOWNLOAD").value += data
                })
            }
        });
    });
}

