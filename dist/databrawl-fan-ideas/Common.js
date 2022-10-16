/* Any JavaScript here will be loaded for all users on every page load. */

/* Plugin Customizations */
window.BackToTopModern = true;
window.pPreview.defimage = 'https://static.wikia.nocookie.net/databrawl-fan-ideas/images/5/54/ClockworkThink.png/revision/latest?cb=20221003021836';

/* Inserts viewing user's name into <span class="insertusername"></span> */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}