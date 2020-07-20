/* Unit Infobox */
var Infobox_x = false;
 
$('.Infobox_Parent').mouseenter(function () {
    if (Infobox_x === false) {
        $('.Infobox_Collapsible').css('height', '24px');
        $('.Infobox_Collapsible').css('margin-bottom', '2px');
    }
});
 
$('.Infobox_Parent').mouseleave(function () {
    if (Infobox_x === false) {
        $('.Infobox_Collapsible').css('height', '0px');
        $('.Infobox_Collapsible').css('margin-bottom', '0px');
    }
});
 
$('.Infobox_Parent').click(function () {
    if (Infobox_x === false) {
        Infobox_x = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (Infobox_x === true) {
        Infobox_x = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});
/* END Unit Infobox */
 
/* START Collapsible Infoboxes */
var einfobox_clicked = false;
 
$('.einfobox').mouseenter(function () {
    if (einfobox_clicked === false) {
        $('.einfobox_collapsible').css('display', 'table-row');
    }
});
 
$('.einfobox').mouseleave(function () {
    if (einfobox_clicked === false) {
        $('.einfobox_collapsible').css('display', 'none');
    }
});
 
$('.einfobox').click(function () {
    if (einfobox_clicked === false) {
        einfobox_clicked = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (einfobox_clicked === true) {
        einfobox_clicked = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});