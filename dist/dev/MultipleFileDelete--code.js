//<nowiki>
/* 
 * Selectively delete multiple files or pages directly on certain special pages.
 * Based on WHAM2 code by Ozuzanna.
 * @author Spottra, KhangND
 */
(function($, mw) {
    var ug = mw.config.get("wgUserGroups"),
        page = mw.config.get("wgCanonicalSpecialPageName"),
        token = mw.user.tokens.get("editToken"),
        specialPages = {
            1: [ // ol
                'Listredirects',
                'BrokenRedirects',
                'Unusedcategories',
                'Unusedtemplates',
                'Deadendpages',
                'Shortpages'
            ],
            2: [ // table
                'Allpages',
                'Prefixindex'
            ],
            3: [ // gallery
                'Unusedimages',
                'UnusedVideos'
            ]
        };

    function pageType() { //get page type
        for (var i in specialPages) {
            if (specialPages[i].indexOf(page) >= 0)
                return Number(i);
        }
    }

    // load protections
    if (!pageType() // not from list
        || !/staff|helper|sysop|content-moderator|content-team-member|content-volunteer|wiki-manager|soap/.test(ug.join()) //not in group
        || window.mfdLoaded // double loading
        // exclude page(s)
        || (window.mfdExclude && (window.mfdExclude === page || window.mfdExclude.indexOf(page) >= 0))
        ) {
            return;
        }
    window.mfdLoaded = true;

    var btnProps = {
            'class': 'button',
            css: {
                cursor: 'pointer',
                height: 'initial',
                'margin-left': 3,
            }
        },
        i18n = {},
        $wrapper = $(),
        time = 0;

    function preload(i18nLoaded) {
        ['start', 'delete', 'check',
        'uncheck', 'enter', 'reason',
        'noselect', 'error', 'success'].forEach(function(msg) {
            i18n[msg] = i18nLoaded.msg(msg).plain();
        });

        init();
    }

    function init() {
        // create wrapper with start button
        $wrapper = $('<span>').append(
            $('<button>', $.extend({
                text: i18n.start,
                click: start
            }, btnProps)));
        if (pageType() === 2) {
            $('#mw-content-text').find(
                '.mw-allpages-table-chunk, #mw-prefixindex-list-table'
            ).before($wrapper);
        } else {
            $wrapper.appendTo('.mediawiki_showingresults + p');
        }
    }

    function start() {
        $(this).remove();

        // create checkboxes and add before items
        var chk = '<input class="selectiveDel" type="checkbox" />';
        switch (pageType()) {
            case 1:
                $('ol li a:first-child').each(function() {
                    $(this).before(chk);
                    selectHax(this);
                });
                break;
            case 2:
                if ($('.mw-allpages-table-chunk').length) { // Allpages
                    $('.mw-allpages-table-chunk td a').each(function() {
                        $(this).before(chk);
                        selectHax(this);
                    });
                } else { //PrefixIndex
                    $('#mw-prefixindex-list-table td a').each(function() {
                        $(this).before(chk);
                        selectHax(this);
                    });
                }
                break;
            default:
                $('.gallerytext > a').each(function() {
                    $(this).before(chk);
                    selectHax(this);
                });
        }

        $wrapper.append(
            // delete button
            $('<button>', $.extend({
                id: 'btn-mfd-delete',
                text: i18n['delete'],
                click: performDelete,
            }, btnProps)),
            // check all button
            $('<button>', $.extend({
                text: i18n.check,
                click: performCheck,
            }, btnProps))
        );
    }

    function performDelete() {
        var selected = $('.selectiveDel:checked');
        if (!selected.length)
            return alert(i18n.noselect);

        var deleteReason = prompt(i18n.enter, i18n.reason);
        if (!deleteReason)
            return;
        
        // lock delete button
        $(this)
            .attr('disabled', true)
            .css({
                'background-image': 'url(https://slot1-images.wikia.nocookie.net/__cb1557858431190/common/skins/common/images/ajax.gif)',
                'background-repeat': 'no-repeat',
                'background-position': 'center'
            });

        selected.each(function(i) {
            var page =
                $(this).parent().find('a').first().attr('title') ||
                $(this).parent().find('a').first().text();
            apiDelete(
                page,
                deleteReason,
                selected.length // reload indicator
            );
        });
    }

    function performCheck() {
        var btn = $(this);

        if (btn.text() === i18n.uncheck) {
            $('.selectiveDel').each(function() {
                this.checked = false;
            });

            btn.text(i18n.check);
        } else {
            $('.selectiveDel').each(function() {
                this.checked = true;
            });

            btn.text(i18n.uncheck);
        }
        displayCount();
    }

    function selectHax(elem) { // parent select hacks
        $(elem).parent().hover(function() {
            $(this).css({
                cursor: 'pointer',
                background: 'rgba(0,0,0,.2)'
            });
        }, function() {
            $(this).css({
                background: 'initial'
            });
        });
        $(elem).parent().click(function(e) {
            if (e.target === this) { // prevent event double firing
                var input = $(this).children('input')[0];
                input.checked = input.checked ? false : true;
            }
            displayCount();
        });
    }

    function displayCount() {
        $('#btn-mfd-delete').text(
            i18n['delete']
            + ' ('
            + $('.selectiveDel:checked').length
            + ')');
    }

    function apiDelete(page, reason, items) {
        new mw.Api().post({
                format: 'json',
                action: 'delete',
                title: page,
                reason: reason,
                bot: true,
                token: token
            })
            .done(function(d) {
                var notification;
                notification = d.error ?
                    new BannerNotification(i18n.error + ': ' + page, 'error') :
                    new BannerNotification(i18n.success + ': ' + page, 'confirm');

                setTimeout(function() {
                    notification.show();
                }, time - 500);

                setTimeout(function() {
                    notification.hide();
                }, time += 1000);
                
                if(time === items * 1000) {
                    setTimeout(function() {
                        location.reload();
                    }, time - 1000);
                }
            });
    }

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18n) {
        $.when(  
            i18n.loadMessages('MultipleFileDelete'),
            mw.loader.using('mediawiki.api')
        ).then(preload);
    });
})(this.jQuery, this.mediaWiki);