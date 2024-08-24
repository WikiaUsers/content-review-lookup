/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('messageWall.activated').add(function () {
	const appContainer = document.querySelector('.message-wall-app');
	const postsContainer = document.querySelector('.MessageWallForum');
	const helloMessage = document.createElement('div');

	helloMessage.textContent = 'Hello! Please be respectful.'

	helloMessage.style.color = 'red';

	helloMessage.style.padding = '10px';

	helloMessage.style.border = '1px solid red';

	helloMessage.style.margin = '0 0 12px';

	appContainer.insertBefore(helloMessage, postsContainer);

})