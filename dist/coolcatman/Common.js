/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('messageWall.activated').add(function () {
	console.log('I know that MW works!', document.querySelectorAll('.MessageWallForum .wds-dropdown'));
})