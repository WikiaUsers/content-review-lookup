//  ================================
//      Custom preload templates
//  ================================
/*  @author Grunny 
    From http://harrypotter.wikia.com/wiki/MediaWiki:Wikia.js
    Information copy from http://dev.wikia.com/wiki/MediaWiki:PreloadTemplates.js
 
    ** Info: **
    Template list loaded by default from "MediaWiki:Custom-PreloadTemplates",
    each syntax is loaded by default from the "/preload" subpage of the
    template.
*/
 
(function() {
    'use strict';
    var mwc = mw.config.get([
        'skin',
        'wgAction',
        'wgFormattedNamespaces',
        'wgNamespaceNumber',
        'wgScript'
    ]),
    $module = $(
        mwc.skin === 'oasis' ?
            'div.module_content:first' :
            'div.editButtons'
    );
 
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
        } else if (myField.selectionStart || myField.selectionStart === '0') {
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
 
        $.get(mwc.wgScript, {
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
            if (document.getElementById('wpTextbox1')) {
                insertAtCursor(document.getElementById('wpTextbox1'), preloadDataParsed);
            } else {
                // Visual editor
                insertAtCursor(document.getElementsByClassName('cke_source')[0], preloadDataParsed);
            }
        }).fail(function() {
            notFound(page);
        });
    }
 
    function preInit(i18nData) {
        i18n = i18nData;
        i18n.useUserLang();
        $main = $('<div>', { id: 'preload-templates' });
        if (mwc.skin === 'oasis') {
            $main.append($('<h3>', {
                text: msg('preload')
            }));
        } else {
            $main.text(msg('preload'));
        }
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
        }, msg('choose')) + parsed.split('\n').map(function(line) {
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
            $.get(mwc.wgScript, {
                title: config.list,
                action: 'raw',
                ctype: 'text/plain'
            }).done(init).fail(initFail);
        });
    });
 
})();