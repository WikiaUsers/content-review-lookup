/******///  ================================
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

(function() {
    'use strict';
    var mwc = mw.config.get([
        'wgAction',
        'wgFormattedNamespaces',
        'wgNamespaceNumber'
    ]),
    $module = $('div#wpSummaryLabel'), // UCP source editors
    $moduleOld = $('div.module_content:first'); // Old Non-UCP Source Editor

    // Run conditions
    if (mwc.wgNamespaceNumber === 8) {
        console.log('[PreloadTemplates]: page is not supported.');
        return;
    }
    console.log('[PreloadTemplates]: version 1.06 - 07/2021.');

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

    // Parse MediaWiki code to allow the use of includeonly and noninclude tags in the preload page
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
        } else if ( myField.selectionStart || myField.selectionStart === 0 ) {
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
        var namespace = (function() {
        	if (typeof window.preloadTemplates_namespace == 'undefined') return mwc.wgFormattedNamespaces['10'];
        	if (typeof mwc.wgFormattedNamespaces[window.preloadTemplates_namespace] != 'undefined') return mwc.wgFormattedNamespaces[window.preloadTemplates_namespace];
        	for (var key in mwc.wgFormattedNamespaces) {
        		if (mwc.wgFormattedNamespaces[key] == window.preloadTemplates_namespace) return mwc.wgFormattedNamespaces[key];
        	}
        	return mwc.wgFormattedNamespaces['10'];
        })();
        var namespacePagename = (function() {
        	if (namespace) return namespace + ':';
        	return '';
        })();
        var page = config.subpage === 'case-by-case' ?
            namespacePagename + title :
            namespacePagename + title + '/' + config.subpage;

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
                textbox = document.getElementById('wpTextbox1'),
                cm = $(".CodeMirror").get(0);
            if (window.ve && ve.init && ve.init.target && ve.init.target.active) {
                // UCP Visual Editor (Source mode)
                ve.init.target
                    .getSurface()
                    .getModel().
                    getFragment()
                    .insertContent(preloadDataParsed);
            } else if (cke.length) {
                // Visual editor
                insertAtCursor(cke[0], preloadDataParsed);
            } else if (cm){
                // text editor with syntex heighting
                var cmEditor = cm.CodeMirror;
                var cmdDoc = cmEditor.getDoc();
                cmdDoc.replaceRange(preloadDataParsed, cmdDoc.getCursor());
            }
            else if(textbox) {
                insertAtCursor(textbox, preloadDataParsed);
            } else {
                console.warn('[PreloadTemplates] Could not find textbox to bind to');
            }
        }).fail(function() {
            notFound(page);
        });
    }

    function appendModule() {
        var $moduleNew = $('.ve-ui-summaryPanel-summaryInputField');
        // Appending HTML to editor
        if ( $module.length ) { 
            $module.after($main);          // UCP source editors
        } else if ( $moduleOld.length ) { 
            $moduleOld.append($main);       // Old Non-UCP Source Editor
        } else if ( $moduleNew.length ) {
            $moduleNew.append($main);
        }
    }

	// Add selector to editor
    function preInit(i18nData) {
        i18n = i18nData;
        $main = $('<div>', { id: 'preload-templates' });
        $main.append($('<span>', {
            text: msg('preload')
        }));
        $help = $('<div>', {
            id: 'pt-help'
        }).append($('<a>', {
            target: '_blank',
            href: 'https://dev.fandom.com/wiki/PreloadTemplates',
            title: msg('devWiki'),
            text: '?'
        }));
        appendModule();
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

        // Append template list and messages
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
        $.when(
            i18no.loadMessages('PreloadTemplates'),
            mw.loader.using('mediawiki.util')
        ).then(function(i18nData) {
            preInit(i18nData);
            mw.hook('ve.activationComplete').add(appendModule);
            $.get(mw.util.wikiScript(), {
                title: config.list,
                action: 'raw',
                ctype: 'text/plain'
            }).done(init).fail(initFail);
        });
    });

})();