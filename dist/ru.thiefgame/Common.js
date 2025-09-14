/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//  ================================
//      Custom preload templates
//  ================================
/*  @author Grunny 
    From https://harrypotter.wikia.com/wiki/MediaWiki:Wikia.js
    edited by leviathan_89

    ** Info: **
    Template list loaded by default from "MediaWiki:Custom-PreloadTemplates",
    each syntax is loaded by default from the "/preload" subpage of the
    template.
*/
/*
(function() {
    'use strict';
    var mwc = mw.config.get([
        'wgAction',
        'wgFormattedNamespaces',
        'wgNamespaceNumber'
    ]),
    $module = $('div.wpSummaryFields:first');

    // Run conditions
    if (
        mwc.wgAction !== 'edit' || 
        !$module.exists() ||
        mwc.wgNamespaceNumber === 8 // MediaWiki:
    ) {
        console.log('[PreloadTemplates]: container not found or page is not supported.');
        return;
    }
    console.log('[PreloadTemplates]: version 1.04 - 08/11/2017.');

    // =================
    //   Configuration
    // =================
    var config = {
        list: window.preloadTemplates_list || 'MediaWiki:Custom-PreloadTemplates',
        subpage: window.preloadTemplates_subpage || 'preload'
    }, i18n, $main, $help;

    // =============
    //   Functions  
    // =============

    // Get plain message from i18n
    function msg(message) {
        return i18n.msg(message).plain();
    }

    // Parse MediaWiki code to allow the use of incudeoonly and noninclude tags in the preload page
    function parseMW(source){
        return source.replace(/<includeonly>(\n)?|(\n)?<\/includeonly>|\s*<noinclude>[^]*?<\/noinclude>/g, '');
    }

    // Error alert
    function notFound(page){
        alert(i18n.msg('error', '"' + page + '"').plain());
    }

    // Inserts text at the cursor's current position - originally from Wookieepedia
    function insertAtCursor(myField, myValue) {
        if (document.selection) {
            // IE support
            myField.focus();
            window.sel = document.selection.createRange();
            window.sel.text = myValue;
        } else if (myField.selectionStart || myField.selectionStart === 0) {
            // MOZILLA/NETSCAPE support
            var startPos = myField.selectionStart,
                endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos) +
                myValue +
                myField.value.substring(endPos, myField.value.length);
        } else {
            myField.value += myValue;
        }
    }

    // Get preload text and add it to the text area
    function getPreloadPage(title) {
        // check if subpage is standard or is case by case
        var namespace = mwc.wgFormattedNamespaces['10'],
            page = config.subpage === 'case-by-case' ?
                namespace + ':' + title :
                namespace + ':' + title + '/' + config.subpage;

        $.get(mw.util.wikiScript(), {
                title: page,
                action: 'raw',
                ctype: 'text/plain'
        }).done(function(preloadData) {
            // Parse some MediaWiki tags
            var preloadDataParsed = parseMW(preloadData);

            // Display error if no useful data is present
            if (preloadDataParsed === '') {
                notFound(page);
                return;
            }

            // Insert syntax
            var cke = document.getElementsByClassName('cke_source'),
                textbox = document.getElementById('wpTextbox1');
            if (cke.length) {
                // Visual editor
                insertAtCursor(cke[0], preloadDataParsed);
            } else if (textbox) {
                insertAtCursor(textbox, preloadDataParsed);
            } else {
                console.warn('[PreloadTemplates] Could not find textbox to bind to');
            }
        }).fail(function() {
            notFound(page);
        });
    }

    function preInit(i18nData) {
        i18n = i18nData;
        i18n.useUserLang();
        $main = $('<div>', { id: 'preload-templates' });
        $help = $('<div>', {
            id: 'pt-help'
        }).append($('<a>', {
            'class': 'tooltip-icon',
            target: '_blank',
            href: '//dev.wikia.com/wiki/PreloadTemplates',
            title: msg('devWiki'),
            text: '?'
        }));
        $module.append($main);
    }

    function listHTML(parsed) {
        return mw.html.element('option', {
            selected: true,
            disabled: true
        }, 'Выберите готовый шаблон:') + parsed.split('\n').map(function(line) {
            // Ignore empty lines
            if (line.trim() === '') {
                return '';
            }
            // Text in a list is the template name
            if (line.indexOf('*') === 0) {
                var title = line.substring(1).trim();

                // Text after pipe is display name
                if (title.indexOf('|') !== -1) {
                    var parts = title.split('|');
                    return mw.html.element('option', {
                        value: parts[0].trim()
                    }, parts[1].trim());
                } else {
                    return mw.html.element('option', {
                        value: title
                    }, title);
                }
            } else {
                // Rest are normal strings
                return mw.html.element('option', {
                    disabled: true
                }, line.trim());
            }
        }).join();
    }

    // =================
    //   Initialization  
    // =================

    // If the initialization failed
    function initFail() {
        $main.append(
            i18n.msg(
                'error',
                mw.html.element('a', {
                    href: mw.util.getUrl(config.list)
                }, config.list)
            ).plain(),
            $help
        );
    }

    function init(listData) {
        var parsed = parseMW(listData); // Parse data for MediaWiki tags

        // Display error if no valid data is present
        if (parsed === '') {
            initFail();
            return;
        }

        // Append template list and messageges
        $main.append(
            $('<select>', {
                id: 'pt-list',
                title: msg('help'),
                html: listHTML(parsed)
            }).change(function() {
                var $this = $(this),
                    val = $this.val();

                // Restore default option
                $this.find('option:first-child').prop('selected', true);

                // Preload the template on click
                getPreloadPage(val);
            }),
            $help
        );
    }

    // ===========
    //   Imports  
    // ===========
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:PreloadTemplates.css'
    });

    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('PreloadTemplates').then(function(i18nData) {
            preInit(i18nData);
            $.get(mw.util.wikiScript(), {
                title: config.list,
                action: 'raw',
                ctype: 'text/plain'
            }).done(init).fail(initFail);
        });
    });

})();*/

