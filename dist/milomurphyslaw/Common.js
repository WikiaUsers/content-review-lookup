/* Auto updating recent changes config */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* Replaces {{USERNAME}} with the name of the user browsing the page; requires copying Template:USERNAME */
$(function UserNameReplace() {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $("span.insertusername").text(wgUserName);
});

/* Special:Random --> Special:Random/main */
$(function() {
	$('ul.subnav-2.accent li a[href="/wiki/Special:Random"]').attr('href', '/wiki/Special:Random/main');
});

/* Linking to subsections in other tabs */
$(function () {
    'use strict';
    setTimeout(function () {
        if (location.hash === '' && $('.tabberlive').length !== 1) {
            return;
        }
        var $nav = $('.tabbernav li'),
            $div = $('.tabberlive .tabbertab'),
            url = location.href;
        url = url.slice(url.indexOf('?tab=') + 5, url.indexOf('#'));
        $($nav[url]).addClass('tabberactive');
        $($div[url]).removeClass('tabbertabhide');
        for (var i = 0; i < $nav.length; i++) {
            if (parseInt(url, 10) !== i) {
                $($nav[i]).removeClass('tabberactive');
                $($div[i]).addClass('tabbertabhide');
            }
        }
        location.hash = location.hash;
    }, 1000);
});

/* Message Wall/Forum Admin Highlights */
window.MessageWallUserTags = {
    tagColor: '#20BD00',
    txtSize: '12px',
    glow: true,
    glowSize: '12px',
    glowColor: '#20BD00',
    users: {
        'ThePokémonGamer': 'Founder',
        'PhinFerbFan5': 'Admin',
        'Arend': 'Admin',
        'Vozhan': 'Admin'
     }
};

/* Imports are in MediaWiki:ImportJS */