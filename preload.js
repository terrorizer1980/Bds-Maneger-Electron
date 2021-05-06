// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const { resolve } = require("path");

process.once("loaded", () => {
    const bds = require("@the-bds-maneger/core");
    global.bds = bds;

    process.env.BDS_MONI = true
    process.env.ENABLE_BDS_API = true

    global.bds_control = bds;
    global.bds_core = bds;
    
    global.bds_maneger_api = bds.rest;
    global.bds_stop = bds.stop;
    global.bds_start = bds.start;
    global.bds_command = bds.command;
    global.bds_kill = bds.kill;
    global.bds_detect = bds.detect;
    global.bds_core_version = bds.package_json.version;
    global.bds_maneger_version = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf8")).version;
    global.bds_settings = bds.set_config;
    global.bds_get_settings = bds.get_config;
    global.bds_download = bds.download
    global.bds_backup = bds.backup
    global.bds_drive_backup = bds.drive_backup;

    // Install Packages
    let loadConfig = JSON.parse(readFileSync(resolve(__dirname, "bds_pages", bds.bds_config.bds_pages, "config.json"), "utf8"))
    if (loadConfig.Package){
        if (loadConfig.Package.length > 0) {
        if (process.env.IS_DEVELEOP){
            for (let PackageInstall of loadConfig.Package) {
            console.log(`Package Install: ${PackageInstall}, log: `+ execSync(`npm install --no-save ${PackageInstall}`, {cwd: __dirname}).toString());
            }
        }
        }
    }
});