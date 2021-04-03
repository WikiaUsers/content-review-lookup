/*---------------------- Framekiller ----------------------------------*/

if (parent.frames.length > 0) {
    var file = document.referrer.match(/imgurl=(.*?)&/);
    if (file.length > 0) {
        top.location.href = document.location.href + '?file=' + file[1].split('/').pop();
    } else {
        top.location.href = document.location.href;
    }
}


/*--------------------------------------------------------------------*/
$(".pi-image").css({'background':$(".infoboxcolors").data('imagebackgroundcolor')});
$(".pi-data").css({'background':$(".infoboxcolors").data('databackgroundcolor'), 'color':$(".infoboxcolors").data('datafontcolor')});