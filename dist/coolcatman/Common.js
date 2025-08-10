/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('messageWall.activated').add(function () {
	console.log('I know that MW works!', document.querySelectorAll('.MessageWallForum .wds-dropdown'));
	const appContainer = document.querySelector('.message-wall-app');
	const postsContainer = document.querySelector('.MessageWallForum');
	
	const helloMessage = document.createElement('div');
	helloMessage.textContent = 'Hello from my custom script!'
	helloMessage.style.color = 'red';
	helloMessage.style.padding = '10px';
	helloMessage.style.border = '1px solid red';
	helloMessage.style.margin = '0 0 12px';
	
	appContainer.insertBefore(helloMessage, postsContainer);
})

// Listen for right rail events
mw.hook('fandom.rightrail.loaded').add(function() {
    console.log('Right rail has finished loading!');
    // Initialize custom components that depend on rail content
});

mw.hook('fandom.rightrail.opened').add(function() {
    console.log('Right rail was opened');
    // Handle rail becoming visible
});

mw.hook('fandom.rightrail.closed').add(function() {
    console.log('Right rail was closed');
    // Handle rail being hidden
});