/* Bouton catégories */ 
 
button#CategorySelectAdd {
display:inline-block !important;
$(document).ready(function() {
	var ug = wgUserGroups.join(' ');
	if(ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('vstf') + ug.indexOf('sysop') + ug.indexOf('rollback') > -5) {
}