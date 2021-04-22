/* 

fetch("https://api.github.com/repos/Sirherobrine23/Bds-Maneger-for-Windows/releases").then(response => response.text()).then(releaseMSI => {
    const obj3 = JSON.parse(releaseMSI);
    var download_url = obj3[0].assets[1]
    localStorage.setItem("url_update", download_url);
    localStorage.setItem("url_update", download_url);
    localStorage.setItem("url_update", download_url);
});

fetch("https://raw.githubusercontent.com/Bds-Maneger/Raw_files/main/Server.json").then(response => response.text()).then(serverVURLv => {
        const obj2 = JSON.parse(serverVURLv);
        const serverV = obj2.latest;
        const serverVurl = "https://minecraft.azureedge.net/bin-win/bedrock-server-" + serverV + ".zip"
        localStorage.setItem("bds_server_latestV", serverV)
        localStorage.setItem("bds_server_url", serverVurl)
    }
);

*/