// Automaattinen estoilmoitus
// Automatic ban notification
var MessageBlock = {
	title: 'Esto',
	message: '{{Esto|$1|$2}}',
	autocheck: true
};

// Koodien tuonti, tähän uudet
importArticles({
	type: 'script',
	articles: [
		'u:dev:MessageBlock/code.js',
		'u:dev:InactiveUsers/code.js',
		'u:dev:SkinSwitchButton/code.js'
	]
});

// SkinSwitch
var monoBookText = 'Monobook',
    oasisText = 'Wikia',
    mobileText = 'Mobiili';

// Blogimuokkausten poisto WikiActivitysta
var blogposts = document.getElementsByClassName("activity-ns-500");
if (blogposts.length) blogposts.style.display = "none";
var blogcomments = document.getElementsByClassName("activity-ns-501");
if (blogcomments.length) blogcomments.style.display = "none";

// Mitä seuraavat 138 riviä tarkoittavat????? (37-175)
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
addOnloadHook(UserNameReplace);

//
//
//     WGB
//
//

// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true jquery:true laxbreak:true smarttabs:true*/
/*global mediaWiki */

// Add "Edit Greeting" button to Message Wall
if (mediaWiki.config.get('wgNamespaceNumber') === 1200) {
(function(window, $, mw) {
	"use strict";
	var messages = {
	        fi: {
			editGreeting: 'Muokkaa seinän tervehdystä',
			history: 'Historia',
			wallHistory: 'Seinän historia'
		},
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

 importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');


//UserTags

/*jshint smarttabs:true jquery:true browser:true bitwise:false laxbreak:true */
/*global mediaWiki */
 
// ES5 requires Date.parse to support this, ES3 doesn't (i.e. IE8 chokes on it)
Date.parseISO8601 = function(text) {
	"use strict";
	// Decode MediaWiki ISO8601 Strict date and convert it to milliseconds
	// This regex only supports basic dates that MediaWiki produces, it isn't comprehensive.
	// It also doesn't support non UTC Timezones, I'm pretty sure MW never curveballs us
	// like that though so it should be fine.
	var when = (/^(\d{4})-?(\d\d)-?(\d\d)[T\s](\d\d):?(\d\d):?(\d\d)(?:\.?(\d+))?(?:Z|\+00(?::?00)?)$/).exec(text);
	if (!when) {
		return NaN;
	}
	return +new Date(when[1], when[2] - 1, when[3], when[4], when[5], when[6], ('.' + when[7]) * 1000 | 0);
};


// Epäaktiivinen-lätkä
// Inactive badge
InactiveUsers = { 
    months: 2,
    text: 'Epäaktiivinen'
};