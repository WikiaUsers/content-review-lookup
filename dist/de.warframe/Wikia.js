/* WaffenInfobox */
var Infobox_x = false;
 
$('.Infobox_Parent').mouseenter(function() {
    if(Infobox_x == false){
         $('.Infobox_Aufklappbar').css('height', '24px');
         $('.Infobox_Aufklappbar').css('margin', '1px 0');
    }
});
 
$('.Infobox_Parent').mouseleave(function() {
    if(Infobox_x == false){
         $('.Infobox_Aufklappbar').css('height', '0');
         $('.Infobox_Aufklappbar').css('margin', '0');
    }
});

$('.Infobox_Parent').click(function() {
    if(Infobox_x == false){
         Infobox_x = true;
         return;
    }
    if(Infobox_x == true){
         Infobox_x = false;
         return;
    }
});
/* Ende WaffenInfobox */


/* Allgemeine Infobox */
var einfobox_clicked = false;

$('.einfobox').mouseenter(function() {
    if(einfobox_clicked == false) {
         $('.einfobox_collapsible').css('display', 'block');
    }
});
 
$('.einfobox').mouseleave(function() {
    if(einfobox_clicked == false){
         $('.einfobox_collapsible').css('display', 'none');
    }
});
 
$('.einfobox').click(function() {
    if(einfobox_clicked == false){
         einfobox_clicked = true;
         return;
    }
    if(einfobox_clicked == true){
         einfobox_clicked = false;
         return;
    }
});
/* Ende Allgemeine Infobox */