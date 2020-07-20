/* Any JavaScript here will be loaded for all users on every page load. */

// Support for [[Template:USERNAME]]
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}