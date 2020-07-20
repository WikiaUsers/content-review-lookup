importArticles( {
    type: 'script',
    articles: [
          'u:dev:ChatBlockButton/code.js',
          'u:dev:ChatObject/code.js',
          'u:dev:ChatReload/code.js'
    ]
} );

/**
 * !kick.js
 *
 * Permet l'usage de !kick dans le chat.
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups'),
            absentMessage = window.absentMessage || 'Il est impossible d\'éjecter <user>, cet utilisateur n\'est pas sur le chat.';
        if (groups.indexOf('sysop') > -1 ||
           groups.indexOf('bureaucrat') > -1 ||
           groups.indexOf('chatmod') > -1
           ) {
            $('[name="message"]').keydown(function(e) {
                if (e.which == 13 &&
                   $(this).val().substr(0, 5) == '!kick'
                   ) {
                    var user = $(this).val().substr(6), users = [], last = $('.Chat li').last().attr('data-user');
                    $('.WikiChatList .User').each(function() {
                        users.push($(this).attr('data-user'));
                    });
                    if (users.indexOf(user) == -1) {
                        $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + absentMessage.replace('<user>', user) + '</li>');
                        if (!last) {
                            $('.inline-alert').last().addClass('continued');
                        }
                    }
                    mainRoom.kick({
                        name: user
                    })
                    $(this).val('');
                }
            });
        }
    }
});

/**
 * !mods.js
 *
 * Ping les modérateurs présents
 * @author: [[w:User:Fubuki風吹]]
 * Modified by [[User:FrenchTouch]]
 */
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        if ((groups.indexOf('bureaucrat') + groups.indexOf('sysop') + groups.indexOf('chatmoderator') + groups.indexOf('helper') + groups.indexOf('vstf') + groups.indexOf('staff')) > -6) {
            $('.Chat').on('DOMNodeInserted', function(e) {
                var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
                if (msg.substr(0, 5) == '!mods') {
                    $('<audio>', {
                        id: 'mod-ping',
                        src: 'https://vignette.wikia.nocookie.net/mortal-kombat/images/c/cf/MKPing.ogg',
                        autoplay: true
                    }).appendTo('body');
                    setTimeout(function() {
                        if ($('#mod-ping').length) $('#mod-ping').remove();
                    }, 1000);
                }
            });
        }
    }
});

/* Liens interwiki dans le chat */
CustomLinks = typeof CustomLinks !== "undefined" ? CustomLinks : {};
if (CustomLinks.preventDefault === true) {
	// default disabled - remove preventDefault property and don't add default values
	delete CustomLinks.preventDefault;
} else {
	// adding default values - not disabled
	CustomLinks.mw = "http://www.mediawiki.org";
	CustomLinks.mediawikiwiki = "http://www.mediawiki.org";
	CustomLinks.commons = "http://commons.wikimedia.org";
	CustomLinks.wikimedia = "http://wikimediafoundation.org";
	CustomLinks.wikipedia = "http://en.wikipedia.org";
}
$("body").on("DOMNodeInserted", ".Chat ul > li:not(.inline-alert)", function(el) {
    if (!$(this).attr('href')) return;
    var actualLink = $(this).attr('href').slice((wgServer + '/wiki/').length);
    if (!CustomLinks.hasOwnProperty(actualLink.split(':')[0])) return;
	var newLink = actualLink.replace(new RegExp('^(' + Object.keys(CustomLinks).join('|') + '):', 'i'), function(m) {
		var nonColon = m.slice(0, -1).toLowerCase();
		return CustomLinks[nonColon];
	});
	$(this).attr('href', newLink);
});

/* ChatObjects */
Chat.setColorScheme({
chatBackground: '#270705',
pageBackground: 'black'
});

/* Reload */
// Options
// Refresh toutes les 5 secondes
window.chatReloadTime = 5000;