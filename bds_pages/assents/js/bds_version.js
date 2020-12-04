// This script, manage the versions of Minecraft Bedrock Server, this file has not yet been included in core_service.js
// Download BDS Software
// Id selecttion: bds-Server_download
function logD(vales){
    var logDownload = document.createElement("p");
    logDownload.innerHTML = vales;
    document.getElementById('BDSLOGDOWNLOAD').appendChild(logDownload);
}

function DownloadBDS(){require('bds_maneger_api').version_Download(document.getElementById('bds-Server_download').value)};
document.getElementById('bds-Server_download').innerHTML = require('bds_maneger_api').get_version()