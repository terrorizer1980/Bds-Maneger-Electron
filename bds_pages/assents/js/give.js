// thinking about how it will be, just 'one more thing'
// userI |--> Users
// giveI |--> Item
var newSelect = document.getElementById('giveI')
fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.16.2/items.json').then(response => response.json()).then(Jfi => {
        for(index in Jfi){
            var opt = document.createElement("option");
            opt.value= Jfi[index].name
            opt.innerHTML = Jfi[index].displayName
            // Taca tudo do select
            newSelect.appendChild(opt);
            index++;
        }
    }
);
/*fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/1.16.2/blocks.json').then(response => response.json()).then(Jfi2 => {
        for(index in Jfi2){
            var opt = document.createElement("option");
            opt.value= Jfi2[index].name
            opt.innerHTML = Jfi2[index].displayName
            // Taca tudo do select
            newSelect.appendChild(opt);
            index++;
        }
    }
);*/

function getListUser(){
    var before_get_command = document.getElementById("LOG").innerHTML;
    serverstated.stdin.write('list'+'\n');
    setTimeout(() => {
        var list_user = document.getElementById("LOG").innerHTML.replace(before_get_command, '');
        var tes = list_user.replace("There are", '')
        var tes2 = tes.replace("players online:", '')
        console.log(tes2)
    }, 3600);
}

function getI() {
    var item = document.getElementById('giveI').value
    var user = document.getElementById('userI').value
    var tant = document.getElementById('tant').value
    serverstated.stdin.write(`give ${user} ${item} ${tant}\n`);
};
