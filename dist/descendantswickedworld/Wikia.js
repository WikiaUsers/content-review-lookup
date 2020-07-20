/*---------------------- Framekiller ----------------------------------*/
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
if (parent.frames.length > 0) {
    var file = document.referrer.match(/imgurl=(.*?)&/);
    if (file.length > 0) {
        top.location.href = document.location.href + '?file=' + file[1].split('/').pop();
    } else {
        top.location.href = document.location.href
    }
}
/*---------------------- SpoilerAlert ----------------------------------*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
/*--------------------------------------------------------------------*/
 
$(".pi-title, .pi-header").css({'background':$(".infoboxcolors").data('backgroundcolor'), 'color':$(".infoboxcolors").data('fontcolor')});