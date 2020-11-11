var url_app = 'https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/package.json';
fetch(url_app).then(response => response.text()).then(dataURLv => {
    var obj1 = JSON.parse(dataURLv);
    var latestV = obj1.version;
    const localV = require('electron').remote.app.getVersion()
    console.log('Ultima Versão Disponivel no repositorio: '+ latestV, 'Sua Versão local: '+localV)
    var check_latest_version = latestV >= localV
        if (check_latest_version){
            console.log('Voçê está na ultima versão')
        } else {
            if (confirm('You not have latest Version, is open in new Windows Download Pages')){
                window.open("https://github.com/Sirherobrine23/Bds_Maneger-for-Windows/releases", 'Github Release Download Pages');
            }
        }
    }
);

var url_server = 'https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/Server.json';
fetch(url_server).then(response => response.text()).then(serverVURLv => {
    var obj1 = JSON.parse(serverVURLv);
    var serverV = obj1.latest;
    console.log(serverV)  
);
