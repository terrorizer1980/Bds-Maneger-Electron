// Core_Script for the Default page of bds_maneger
// Some Scripts must not be broken to the other pages if they have not been broken, but can be integrated


// function auto_resize(){
//     var he = window.innerHeight - 150;
//     var wi = window.innerWidth - 115;
//     var clsa = ('height:'+ he + 'px;'+'width:'+ wi +'px;')
//     document.getElementById('LOG').setAttribute("style", clsa); 
// }
// setInterval(function(){
//     auto_resize();
// }, 0);

if (localStorage.getItem('autostartBds') == 1){
    startServer();
    console.log('Auto Start')
    document.getElementById('autostart').setAttribute('checked', 'true');
} else {
    console.log('Not auto start Bds');
    document.getElementById('autostart').removeAttribute('checked');
};
function checkedBox(){
    // var getAutostart = document.getElementById('autostart').checked
    if (document.getElementById('autostart').checked){
        localStorage.setItem('autostartBds', '1');
        localStorage.setItem('autostartBds', '1');
        localStorage.setItem('autostartBds', '1');
    } else {
        localStorage.setItem('autostartBds', '0');
        localStorage.setItem('autostartBds', '0');
        localStorage.setItem('autostartBds', '0');
    }
};


fetch('https://api.github.com/repos/Sirherobrine23/Bds-Maneger-for-Windows/releases').then(response => response.text()).then(releaseMSI => {
    const obj3 = JSON.parse(releaseMSI);
    var download_url = obj3[0].assets[1]
    localStorage.setItem('url_update', download_url);
    localStorage.setItem('url_update', download_url);
    localStorage.setItem('url_update', download_url);
  }
);

fetch('https://raw.githubusercontent.com/Bds-Maneger/Raw_files/main/Server.json').then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const serverV = obj2.latest;
        const serverVurl = 'https://minecraft.azureedge.net/bin-win/bedrock-server-' + serverV + '.zip'
        localStorage.setItem('bds_server_latestV', serverV)
        localStorage.setItem('bds_server_url', serverVurl)
    }
);


