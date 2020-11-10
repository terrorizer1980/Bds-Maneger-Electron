var url = 'https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/main/package.json';
fetch(url).then(response => response.text()).then(dataURLv => {var obj1 = JSON.parse(dataURLv);var latestV = obj1.version;localStorage.setItem('bds_gitv', latestV)});
var latestVersion = localStorage.getItem('bds_gitv');
const localV = require('electron').remote.app.getVersion()
console.log('Ultima Versão Disponivel no repositorio: '+ latestVersion, 'Sua Versão local: '+localV)
var check_latest_version = latestVersion >= localV

if (check_latest_version){
    alert('You not have latest Version, is open in new Windows Download Pages');
    window.open("https://github.com/Sirherobrine23/Bds_Maneger-for-Windows/releases", 'Github Release Download Pages');
}