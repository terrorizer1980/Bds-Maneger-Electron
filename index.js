const express = require("express");
const app = express();
const http = require("http");
const { resolve } = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bds = require("@the-bds-maneger/core");
const { existsSync, writeFileSync, readFileSync } = require("fs");
const uuid = require("uuid").v4
const bodyParser = require("body-parser");
const { tmpdir } = require("os");

// Settings
const SessionPathUID = resolve(tmpdir(), "BdsSessions.UUID")
function SessionVerifify(UID){
    try {
        const uuid = readFileSync(SessionPathUID).toString().split("\n").join("")
        return UID === uuid
    } catch (error) {
        return false
    }
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// URi
function sendLog(data){
    data = `${data}`.split("\n").filter(data =>{return (data !== "")})
    io.emit("BdsLog", data);
    for (let log of data) console.log(log);
}

app.get("/", (req, res) => res.redirect("/login"));
app.get("/index/:UUID", (req, res) => {
    const parms = req.params
    if (!(SessionVerifify(parms.UUID))) res.redirect("/login");
    res.sendFile(resolve(__dirname, "page", "index.html"));
});

app.post("/GetUserID", (req, res) => {
    const body = req.body
    const UserConfig = resolve(process.cwd(), "User.json")
    if (!(existsSync(UserConfig))) writeFileSync(UserConfig, JSON.stringify({
        user: uuid(),
        pass: uuid().split("-").join("").substr(-8)
    }, null, 4))
    const config = JSON.parse(readFileSync(UserConfig, "utf8"))
    
    // Return Status
    if ((body.pass !== config.pass)) res.redirect("/login?error=User")
    else if (body.user !== config.user) res.redirect("/login?error=Pass")
    else {
        const uuidX = `${uuid().split("-").join("").substr(-(parseInt(Math.random() * 1000)))}${uuid().split("-").join("").substr(-(parseInt(Math.random() * 1000)))}${uuid().split("-").join("").substr(-(parseInt(Math.random() * 1000)))}`
        writeFileSync(SessionPathUID, uuidX)
        res.redirect(`/index/${uuidX}`);
    }
})

app.get("/login", (req, res) => {res.sendFile(resolve(__dirname, "page/login.html"))})

app.post("/service", (req, res) => {
    const _h = req.headers.command;
    const status = {
        code: 401,
        te: "Error"
    }
    if (_h === "start") {
        const bdsstart = bds.start();
        bdsstart.log(data => sendLog(data))
        status["te"] = "Sucess";
        status["code"] = 201;
    }
    res.send(status["te"])
})

io.on("connection", (socket) => {
    console.log(`User Id Connected: ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`Usuario desconectado ${socket.id}`);
    })
});

app.get("*", (req, res) => res.redirect("/login"));
server.listen(3000, () => {
  console.log("listening on *:3000");
});