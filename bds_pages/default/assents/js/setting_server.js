var CONFIGS = bds_get_settings()
// 9 values
document.getElementById('name').value = CONFIGS.server_name
document.getElementById('gameMode').value = CONFIGS.gamemode
document.getElementById('difficulty').value = CONFIGS.difficulty

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
        alert('Add a description')
    }
    if (document.getElementById('level_name').value == nullo){
        alert('Choose a name for your map')
    }
    var server_name = `${document.getElementById('name').value}`,
    gamemode = `${document.getElementById('gameMode').value}`,
    difficulty = `${document.getElementById('difficulty').value}`,
    allow_cheats = `${document.getElementById('cheats').checked}`,
    max_players = `${document.getElementById('max_pla').value}`,
    online_mode = `${document.getElementById('xbox').checked}`,
    white_list = `${document.getElementById('whitelist').checked}`,
    level_name = `${document.getElementById('level_name').value}`,
    default_player_permission_level = `${document.getElementById('permissions').value}`;
    var config_json = `{"name": "${level_name}", "description": "${server_name}", "gamemode": "${gamemode}", "difficulty": "${difficulty}", "cheats": ${allow_cheats}, "players": ${max_players}, "xbox": ${online_mode}, "white_list": ${white_list}, "port": 19132, "port6": 19133, "player_permission": "${default_player_permission_level}"}`;
    console.log(config_json)
    bds_settings(config_json);
};