// Конец скрипта Custom preload templates
/*-----------------------------------------*/


/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/563128733259792395/embed.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<h2 class="discord-header">' +
            '<img alt="Discord" src="https://static.wikia.nocookie.net/thiefgame/images/f/f6/Discord_chat_logo.svg/revision/latest?cb=20250914105520&format=original&path-prefix=ru" class="discord-icon">' + 
            '<span>Discord</span>' + 
        '</h2>' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td>' +
                        '<p class="chat-name">' +
                            '<span>ХРОМОЙ БУРРИК</span>' +
                            '<span>сервер Башни</span>' +
                            '<a href="https://thiefgame.fandom.com/ru/wiki/Thief_Game_Wiki:Свиток_Бассо#Участники">[верификация]</a>' +
							'<a href="https://thiefgame.fandom.com/ru/wiki/Thief_Game_Wiki:Discord">[faq]</a>' +
						'</p>' +
					'</td>' +
                        '<td>' +
                            '<center>' +
                                '<img alt="thiefgame4-wiki" src="https://vignette.wikia.nocookie.net/thiefgame/images/5/55/G02.png/revision/latest?cb=20190217230734&format=original&path-prefix=ru" class="discord-server-icon">' +
                                '<span>В сети: <span id="discord-counter">?</span></span>' +
                                '<button class="discord-joined">Войти в чат</button>' +
                            '</center>' +
                        '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4 class="discord-online">Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        $member.append(v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : ''));
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();

//настройки для pagePreview
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://static.wikia.nocookie.net/thiefgame/images/f/f0/LostImage.jpg/revision/latest?cb=20200419133047&format=original&path-prefix=ru',
        RegExp: {
        iimages: [/Gear\.png/]

    },
});

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };