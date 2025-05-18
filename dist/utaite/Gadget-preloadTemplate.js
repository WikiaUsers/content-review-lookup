// ================================
//    Custom preload templates
// ================================
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
    const mwc = mw.config.get([
        'wgAction',
        'wgFormattedNamespaces',
        'wgNamespaceNumber'
    ]);
    const $module = $('div#wpSummaryLabel'); // UCP source editors
    const $moduleOld = $('div.module_content:first'); // Old Non-UCP Source Editor
    
    // Run conditions
    if (mwc.wgNamespaceNumber === 8) {
        console.log('[PreloadTemplates]: page is not supported.');
        return;
    }
    console.log('[PreloadTemplates]: version 2.0 - 04/2025.');
    
    // =================
    //   Configuration
    // =================
    const config = {
        list: window.preloadTemplates_list || 'MediaWiki:Custom-PreloadTemplates',
        subpage: window.preloadTemplates_subpage || 'preload'
    };
    
    let $main, $help;
    
    // Simple messages without i18n
    const messages = {
        preload: 'Preload:',
        choose: 'Choose template...',
        help: 'Click to preload template syntax',
        error: function(page) {
            return 'Error: Could not find ' + page;
        },
        devWiki: 'Documentation'
    };
    
    // =============
    //   Functions  
    // =============
    // Get plain message
    function msg(message, param) {
        if (typeof messages[message] === 'function') {
            return messages[message](param);
        }
        return messages[message];
    }
    
    // Parse MediaWiki code to allow the use of includeonly and noninclude tags in the preload page
    function parseMW(source) {
        return source.replace(/<includeonly>(\n)?|(\n)?<\/includeonly>|\s*<noinclude>[^]*?<\/noinclude>/g, '');
    }
    
    // Error alert
    function notFound(page) {
    mw.notify(
        msg('error', '"' + page + '"'),
        {
            type: 'error',
            // autoHide: false,
            tag: 'preload-templates'
        }
    );
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
            const startPos = myField.selectionStart;
            const endPos = myField.selectionEnd;
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
        const namespace = (function() {
            if (typeof window.preloadTemplates_namespace === 'undefined') return mwc.wgFormattedNamespaces['10'];
            if (typeof mwc.wgFormattedNamespaces[window.preloadTemplates_namespace] !== 'undefined') return mwc.wgFormattedNamespaces[window.preloadTemplates_namespace];
            for (const key in mwc.wgFormattedNamespaces) {
                if (mwc.wgFormattedNamespaces[key] === window.preloadTemplates_namespace) return mwc.wgFormattedNamespaces[key];
            }
            return mwc.wgFormattedNamespaces['10'];
        })();
        
        const namespacePagename = namespace ? namespace + ':' : '';
        const page = config.subpage === 'case-by-case' ?
            namespacePagename + title :
            namespacePagename + title + '/' + config.subpage;
            
        $.get(mw.util.wikiScript(), {
            title: page,
            action: 'raw',
            ctype: 'text/plain'
        }).done(function(preloadData) {
            // Parse some MediaWiki tags
            const preloadDataParsed = parseMW(preloadData);
            // Display error if no useful data is present
            if (preloadDataParsed === '') {
                notFound(page);
                return;
            }
            
            // Insert syntax
            const cke = document.getElementsByClassName('cke_source');
            const textbox = document.getElementById('wpTextbox1');
            const cm5 = $('.CodeMirror').get(0);
            const cm6 = $('.cm-editor').get(0);
            
            if (window.ve && ve.init && ve.init.target && ve.init.target.active) {
                // UCP Visual Editor (Source mode)
                ve.init.target
                    .getSurface()
                    .getModel()
                    .getFragment()
                    .insertContent(preloadDataParsed);
            } else if (cke.length) {
                // Visual editor
                insertAtCursor(cke[0], preloadDataParsed);
            } else if (cm5) {
                // CodeMirrorV5 [legacy]: text editor with syntax highlight
                const cmEditor = cm5.CodeMirror;
                const cmdDoc = cmEditor.getDoc();
                cmdDoc.replaceRange(preloadDataParsed, cmdDoc.getCursor());
            } else if (cm6) {
                // CodeMirrorV6: text editor with syntax highlight (only way to interact with editor is through a hook return)
                const cm6Edit = function(_, cmEditor) {
                    const cmCursor = (cmEditor.view.state && cmEditor.view.state.selection && cmEditor.view.state.selection.ranges && cmEditor.view.state.selection.ranges[0]) || { from: 0, to: 0 };
                    cmEditor.view.dispatch({
                        changes: {
                            from: cmCursor.from,
                            to: cmCursor.to,
                            insert: preloadDataParsed
                        },
                        selection: { anchor: cmCursor.from }
                    });
                    cmEditor.view.focus();
                    mw.hook('ext.CodeMirror.ready').remove(cm6Edit);
                };
                mw.hook('ext.CodeMirror.ready').add(cm6Edit);
            } else if (textbox) {
                insertAtCursor(textbox, preloadDataParsed);
            } else {
                console.warn('[PreloadTemplates] Could not find textbox to bind to');
            }
        }).fail(function() {
            notFound(page);
        });
    }
    
    function appendModule() {
        const $moduleNew = $('.ve-ui-summaryPanel-summaryInputField');
        // Appending HTML to editor
        if ($module.length) {
            $module.after($main);          // UCP source editors
        } else if ($moduleOld.length) {
            $moduleOld.append($main);      // Old Non-UCP Source Editor
        } else if ($moduleNew.length) {
            $moduleNew.append($main);
        }
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
                let title = line.substring(1).trim();
                // Text after pipe is display name
                if (title.indexOf('|') !== -1) {
                    const parts = title.split('|');
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
        }).join('');
    }
    
    // =================
    //   Initialization  
    // =================
    function init() {
        $main = $('<div>', { id: 'preload-templates' });
        $main.append($('<span>', {
            text: msg('preload')
        }));
        
        $help = $('<div>', {
            id: 'pt-help'
        }).append($('<a>', {
            target: '_blank',
            href: 'https://utaite.fandom.com/wiki/PreloadTemplates',
            title: msg('devWiki'),
            text: '?'
        }));
        
        appendModule();
        
        // If the initialization failed
        function initFail() {
            $main.append(
                msg('error', mw.html.element('a', {
                    href: mw.util.getUrl(config.list)
                }, config.list)),
                $help
            );
        }
        
        function processListData(listData) {
            const parsed = parseMW(listData); // Parse data for MediaWiki tags
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
                    const $this = $(this);
                    const val = $this.val();
                    // Restore default option
                    $this.find('option:first-child').prop('selected', true);
                    // Preload the template on click
                    getPreloadPage(val);
                }),
                $help,
                $('<button>', {
		            id: 'pt-reinit-btn',
		            text: 'Reinit',
		            type: 'button'
		        })
		        .css({ marginLeft: '8px', cursor: 'pointer' })
		        .click(reinitTemplates)
            );
        }
        
        $.get(mw.util.wikiScript(), {
            title: config.list,
            action: 'raw',
            ctype: 'text/plain'
        }).done(processListData).fail(initFail);
    }
    
    // ===========
    //   Execution
    // ===========
    function reinitTemplates() {
	    $main.empty();   // remove old dropdown & help
	    init();          // rebuild it
	}
    
    mw.loader.using('mediawiki.util').then(function() {
        init();
        mw.hook('ve.activationComplete').add(appendModule);
    });
})();