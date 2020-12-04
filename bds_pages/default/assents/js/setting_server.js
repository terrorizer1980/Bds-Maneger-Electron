const os = require('os')
const cpuCount = os.cpus().length
/* CONFIG */
/*
server-name=Dedicated Server
gamemode=survival
difficulty=easy
allow-cheats=false
max-players=10
online-mode=true
white-list=false
server-port=19132
server-portv6=19133
view-distance=32
tick-distance=4
player-idle-timeout=30
max-threads=8
level-name=Bedrock level
level-seed=
default-player-permission-level=member
texturepack-required=false
content-log-file-enabled=false
compression-threshold=1
server-authoritative-movement=server-auth
player-movement-score-threshold=20
player-movement-distance-threshold=0.3
player-movement-duration-threshold-in-ms=500
correct-player-movement=false
*/
if (process.platform == 'win32'){
    var bdsCONFIG = `${process.env.USERPROFILE}/bds_Server/server.properties`;
} else if (process.platform == 'linux'){
    var bdsCONFIG = `${process.env.HOME}/bds_Server/server.properties`;
};
var fs = require("fs")
const propertiesToJSON = require("properties-to-json")
var CONFIGS = propertiesToJSON(fs.readFileSync(bdsCONFIG, "utf-8").replaceAll('-','_'))
// 9 values
document.getElementById('name').value = CONFIGS.server_name
document.getElementById('gameMode').value = CONFIGS.gamemode
document.getElementById('difficulty').value = CONFIGS.difficulty
// document.getElementById('view_dis').value = CONFIGS.view_distance
// document.getElementById('tick_dis').value = CONFIGS.tick_distance
document.getElementById('timeout_server').value = CONFIGS.player_idle_timeout
document.getElementById('level_name').value = CONFIGS.level_name
document.getElementById('permissions').value = CONFIGS.default_player_permission_level
document.getElementById('max_pla').value = CONFIGS.max_players
// 3 Chekeds
// cheats
if (CONFIGS.allow_cheats == 'true'){
    document.getElementById('cheats').checked = true
} else {
    document.getElementById('cheats').checked = false
};

// online mode
if (CONFIGS.online_mode == 'true'){
    document.getElementById('xbox').checked = true
} else {
    document.getElementById('xbox').checked = false
};

// cheats
if (CONFIGS.white_list == 'true'){
    document.getElementById('whitelist').checked = true
} else {
    document.getElementById('whitelist').checked = false
};
function setCONFIG(){
    var nullo = '';
    if (document.getElementById('name').value == nullo){
        alert('Adiocione uma descrição')
    }
    if (document.getElementById('level_name').value == nullo){
        alert('Escolha um nome para seu mapa')
    }
    var server_name = `server-name=${document.getElementById('name').value}`,
    gamemode = `gamemode=${document.getElementById('gameMode').value}`,
    difficulty = `difficulty=${document.getElementById('difficulty').value}`,
    allow_cheats = `allow-cheats=${document.getElementById('cheats').checked}`,
    max_players = `max-players=${document.getElementById('max_pla').value}`,
    online_mode = `online-mode=${document.getElementById('xbox').checked}`,
    white_list = `white-list=${document.getElementById('whitelist').checked}`,
    view_distance = `view-distance=32`,
    tick_distance = `tick-distance=6`,
    player_idle_timeout = `player-idle-timeout=${document.getElementById('timeout_server').value}`,
    max_threads = `max-threads=${cpuCount}`,
    level_name = `level-name=${document.getElementById('level_name').value}`,
    default_player_permission_level = `default-player-permission-level=${document.getElementById('permissions').value}`,
    texturepack_required = 'texturepack-required=false';
    fs.writeFile(bdsCONFIG, `${server_name}\n${gamemode}\n${difficulty}\n${allow_cheats}\n${max_players}\n${online_mode}\n${white_list}\n${view_distance}\n${tick_distance}\n${player_idle_timeout}\n${max_threads}\n${level_name}\n${default_player_permission_level}\n${texturepack_required}\n`, function (err) {
        if (err) throw err;
            alert('Config create Sucess');
    });
};