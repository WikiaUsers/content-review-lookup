/*
 * NNAV
 * Napisane przez Py64
 * Data utworzenia: 18.10.2014r. 13:49
 * Nawigacja
*/
$('.wikia-bar .toolbar .tools').append('<li><a onclick="opennnav()">Nawigacja</a></li>');
$('<div class="nnav"><nav></nav></div>').appendTo('body');
$('.nnav').append('<div class="nnav-userdetails"></div>');
$('.nnav-userdetails').load('/wiki/MediaWiki:NNavigationUserDetails?action=raw');
$('.nnav').hide();
function opennnav() {
if($('.nnav').is(':visible')){
$('.nnav').hide();
$('.nnav nav').empty();
}else{
$('.nnav nav').load('/wiki/MediaWiki:NNavigationList?action=raw');
$('.nnav').show();
}
}