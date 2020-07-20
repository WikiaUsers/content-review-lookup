/* Any JavaScript here will be loaded for all users on every page load. */
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=151981424827777&connections=5" align="top" frameborder="0" width="300" height="175" scrolling="no" />');
}
 
$(fBox);

//From the Dev Wiki, an Inactive Users tag.

importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 1 };