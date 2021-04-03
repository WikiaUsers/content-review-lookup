// Konfiguracja szablonów wiadomości
window.DiscussionTemplates = {
	// Domyślne szablony dostępne dla każdego
	templates: {
		'Powitanie na wiki': {
			name: 'MediaWiki:Custom-message-welcome',
			title: 'Witaj na Gothicpedii!'
		}
	},
	// Niestandardowa funkcja – sprawdzanie uprawnień
	canPostPrivilegedMessages: function() {
		return /sysop|bureaucrat|content-moderator|threadmoderator/.test( mw.config.get( 'wgUserGroups' ).join() );
	}
};

// Szablony dla członków kadry wiki
if ( window.DiscussionTemplates.canPostPrivilegedMessages() ) {
	window.DiscussionTemplates.templates['Nominacja redaktora'] = {
		name: 'MediaWiki:Custom-message-redactor-promote',
		title: 'Nadanie uprawnień redaktora'
	};
	window.DiscussionTemplates.templates['Denominacja redaktora'] = {
		name: 'MediaWiki:Custom-message-redactor-demote',
		title: 'Odebranie uprawnień redaktora'
	};
}

// Import skryptu
importArticle( {
	type: 'script',
	article: 'u:dev:MediaWiki:DiscussionTemplates.js'
} );