//Spoiler tag + buttons
if (document.querySelector('.spoiler')) {
    var spoilerButton = '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>';
    if (mw.config.get('wgCanonicalNamespace') === 'User') {
        document.querySelector('.UserProfileActionButton .wikia-menu-button').insertAdjacentHTML('beforebegin', spoilerButton);
        document.querySelector('.wikia-menu-button').style.marginLeft = '5px';
    } else {
        document.querySelector('.toolbar .tools').insertAdjacentHTML('afterend', spoilerButton);
    }
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').text('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').text('Show Spoilers');
    }
});
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'click to show the spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on')) {
            $this.attr('class', 'spoiler off').removeAttr('title');
        } else {
            $this.attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        }
    });
};
$('.spoiler.on').each(spoilerConfig);
 
//Fix for Article comments.
if (mw.config.get('wgIsArticle')) {
    var fixPagination = function() {
        // Fix for bad HTML code. Funnily enough, this cannot be made with jQuery, or ArticleComments.setPage will stop working.
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
        $('#article-comm').attr('placeholder', '');
    };
}
 
//User Tags
window.UserTagsJS = {modules: {}, tags: {}};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['patroller', 'chatmoderator'];
 
//Change title with Template:Title
(function () {
    if (document.querySelector('.custom-title')) {
        document.querySelector('.masthead-info hgroup h1, .firstHeading,#WikiaPageHeader h1').textContent = mw.html.escape(document.querySelector('.custom-title').textContent);
    }
})();
 
//LockForums
var LockForums = {
    expiryDays: 14,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!"
};
/* Disables quoting */
if (document.querySelector('textarea.replyBody[disabled="disabled"]')) {
    document.querySelector('.quote-button').parentNode.removeChild(document.querySelector('.quote-button'));
    document.querySelector('.replyBody').removeAttribute('class');
}
 
//Portable infoboxes colors
(function() {
    /* Check for Portable Infoboxes and change their color */
    if (document.querySelector('.portable-infobox')) {
        Array.prototype.forEach.call(document.querySelector('.portable-infobox'), function() {
            if (this.previousElementSibling.textContent) {
                this.querySelectorAll('.pi-image-thumbnail').style.width = this.previousElementSibling.textContent;
                this.querySelectorAll('.pi-image-thumbnail').style.height = 'auto';
            }
            var color = '';
            var classNames = this.getAttribute('class').split(' ');
            for (var i = 0; i < classNames.length; i++) {
                if (classNames[i].indexOf('pi-theme-_') !== -1) {
                    color = classNames[i].replace('pi-theme-_', '');
                    break;
                }
            }
            if (color) {
                this.style.border = '2px solid #' + color;
            }
        });
    }
})();
 
//AjaxRC
window.ajaxPages = ["Blog:Recent_posts"];
window.ajaxSpecialPages = ["WikiActivity", "Recentchanges", "Watchlist", "Log"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//Make ReportLog visible to admins, patrollers, and imagecontrollers
var ug = mw.config.get('wgUserGroups');
if (ug.indexOf('sysop') > -1 || ug.indexOf('patroller') > -1) { 
    importScriptPage('MediaWiki:AddRailModule/code.js', 'dev');
}