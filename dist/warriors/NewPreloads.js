// Adapted from https://dev.fandom.com/wiki/MediaWiki:PreloadTemplates.js and modified to support multiple dropdowns.
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
    	messageList: 'MediaWiki:Custom-PreloadMessages',
        infoboxList: 'MediaWiki:Custom-PreloadInfoboxes',
        generalList: 'MediaWiki:Custom-PreloadPieces'
    }, i18n, $messages, $infoboxes, $general, $help;

    // =============
    //   Functions  
    // =============

    // Parse MediaWiki code to allow the use of includeonly and noninclude tags in the preload page
    function parseMW(source){
        return source.replace(/<includeonly>(\n)?|(\n)?<\/includeonly>|\s*<noinclude>[^]*?<\/noinclude>/g, '');
    }

    // Error alert
    function notFound(page){
        alert('Error: "' + page + '" not found');
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
    function getPreloadPage(subpage, title) {
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
        var page = subpage === 'case-by-case' ?
            namespacePagename + title :
            namespacePagename + title + '/' + subpage;

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
                cm5 = $(".CodeMirror").get(0),
                cm6 = (window && window.WikiEditorCodeMirror && window.WikiEditorCodeMirror.view) || null;
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
            } else if (cm5){
                // CodeMirrorV5 [legacy]: text editor with syntex heighting
                var cmEditor = cm5.CodeMirror;
                var cmdDoc = cmEditor.getDoc();
                cmdDoc.replaceRange(preloadDataParsed, cmdDoc.getCursor());
            } else if (cm6){
                // CodeMirrorV6: text editor with syntex heighting
                var cmcursor = (cm6.state && cm6.state.selection && cm6.state.selection.ranges && cm6.state.selection.ranges[0]) || {from:0, to:0};
                cm6.dispatch({
                    changes: {
                        from: cmcursor.from,
                        to: cmcursor.to,
                        insert: preloadDataParsed
                    },
                    selection: {anchor: cmcursor.from}
                });
                cm6.focus();
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

    function appendModule(mx) {
        var $moduleNew = $('.ve-ui-summaryPanel-summaryInputField');
        // Appending HTML to editor
        if ( $module.length ) { 
            $module.after(mx);          // UCP source editors
            $module.after($general);
        } else if ( $moduleOld.length ) { 
            $moduleOld.append(mx);       // Old Non-UCP Source Editor
            $moduleOld.append($general);
        } else if ( $moduleNew.length ) {
            $moduleNew.append(mx);
            $moduleNew.append($general);
        }
    }

    // Add selector to editor
    function preInit() {
        $general = $('<div>', { id: 'preload-templates' });
        $general.append($('<span>', {
            text: 'Common page components:'
        }));
        $help = $('<div>', {
            id: 'pt-help'
        }).append($('<a>', {
            target: '_blank',
            href: 'https://warriors.fandom.com/wiki/MediaWiki:NewPreloads.js',
            text: '?'
        }));
    	if (window.location.href.indexOf('User_talk:') !== -1) {
	        $messages = $('<div>', { id: 'preload-messages' });
	        $messages.append($('<span>', {
	            text: 'Preload a message:'
	        }));
        	appendModule($messages);
    	} else{
	        $infoboxes = $('<div>', { id: 'preload-infoboxes' });
	        $infoboxes.append($('<span>', {
	            text: 'Preload an infobox:'
	        }));
    		appendModule($infoboxes);
    	}
    }

    function listHTML(parsed) {
        return mw.html.element('option', {
            selected: true,
            disabled: true
        }, '(click to browse)') + parsed.split('\n').map(function(line) {
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
        $general.append(
            'Error: ' + mw.html.element('a', {
                href: mw.util.getUrl(config.infoboxList)
            }, config.infoboxList),
            $help
        );
    }
    
    function initMessages(listData) {
		initPiece($messages, listData, 'case-by-case');
    }

    function initInfoboxes(listData) {
		initPiece($infoboxes, listData, 'preload');
	}

    function initGeneral(listData) {
		initPiece($general, listData, 'case-by-case');
	}
	
	function initPiece(node, listData, subpage) {
        var parsed = parseMW(listData); // Parse data for MediaWiki tags

        // Display error if no valid data is present
        if (parsed === '') {
            initFail();
            return;
        } else if (node === undefined) {
        	return
        }
		
        // Append template list and messages
        node.append(
            $('<select>', {
                id: 'pt-list',
                html: listHTML(parsed)
            }).change(function() {
                var $this = $(this),
                    val = $this.val();

                // Restore default option
                $this.find('option:first-child').prop('selected', true);

                // Preload the template on click
                getPreloadPage(subpage, val);
            })
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

    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('PreloadTemplates'),
            mw.loader.using('mediawiki.util')
        ).then(function() {
            preInit();
            mw.hook('ve.activationComplete').add(appendModule);
            $.get(mw.util.wikiScript(), {
                title: config.infoboxList,
                action: 'raw',
                ctype: 'text/plain'
            }).done(initInfoboxes).fail(initFail);
            $.get(mw.util.wikiScript(), {
                title: config.messageList,
                action: 'raw',
                ctype: 'text/plain'
            }).done(initMessages).fail(initFail);
            $.get(mw.util.wikiScript(), {
                title: config.generalList,
                action: 'raw',
                ctype: 'text/plain'
            }).done(initGeneral).fail(initFail);
        });
    });

})();