/* Replacement for welcome message */
/* Staff, if you see this, there is a big problem with the messages. A fix would be nice ;3 */
 function seemore() {
      $.showCustomModal('Salutare!','<div style="width:auto;padding-right:15px;margin-bottom:4px;border:3px solid black;border-radius:10px; font-size:13pt;color:white;"><center><div style="color:#00B2EE;font-family:\'Nunito\';font-size:50px;font-weight:bold;text-align:center;padding:15px">Bun venit!!</div>Salut! Îți multumim pentru schimbarea ta!<center><font color="#19E3A3">Birocrații au culoarea lui Malachit(Jasper și Lapis)</font><br><font color="#EE2331">Administratori au culoarea lui Rubin</font><br><font color="#5ad4b8">Boții au culoarea Navei Spațiale de Acasă</font><br><font color="#C646C6">Rollbacks au culoarea lui Ametist</font><br>Pentru prima dată, ai nevoie să ne vezi <a href="/wiki/Project:Regulament">regulile</a>. Dacă asta nu te ajută, contactează <a href="/wiki/Project:Membri Staff">Membrii Staff</a><br>Ne bucurăm foarte mult să te vedem!</div>', {
        width: 720});
};
$(function editCounterJS() {
 $.get("/wiki/Special:Numărătoare_modificare/"+wgUserName, function(result){
     
          regExpNumberIsolation = /\d/g ;
          regExpSearch = /\(Main\)/ ;
          mainPos = result.search(regExpSearch);         if (mainPos != -1){
            slicedMainText = result.slice(mainPos+36, mainPos+41);
     
            var numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
            if (numberedMainText.search(",") != -1){
              while (numberedMainText.indexOf(",") > -1){
                var numberedMainText = numberedMainText.replace(",","");
              }
            }
          }else{
            numberedMainText = 0;
          }
     
          totalPos = result.search(">All wikis");
          if (totalPos != -1){
            slicedTotalText = result.slice(totalPos+52, totalPos+57);
     
            var numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
            if (numberedTotalText.search(",") != -1){
              while (numberedTotalText.indexOf(",") != -1){
                var numberedTotalText = numberedTotalText.replace(",","");
              }
            }
          }else{
            numberedTotalText = 0;
          }
          if (numberedTotalText === "1") {
require(['jquery', 'mw'], function ($, mw) {
    var storageKey = 'ls-wikianotifications';
 
    function log(error) {
        console.log('WikiaNotifications error: ' + error);
    }
 
    function getNotificationData() {
        return (new mw.Api()).get({
            action: 'parse',
            page: 'MediaWiki:Custom-WikiaNotifications',
            format: 'json'
        }).then(function (res) {
            var dfd = $.Deferred();
            if (res.error) {
                return dfd.rejectWith(this, [res.error.info]);
            }
 
            var text = res.parse.text['*'].trim();
            if (!text.length) {
                return dfd.rejectWith(this, ['empty content']);
            }
 
            return dfd.resolveWith(this, [{
                version: res.parse.revid,
                contents: text
            }]);
        });
    }
 
    function showNotificationIfNotViewed(notification) {
        var notifsData = JSON.parse(window.localStorage.getItem(storageKey)) || {},
            hasSeen = (notifsData[mw.config.get('wgCityId')] === notification.version),
            $notificationArea = $('#WikiaNotifications'),
            hasNotifications = $notificationArea.length ? 1 : 0
 
        if (hasSeen) {
            return;
        }
 
        var $notif = $('<li/>')
			.append(
				$('<div>')
				.attr('data-type', '2')
				.html(notification.contents)
				.append(
					$('<a>')
					.addClass('sprite close-notification')
				)
            );
 
			if (hasNotifications) {
				$notificationArea.append($notif);
			} 
			else {
				$('body').addClass('notifications')
					.append($('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>')
						.append($notif));
			}
        $notif.append('<button onclick="seemore()">Vezi mai multe</button>')
        $('.sprite.close-notification').on('click', function () {
            $notif.hide();
            notifsData[mw.config.get('wgCityId')] = notification.version;
            window.localStorage.setItem(storageKey, JSON.stringify(notifsData));
        });
    }
 
    mw.loader.using('mediawiki.api', function() {
        $(function() {
            getNotificationData().then(showNotificationIfNotViewed).fail(log);
        });
    });
});
          }
          
          });
          
});



/* Spoiler tag + buttons */
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').html('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').html('Show Spoilers');
    }
});
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'click to show the spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
    });
};
$('.spoiler.on').each(spoilerConfig);

// Fix for Article comments.
if ( wgIsArticle ) {
    var fixPagination = function() {
        // Fix for bad HTML code. Funnily enough, this cannot be made with jQuery,
        // or ArticleComments.setPage will stop working.
        var paginations = Array.from(document.getElementsByClassName('article-comments-pagination'));
        for (var i in paginations) {
            var childNodes = Array.from(paginations[i].childNodes);
            for (var child in childNodes) {
                var childElement = childNodes[child];
                if (childElement.nodeType == 3) {
                    childElement.nodeValue = ' ... ';
                }
            }
        }
    };
    $(document).on('DOMNodeInserted', '#article-comments .spoiler.on', spoilerConfig);
    $(document).on('DOMNodeInserted', '.article-comments-pagination', fixPagination);
    var AC = ArticleComments.init;
    ArticleComments.init = function() {
        AC();
        $('#article-comments .spoiler.on').each(spoilerConfig);
        fixPagination();
        $('#article-comm').attr('placeholder', 'Remember, leaks are strictly prohibited on this wiki! If you are unsure if something is a leak or not, please contact an admin.');
    };
}

/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.html.escape(mw.config.get('wgUserName')));
});
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        }, 
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot'
        ],
        newuser: true
    }
};

// Change title with [[Template:Title]]
$(function () {
	if ($('.custom-title').length == 1) {
		var newTitle = $('.custom-title').text();
		$('.masthead-info hgroup h1,.firstHeading,#WikiaPageHeader h1').html(newTitle);
	}
});

/* LockForums */
window.LockForums = {
    expiryDays: 14,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum",
    disableOn: ['680222', '618617']
};
/** Disables quoting **/
if ( $('textarea.replyBody[disabled="disabled"]').length ) {
    $('.quote-button').remove();
    $('.replyBody').removeAttr('class');
}

/* MassProtect */
massProtectDelay = 300;

/* Portable infoboxes colors */
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			$PImg = $('.pi-image-thumbnail',this);
			$prev = $(this).prev();
			if ($prev.text()) $PImg.css({
                 width: $prev.text(),
                 height: 'auto'
            });
			color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) $PI.css('border', '2px solid #' + color);
		});
	};
	changeColors();
})();