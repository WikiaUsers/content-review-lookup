/* Alternate Infobox */
var eInfobox_x = false;
 
$('.eInfobox_Parent').mouseenter(function() {
    if(eInfobox_x == false){
         $('.eInfobox_Collapsible').css('height', '24px');
    }
});
 
$('.eInfobox_Parent').mouseleave(function() {
    if(eInfobox_x == false){
         $('.eInfobox_Collapsible').css('height', '0px');
    }
});
 
$('.eInfobox_Parent').click(function() {
    if(eInfobox_x == false){
         eInfobox_x = true;
         $('.eInfobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
         return;
    }
    if(eInfobox_x == true){
         eInfobox_x = false;
         $('.eInfobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
         return;
    }
});
/* END Alternate Infobox */