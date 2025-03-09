// Any JavaScript here will be loaded for all users on every page load.
console.log('************ MediaWiki:Common.js ************');

// Customizing text of auto-created user and user talk pages
const welcomeLink = $('<a>').attr('href', mw.util.getUrl('User talk:$2')).text('Welcome to the Little Bear Wiki!');
window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{Placeholder}}',
		3: '== Welcome ==\n\n{{Welcome}}',
	},
	summary: 'auto creating user and user talk pages',
	notify: welcomeLink.prop('outerHTML'),
};

// Prevent undesirable scroll behavior
$('[href="#"], [href^="#cite_note"]').click(event => event.preventDefault());