/*
 * NPROFILE
 * Napisane przez Py64
 * Data utworzenia: 18.10.2014r. 13:49
 * Nowe profile
*/
if($.cookie("nprofiles") == 1 || $.cookie("nprofiles") == null) {
var profiledetails=$('.masthead-info .details').clone();
var profileavatar=$('.masthead-avatar').clone();
var profileinfo=$('.masthead-info hgroup').clone();
$('.UserProfileMasthead').empty();
console.log(profiledetails);
console.log(profileavatar);
console.log(profileinfo);
$('.UserProfileMasthead').load('/wiki/MediaWiki:NProfile?action=raw');
}
 
function disableNProfiles() {
alert('Kontynuowanie wyłączy nowe profile aż do wyczyszczenia cookies.');
$.cookie("nprofiles", 0); // 0 = false, 1 = true;
location.reload();
}