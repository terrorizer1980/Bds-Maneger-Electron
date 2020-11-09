// document.getElementById('LOG').innerHTML
// 'Log-gui.txt', ''

var type = 'text/plain'
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
const filename = today +'-Log-gui.txt'



// Function to download data to a file
function log_download() {
    var datavalue = document.getElementById('LOG').value;
    // var dataine = document.getElementById('LOG').innerHTML;
    var file = new Blob([datavalue], {type: type});
    var a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.getElementById("scr").appendChild(a);
    console.log(url)
    a.click();
}