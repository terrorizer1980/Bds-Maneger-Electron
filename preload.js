process.once("loaded", () => {
    const bds = require("@the-bds-maneger/core");
    global.bds_core = bds;
    global.bds = bds;

    process.env.BDS_MONI = true
    process.env.ENABLE_BDS_API = true

    global.bds_control = bds;
    global.bds_core = bds;
    
    global.bds_maneger_api = bds.api;
    global.bds_start = bds.start;
    global.bds_kill = bds.kill;
    global.bds_detect = bds.detect;
    global.bds_core_version = bds.package_json.version;
    global.bds_maneger_version = require("./package.json").version;
    global.bds_settings = bds.set_config;
    global.bds_get_settings = bds.get_config;
    global.bds_download = bds.download;
    global.bds_backup = bds.backup;
    global.bds_drive_backup = bds.backup;
});