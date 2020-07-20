/* Brizingr5: WeaponInfobox */
var WeaponInfobox_x = false;
 
$('.WeaponInfobox_Parent').mouseenter(function() {
    if(WeaponInfobox_x == false){
         $('.WeaponInfobox_Collapsible').css('height', '24px');
    }
});
 
$('.WeaponInfobox_Parent').mouseleave(function() {
    if(WeaponInfobox_x == false){
         $('.WeaponInfobox_Collapsible').css('height', '0px');
    }
});
 
$('.WeaponInfobox_Parent').click(function() {
    if(WeaponInfobox_x == false){
         WeaponInfobox_x = true;
         $('.WeaponInfobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
         return;
    }
    if(WeaponInfobox_x == true){
         WeaponInfobox_x = false;
         $('.WeaponInfobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
         return;
    }
});
/* END Brizingr5: WeaponInfobox */