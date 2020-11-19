var fs = require("fs");
var admins = fs.readFileSync(`./blocks.json`, 'utf-8');

var adm = JSON.parse(admins)
for(index in adm){
    console.log(`\"${index}\",`)
    index++;
}