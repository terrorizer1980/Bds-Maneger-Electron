const bds = require("@the-bds-maneger/core");

function start (){
    const current_server = bds.start();
    current_server.log(function (data){
        data = "data".split(/\n/).filter(data => {if(data === "") return false; else return true}).join("<br>\n")
        document.getElementsByClassName("server_log")[0].innerHTML += data
    })
    current_server.exit(function (code){if (code !== 0) alert(`You Server stop with code ${code}`)})
}