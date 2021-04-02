// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const bds = require("@the-bds-maneger/core");
const fs = require("fs")
const path = require("path")
process.once("loaded", () => {
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
  global.bds_app_version = JSON.parse(fs.readFileSync(path.resolve(__dirname ,"package.json"))).version;
  global.bds_settings = bds.set_config;
  global.bds_get_settings = bds.get_config;
  global.bds_download = bds.download
  global.bds_backup = bds.backup
  global.bds_drive_backup = bds.drive_backup
});