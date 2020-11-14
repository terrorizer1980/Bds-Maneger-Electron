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
    var jsonNumber = document.getElementById('bds-Server_download').value
    fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/Server.json').then(response => response.text()).then(langArray => {
        var Vdown = JSON.parse(langArray).Versions[jsonNumber]
        var URLd = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + Vdown + '.zip'
        var NAMEd = 'bedrock-server-' + Vdown + '.zip'
        localStorage.setItem('NAMEDOWNLOAD', NAMEd)
        localStorage.setItem('NAMEDOWNLOAD', NAMEd)
        localStorage.setItem('NAMEDOWNLOAD', NAMEd)
        localStorage.setItem('NAMEDOWNLOAD', NAMEd)
        localStorage.setItem('NAMEDOWNLOAD', NAMEd)
        open(URLd)
        var he = window.innerHeight - 10;
        var wi = window.innerWidth - 10;
        var clsa = ('height:'+ he + 'px;'+'width:'+ wi +'px;')
        document.getElementById('DRAGAREA').setAttribute("style", clsa); 
        document.getElementById("TRAGZIP").style.display = "block";
        document.getElementById("navbarID").style.display = "none";
        // Unzip
        var DecompressZip = require('decompress-zip');
        (function () {
            var holder = document.getElementById('drag-zip');
            
            holder.ondragover = holder.ondragleave = holder.ondragend = () => {
                return false;
            };

            holder.ondrop = (e) => {
                e.preventDefault();

                var firstFile = e.dataTransfer.files[0];

                if(!firstFile){
                    console.log("No file given");
                    return;
                }

                var unzipper = new DecompressZip(firstFile.path);

                unzipper.on('error', (err)  => {
                    console.log('Caught an error', err);
                    alert('Houve um Erro')
                    document.getElementById("TRAGZIP").style.display = "none";
                    document.getElementById("navbarID").style.display = "block";
                });
                
                // Notify when everything is extracted
                unzipper.on('extract', function (log) {
                    console.log('Finished extracting', log);
                    document.getElementById("TRAGZIP").style.display = "none";
                    document.getElementById("navbarID").style.display = "block";
                });

                // Notify "progress" of the decompressed files
                unzipper.on('progress', function (fileIndex, fileCount) {
                    console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
                });
                
                // Start extraction of the content
                unzipper.extract({
                    path: 'C:/mcpe_extract'
                });
                                
                return false;
            };
        })();
        // End Unzip
        

    });
}

