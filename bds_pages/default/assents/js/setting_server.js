// eslint-disable-next-line no-undef
var CONFIGS = bds_get_settings()
document.getElementById("name").value = CONFIGS.server_name;document.getElementById("gameMode").value = CONFIGS.gamemode;document.getElementById("difficulty").value = CONFIGS.difficulty;document.getElementById("timeout_server").value = CONFIGS.player_idle_timeout;document.getElementById("level_name").value = CONFIGS.level_name;document.getElementById("permissions").value = CONFIGS.default_player_permission_level;document.getElementById("max_pla").value = CONFIGS.max_players

// cheats
if (CONFIGS.allow_cheats === "true"){document.getElementById("cheats").checked = true} else {document.getElementById("cheats").checked = false}
// online mode
if (CONFIGS.online_mode === "true"){document.getElementById("xbox").checked = true} else {document.getElementById("xbox").checked = false}
// cheats
if (CONFIGS.white_list === "true"){document.getElementById("whitelist").checked = true} else {document.getElementById("whitelist").checked = false}

// eslint-disable-next-line no-unused-vars
function setCONFIG(){var nullo = "";
    if (document.getElementById("name").value === nullo){alert("Add a description")}
    if (document.getElementById("level_name").value === nullo){alert("Choose a name for your map")}
    bds_settings(`{
        "name": "${document.getElementById("level_name").value}",
        "description": "${document.getElementById("name").value}",
        "gamemode": "${document.getElementById("gameMode").value}",
        "difficulty": "${document.getElementById("difficulty").value}",
        "cheats": ${document.getElementById("cheats").checked},
        "players": ${document.getElementById("max_pla").value},
        "xbox": ${document.getElementById("xbox").checked},
        "white_list": ${document.getElementById("whitelist").checked},
        "port": 19132,
        "port6": 19133,
        "player_permission": "${document.getElementById("permissions").value}"
    }`)
}