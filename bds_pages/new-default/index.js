function start (){
    const current_server = require("@the-bds-maneger/core").start();
    current_server.log(function (data){
        data = data.split(/\n/).join("<br>\n")
        document.getElementsByClassName("server_log")[0].innerHTML += data
    })
    current_server.exit(function (code){if (code !== 0) alert(`You Server stop with code ${code}`)})
    document.getElementById("stopbuttom").onclick = function (){
        current_server.stop()
    }
    document.getElementById("commandButtom").onclick = function (){
        const TextCommand = document.getElementById("command_area").value
        current_server.command(TextCommand)
    }
}