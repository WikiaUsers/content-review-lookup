/*
 * AjaxDiff
 * Allows inspecting diffs without leaving page
 * Scripts used :
 * https://dev.fandom.com/wiki/WHAM/code.js
 * https://dev.fandom.com/wiki/QuickComments/code.js
 * By Gguigui1, KhangND
 */
(function($, mw, AjaxDiff) {
    AjaxDiff = $.extend({
        ignore: []
    }, AjaxDiff);
    var specialPage = mw.config.get('wgCanonicalSpecialPageName');

    if (!/WikiActivity|Recentchanges|Contributions/.test(specialPage)
        || AjaxDiff.ignore.indexOf(specialPage) >= 0
        || window.AjaxDiffLoaded) {
        return;
    }
    window.AjaxDiffLoaded = true;

    var pageTitle,
        lng,
        curDiff,
        selector,
        parent,
        loadingGif = 'https://slot1-images.wikia.nocookie.net/__cb1557858431190/common/skins/common/images/ajax.gif',
        powergroups = /staff|vstf|helper|sysop|wiki-manager/;

    // switch selector for special page
    switch (specialPage) {
        case 'WikiActivity':
            selector = '.activityfeed-diff';
            parent = 'li';
            break;
        case 'Recentchanges':
            selector = 'a:contains(diff), a:contains(changes)';
            parent = 'table';
            break;
        case 'Contributions':
            selector = 'a:contains(diff)';
            parent = 'li';
            break;
    }

    function init() {
        $(document).on('click', selector, (function(e) {
            e.preventDefault();
            curDiff = $(this);
            getContent($(this).attr("href"), 'diff');
        }));
    }

    /* Get content from url with specified type (diff/preview) */
    function getContent(url, type) {
        pageTitle = url.split('wiki/')[1].replace(/\?.*|_/g, ' ').trim();
        pageTitle = decodeURI(pageTitle);
        createModal();
        $.get(url).done(function(data) {
            if (data.error)
                return alert(lng.errorapi + ': ' + data.error.info);
            var content = (type === 'diff')
                ? $(data).find('.diff').html()
                : $(data).find('.mw-content-text').html();
            createModal(content, type);
        });
    }

    function createModal(content, type) {
        // clear loading modal
        if ($('#modal-loading').length)
            $('#modal-loading').closeModal();

        // if diff modal opened -> modify
        if ($('#modal-diff').length && type === 'diff') {
            modifyModal(content);
            return;
        }

        var title = lng.loading,
            id = 'modal-loading',
            container = $('<center>'),
            btns = [
            {
                message: lng.cancelbutton,
                handler: function() {
                    $('#' + id).closeModal();
                }
            }, {
                id: 'previewpagebutton',
                message: lng.previewbutton,
                defaultButton: false,
                handler: function() {
                    var pagelink = $('#mw-diff-ntitle1 > strong > a').attr('href');
                    getContent(pagelink, 'preview');
                }
            }, {
                id: 'blockbutton',
                message: lng.blockbutton,
                defaultButton: true,
                handler: function() {
                    blockuser($('#mw-diff-ntitle2 > .mw-userlink').text());
                }
            }];
        if (type === 'diff') {
            title = lng.diffpreview + ': ' + pageTitle;
            id = 'modal-diff';
            container = $('<div>', {
                'class': 'diff',
                id: 'DiffView',
                css: {'max-height': $(window).height() - 250 }
            });
        } else if (type === 'preview') {
            title = lng.pageviewver + ': ' + pageTitle;
            id = 'modal-preview';
            btns = [btns[0]];
            container = $('<div>', {
                'class': 'WikiaArticle',
                id: 'DiffPreview',
                css: { 'max-height': $(window).height() - 250}
            });
        } else {
            btns = [];
        }
        container.html(content || $('<img>').attr('src', loadingGif));

        $.showCustomModal(title, container, {
            id: id,
            width: $('#WikiaPage').width(),
            buttons: btns
        });

        // modify modal components
        var $up = $('<button>', {
                'class': 'wikia-button secondary',
                id: 'up',
                text: '⇧',
                css: { float: 'left' },
                click: function() { navEdit('up', this); }
            }),
            $down = $('<button>', {
                'class': 'wikia-button secondary',
                id: 'down',
                text: '⇩',
                css: {
                    float: 'left',
                    'margin-left': 10
                },
                click: function() { navEdit('down', this); }
            }),
            $block = $('#blockbutton');
        if (!powergroups.test(mw.config.get('wgUserGroups').join()))
            $block.remove();
        else
            $block.text(lng.blockbutton + ': ' + $('#mw-diff-ntitle2 > .mw-userlink').text());
        $('#up, #down').remove();
        $('#modal-diff .modalToolbar').prepend([$up, $down]);
        $('#mw-diff-otitle4 > a').click(navDiff);
        $('#mw-diff-ntitle4 > a').click(navDiff);
        $('.mw-rollback-link > a').click(doRollback);
    }

    function modifyModal(content) {
        var $block = $('#blockbutton');
        $('#DiffView').html(content);
        $('#modal-diff > h1').text(lng.diffpreview + ': ' + pageTitle);
        $('#mw-diff-otitle4 > a').click(navDiff);
        $('#mw-diff-ntitle4 > a').click(navDiff);
        if($block.length)
            $block.text(lng.blockbutton + ': ' + $('#mw-diff-ntitle2 > .mw-userlink').text());
    }

    function doRollback(e) {
        e.preventDefault();
        $.post($(this).attr('href'));
        alert(lng.rollbacksuccess);
        $(this).parent().remove();
    }

    /* navigate between edits */
    function navEdit(dir, elem) {
        var target = curDiff.parents(parent);
        target = (dir === 'up')
            ? target.prevAll().find(selector)
            : target.nextAll().find(selector);
        if(!target[0]) { // reached top/bottom
            $(elem).attr('disabled', true);
            return;
        }
        curDiff = target;
        getContent(target.attr('href'), 'diff');
    }

    /* navigate between revisions */
    function navDiff(e) {
        e.preventDefault();
        getContent($(this).attr('href'), 'diff');
    }

    /* block user */
    function blockuser(user, expiry, reason) {
        if ($('#blockbutton').attr('disabled'))
            return false;

        if (!expiry)
            expiry = prompt(lng.expiry, AjaxDiff.expiry);

        if (!reason)
            reason = prompt(lng.reason, AjaxDiff.reason);

        if (!user || !expiry) {
            alert(lng.emptyvariables);
            return false;
        }
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            prop: 'info',
            intoken: 'block',
            titles: 'User:' + user,
            format: 'json'
        }, function(data) {
            var pages = data.query.pages;
            $.post(mw.util.wikiScript('api'), {
                action: 'block',
                user: user,
                expiry: expiry,
                reason: reason,
                nocreate: true,
                autoblock: true,
                format: 'json',
                token: data.query.pages[Object.keys(pages)[0]].blocktoken
            }, function(data) {
                if (data.error) {
                    alert(lng.errorapi + " : " + data.error.info);
                    return false;
                } else {
                    alert(lng.success);
                    $('#blockbutton').attr('disabled', true);
                }
            });
        });
    }

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:AjaxDiff.css'
    });

    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('AjaxDiff').done(function(i18n) {
            lng = i18n._messages.en;
            for(var i in lng) {
                lng[i] = i18n.msg(i).plain();
            }
            AjaxDiff.expiry = AjaxDiff.expiry || '3 days';
            AjaxDiff.reason = AjaxDiff.reason || lng.vandalism;
            init();
        });
    });
})(this.jQuery, this.mediaWiki, window.AjaxDiff);