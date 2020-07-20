// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true laxbreak:true smarttabs:true*/
/*global mediaWiki */

// Add "Edit Greeting" button to Message Wall
if (mediaWiki.config.get('wgNamespaceNumber') === 1200) {
(function(window, $, mw) {
	"use strict";
	var messages = {
		en: {
			editGreeting: 'Edit Greeting',
			history: 'Greeting History',
			wallHistory: 'Wall History'
		},
		es: {
			editGreeting: 'Editar Bienvenida',
			history: 'Historial de la Bienvenida',
			wallHistory: 'Historial del Muro'
		},
		hu: {
			editGreeting: 'Üdvözlet szerkesztése',
			history: 'Üdvözlet laptörténete',
			wallHistory: 'Fal története'
		},
		pl: {
			editGreeting: 'Edytuj powitanie',
			history: 'Historia powitania',
			wallHistory: 'Historia tablicy'
		}
	};
	messages = $.extend(messages.en, messages[mw.config.get('wgUserLanguage')]);

	function checkSetIn(map, what) {
		for (var i = 0, l = what.length ; i < l ; ++i) {
			if (map[what[i]]) { return true; }
		}
		return false;
	}

	// Message Walls are always in Edit mode in Oasis.
	if (({view:1, edit:1})[mw.config.get('wgAction')] !== 1) { return; }
	// We show the button for the owning user, and for sysops.
	// We don't show it for anyone else since you get a permission error when trying to
	// access someone else's message. Why? Beats me.
	var user = mw.config.get('wgTitle');
	// NOTE: Anons can edit their greetings as well, not going to support that though since
	//    I can't easily see what their IP address is to figure out if they own the wall or not.
	if (user !== mw.config.get('wgUserName')) { // Not self
		if (!checkSetIn({sysop:1, staff:1}, mw.config.get('wgUserGroups')) || // Not sysop
		    user.indexOf('/') !== -1 // Archived talk page
		   ) {
			return;
		}
	}

	function createOasis(url, wallUrl) {
		if ($('#EditMessageWallGreeting').length) { return; } // Double run
		var $button = $(window.Mustache.render(
			'<div class="UserProfileActionButton" id="EditMessageWallGreeting">' +
			'<nav class="wikia-menu-button">' +
			'<a accesskey="e" href="' + url + '?action=edit">' +
			'<span class="sprite edit-pencil" style="display:inline-block; margin-right:1ex; vertical-align: text-bottom"></span>' +
			'{{editGreeting}}' +
			'</a> ' + // Whitespace is needed here for negative margin on drop to work
			'<span class="drop"><span class="chevron" style="display:inline-block; vertical-align:-1px"></span></span>' +
			'<ul class="WikiaMenuElement" style="min-width:100%">' +
			'<li><a href="' + url + '?action=history">{{history}}</a></li>' +
			'<li><a accesskey="h" href="' + wallUrl + '?action=history">{{wallHistory}}</a></li>' +
			'</ul></nav></div>',
			messages
		)).prependTo('#WikiaMainContent').children();
		if (window.WikiaButtons && window.WikiaButtons.menuButtons) {
			window.WikiaButtons.add($button);
		}
	}
	function createMonobook(url) {
		$('#ca-edit > a').prop('href', url + '?action=edit').text(messages.editGreeting);
	}

	mw.loader.load(['mediawiki.Title', 'wikia.mustache'], null, true);
	$(function() {
		mw.loader.using(['mediawiki.Title', 'wikia.mustache'], function() {
			(mw.config.get('skin') === 'oasis' ? createOasis : createMonobook)(
				new mw.Title(user, 1202).getUrl(), // Message Wall Greeting
				new mw.Title(user, 1200).getUrl()  // Message Wall
			);
		});
	});
})(window, jQuery, mediaWiki);
}

// Remove the [broken] talk page link from the Greeting page.
if (mediaWiki.config.get('wgNamespaceNumber') === 1202) {
jQuery(function($) {
	// Monobook, Oasis
	$('#ca-talk, .WikiaPageHeader a[data-id="comment"]').remove();
});
}

// </syntaxhighlight>