fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/package.json').then(response => response.text()).then(dataURLv => {
    const obj1 = JSON.parse(dataURLv);
    const latestV = obj1.version;
    const localV = require('electron').remote.app.getVersion()
    const check_latest_version = latestV >= localV
        if (check_latest_version){
            console.log('Voçê está na ultima versão')
        } else {
            if (confirm('You not have latest Version, is open in new Windows Download Pages')){
                window.open("https://github.com/Sirherobrine23/Bds_Maneger-for-Windows/releases", 'Github Release Download Pages');
            }
        }
    }
);

fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/Server.json').then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const serverV = obj2.latest;
        const serverVurl = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + serverV + '.zip'
        localStorage.setItem('bds_server_latestV', serverV)
        localStorage.setItem('bds_server_url', serverVurl)
    }
);


fetch('https://api.github.com/repos/Sirherobrine23/Bds_Maneger-for-Windows/releases').then(response => response.text()).then(releaseMSI => {
    const obj3 = JSON.parse(releaseMSI);
     const download_url = obj3[0].assets[1].browser_download_url
     localStorage.setItem('url_update', obj3)
    }
);