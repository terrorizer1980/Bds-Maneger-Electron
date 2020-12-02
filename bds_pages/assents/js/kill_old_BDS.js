// This script server to forcefully kill old servers without being stopped before closing the application or having reloaded the page, an alternative and safer way is being sought.var
var status = localStorage.getItem('bds_status')
var blank = ''
if (status == blank){
    console.log('Init server')
    localStorage.setItem('bds_status', 'stoped')
    window.location.reload(true);
}
if (status == 'started') {
    require('bds_maneger_api').kill()
    localStorage.setItem('bds_status', 'stoped')
    window.location.reload(true);
}