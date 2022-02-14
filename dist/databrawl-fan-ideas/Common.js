/* Any JavaScript here will be loaded for all users on every page load. */

/* LockForums and LockOldBlogs customization */
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 90
    expiryMessage: "This thread has been locked in order to prevent necroposting."
};

window.LockOldBlogs = {
    expiryDays: 90
};

/* Inserts viewing user's name into <span class="insertusername"></span> */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}