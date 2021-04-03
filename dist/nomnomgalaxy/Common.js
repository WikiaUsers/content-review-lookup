/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {

$(".mainpage-heading").each(function() {
    var x = Math.floor(Math.random()*3);
    switch(x) {
    case 0:
        $(this).css('background-image','url(//pixeljunkinc.gamepedia.com/media/b/be/Green-bar.png)');
        break;
    case 1:
        $(this).css('background-image','url(//pixeljunkinc.gamepedia.com/media/0/00/Grey-bar.png)');
        $(this).css('background-position','center top');
        break;
    default:
        $(this).css('background-image','url(//pixeljunkinc.gamepedia.com/media/0/09/Red-bar.png)');
    }
});

});