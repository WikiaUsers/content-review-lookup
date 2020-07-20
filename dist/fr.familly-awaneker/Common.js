/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

// Signature de Franky003

$('#sigfrslide').slideUp();
$('#sigfr center').mouseover(function () {
$(this).css('box-shadow', '0 0 9px black, 0 0 9px black');
$('#sigfrslide').slideDown(2000);
$('#sigfr center').mouseout(function () {
$(this).css('box-shadow', '0 0 4px black, 0 0 4px black');
jQuery('#sigfrslide').slideUp(2000);
});
});