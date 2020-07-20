
/* Чтобы был виден участникам их собственный ник */
 
$(function() {
	if ( !wgUserName ) return;
	$('.insertusername').html(wgUserName);
});