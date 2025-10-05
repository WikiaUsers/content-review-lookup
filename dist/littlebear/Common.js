// Any JavaScript here will be loaded for all users on every page load.
console.log('************ MediaWiki:Common.js ************');

// Customizing text of auto-created user and user talk pages
const welcomeText = 'Welcome to the Little Bear Wiki!';
const talkLink = mw.util.getUrl('User talk:$2');
const welcomeLink = $('<a>').attr('href', talkLink).text(welcomeText);
window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{Placeholder}}',
		3: '== Welcome ==\n\n{{Welcome}}',
	},
	summary: 'auto creating user and user talk pages',
	notify: welcomeLink.prop('outerHTML'),
};

// Prevent undesirable scroll behavior
$('[href="#"]').on('click', event => event.preventDefault());