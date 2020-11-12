function auto_resize(){
    var he = window.innerHeight - 150;
    var wi = window.innerWidth - 115;
    var clsa = ('height:'+ he + 'px;'+'width:'+ wi +'px;')
    document.getElementById('LOG').setAttribute("style", clsa); 
}
function resizecommands(){
    var wi = window.innerWidth * 30 / 90;
    var clsa = ('width:'+ wi +'px;')
    document.getElementById('commandsends').setAttribute("style", clsa);
}
setInterval(function(){
    auto_resize();
    resizecommands();
}, 0);