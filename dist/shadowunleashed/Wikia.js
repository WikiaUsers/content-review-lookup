/*
DO NOT EDIT THIS PAGE UNLESS YOU ARE AUTHORIZED.
*/

//Load code pages
importArticles({
    type:'script',
    articles: [
        'MediaWiki:Wikia.js/customModules.js',
        'MediaWiki:Wikia.js/customAccessControl.js',
        'MediaWiki:Wikia.js/markForStandards.js',
        'MediaWiki:Wikia.js/markForDeletion.js',
        'MediaWiki:Wikia.js/markForCleanup.js',
        'MediaWiki:Wikia.js/markAsUnsure.js',
        ]
});
var $mouseX = 0, $mouseY = 0;
var $xp = 0, $yp =0;

$(document).mousemove(function(e){
    $mouseX = e.pageX;
    $mouseY = e.pageY;    
});

var $loop = setInterval(function(){
// change 12 to alter damping higher is slower
$xp += (($mouseX - $xp)/12);
$yp += (($mouseY - $yp)/12);
$("#omochao").css({left:$xp +'px', top:$yp +'px'});  
}, 30);

$("a").hover(function() {
    $("#link").css({visibility: hidden});
});