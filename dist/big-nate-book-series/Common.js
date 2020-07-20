/* Any JavaScript here will be loaded for all users on every page load. */
/* Username replace feature. Inserts viewing user's name into <span class="insertusername"></span> */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}