importStylesheet("Template:Ambox/code.css");

/* Include Global Anime-Common.js Information */
importScriptURI('//anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];

window.PurgeButtonText = 'Purge';

/* InsertUsernameHere */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.html.escape(mw.config.get('wgUserName')));
});

/* Spoilers */
(function() {
    if ($('.hidden.on').length) {
    if ($('.UserProfileActionButton').length) {
        $('.UserProfileActionButton .wikia-menu-button').before(
            $('<button>', {
                class: 'wikia-menu-button',
                id: 'toggle-hidden',
                title: 'Show all hiddens on page',
                text: 'Show Hiddens',
                css: {'padding': '0 6px', 'margin-right': '5px'},
            })
        );
    } else if (wgCanonicalNamespace === 'MediaWiki') {
        return;
    } else {
        $('<a>', {
            class: 'wds-button wds-is-squished',
            id: 'toggle-hidden',
            title: 'Show all hiddens on page',
            text: 'Show Hiddens',
            css: {'float': 'right', 'margin-bottom': '5px'},
        }).prependTo($('#mw-content-text'));
        }
    }

    $('#toggle-hidden').click(function() {
        if ($('.hidden.on, .hidden.off').length) {
            $('.hidden').attr('class', 'hidden').removeAttr('title');
            $('.wds-button#toggle-hidden').attr('title', 'Hide all hiddens on the page').html('Hide Hiddens');
        } else {
            $('.hidden').attr('class', 'hidden on').attr('title', 'click to show the hiddens');
            $('.wds-button#toggle-hidden').attr('title', 'Show all hiddens on page').html('Show Hiddens');
        }
    });
    var hiddenConfig = function(i, el) {
        var $el = $(el);
        $el.attr('title', 'Click to show the hiddens');
        $el.click(function() {
            var $this = $(this);
            if ($this.hasClass('on'))
                $this.attr('class', 'hidden off').removeAttr('title');
            else
                $this.attr('class', 'hidden on').attr('title', 'Click to show the hiddens');
        });
    };
    $('.hidden.on').each(hiddenConfig);
}) ();

/* Adapted from YouTubePlayer & DraggableYouTubePlayer for video previews on episode pages. */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
 
        if (data.loaded || id === '') {
            return;
        }
 
        uri.path += id;
        uri.query = {
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            showinfo: 0,
            rel: 0, 
        };
 
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});

/* Customizing LinkPreview Extension */
window.pPreview = $.extend(true, window.pPreview, {
	noimage: 'https://static.wikia.nocookie.net/accelworld/images/6/60/No_Image_Available.png',
	defimage: 'https://static.wikia.nocookie.net/accelworld/images/6/60/No_Image_Available.png',
}
	);