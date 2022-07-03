/**
 * Copied from [[mw:User:Alex Smotrov/edittools.js]], modified for use on the English Wikipedia.
 *
 * Configuration (to be set from [[Special:MyPage/common.js]]):
 *   window.charinsertCustom – Object. Merged into the default charinsert list. For example, setting
 *       this to { Symbols: '‽' } will add the interrobang to the end of the Symbols section.
 *   window.editToolsRecall – Boolean. Set true to create a recall switch.
 *   window.charinsertDontMove – Boolean. Set true to leave the box in its default position, rather
 *       than moving it above the edit summary.
 *   window.updateEditTools() – Function. Call after updating window.charinsertCustom to regenerate the
 *       EditTools window.
 */
/* global jQuery, mw, charinsertCustom */

window.updateEditTools = function () {
};

jQuery( document ).ready( function ( $ ) {
	var $currentFocused,
		editTools;

    function getSelectedSection() {
		var selectedSection = mw.storage.get( editTools.storageKey )
			|| mw.storage.session.get( editTools.storageKey );
		
		return selectedSection;
    }
    
    function saveSelectedSection( newIndex ) {
		mw.storage.set( editTools.storageKey, newIndex )
			|| mw.storage.session.set( editTools.storageKey, newIndex );
    }
    
    editTools = {
        // Entries prefixed with ␥ (U+2425 SYMBOL FOR DELETE FORM TWO) will not appear in the article namespace (namespace 0).
        // Please make any changes to [[MediaWiki:Edittools]] as well, however, instead of using the ␥ symbol, use {{#ifeq:{{NAMESPACE}}|{{ns:0}}| | }}.
        charinsert: {
            'Insert': ' – — [\[Category:+]] <code>+</code> <nowiki>+</nowiki> {\{hp|+}} History: ==.History.==\n{\{History\n|ver1.=.+\n|desc1_=_\n|ver2_=_\n|desc2_=_\n}} Crafting: {\{Crafting\n|a1.\=.+\n|a2_\=_\n|a3_\=_\n|b1_\=_\n|b2_\=_\n|b3_\=_\n|c1_\=_\n|c2_\=_\n|c3_\=_\n|output_\=_\n}}'
        },

        charinsertDivider: "\240",

        storageKey: 'edittoolscharsubset',

        createEditTools: function ( placeholder ) {
            var sel, id;
            var box = document.createElement( 'div' );
            var prevSubset = 0, curSubset = 0;
            box.id = 'editpage-specialchars';
            box.className = "nopopups";
            box.title = 'Click on the character or tag to insert it into the edit window';

            // append user-defined sets
            if ( window.charinsertCustom ) {
                for ( id in charinsertCustom ) {
                    if ( !editTools.charinsert[id] ) {
                        editTools.charinsert[id] = '';
                    }
                }
            }

            // create drop-down select
            sel = document.createElement( 'select' );
            for ( id in editTools.charinsert ) {
                sel.options[sel.options.length] = new Option( id, id );
            }
            sel.selectedIndex = 0;
            sel.style.marginRight = '.3em';
            sel.title = 'Choose character subset';
            sel.onchange = sel.onkeyup = selectSubset;
            box.appendChild( sel );

            // create "recall" switch
            if ( window.editToolsRecall ) {
                var recall = document.createElement( 'span' );
                recall.appendChild( document.createTextNode( '↕' ) ); // ↔
                recall.onclick = function() {
                    sel.selectedIndex = prevSubset;
                    selectSubset();
                };
                recall.style.cssFloat = 'left';
                recall.style.marginRight = '5px';
                recall.style.cursor = 'pointer';
                box.appendChild( recall );
            }

			if ( getSelectedSection() ) {
				sel.selectedIndex = getSelectedSection();
			}

            placeholder.parentNode.replaceChild( box, placeholder );
            selectSubset();
            return;

            function selectSubset() {
                // remember previous (for "recall" button)
                prevSubset = curSubset;
                curSubset = sel.selectedIndex;
                //save into web storage for persistence
                saveSelectedSection( curSubset );
                
                //hide other subsets
                var pp = box.getElementsByTagName( 'p' ) ;
                for ( var i = 0; i < pp.length; i++ ) {
                    pp[i].style.display = 'none';
                }
                //show/create current subset
                var id = sel.options[curSubset].value;
                var p = document.getElementById( id );
                if ( !p ) {
                    p = document.createElement( 'p' );
                    p.className = 'nowraplinks';
                    p.id = id;
                    
                    var tokens = editTools.charinsert[id];
                    if ( window.charinsertCustom && charinsertCustom[id] ) {
                        if ( tokens.length > 0 ) {
                            tokens += ' ';
                        }
                        tokens += charinsertCustom[id];
                    }
                    editTools.createTokens( p, tokens );
                    box.appendChild( p );
                }
                p.style.display = 'inline';
            }
        },

        createTokens: function ( paragraph, str ) {
            var tokens = str.split( ' ' ), token, i, n;
            for ( i = 0; i < tokens.length; i++ ) {
                token = tokens[i];
                n = token.indexOf( '+' );
                if ( token.charAt( 0 ) === '␥' ) {
                    if ( token.length > 1 && mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
                        continue;
                    } else {
                        token = token.substring( 1 );
                    }
                }
                if ( token === '' || token === '_' ) {
                    addText( editTools.charinsertDivider + ' ' );
                } else if ( token === '\n' ) {
                    paragraph.appendChild( document.createElement( 'br' ) );
                } else if ( token === '___' ) {
                    paragraph.appendChild( document.createElement( 'hr' ) );
                } else if ( token.charAt( token.length-1 ) === ':' ) { // : at the end means just text
                    addBold( token );
                } else if ( n === 0 ) { // +<tag>  ->   <tag>+</tag>
                    addLink( token.substring( 1 ), '</' + token.substring( 2 ), token.substring( 1 ) );
                } else if ( n > 0 ) { // <tag>+</tag>
                    addLink( token.substring( 0, n ), token.substring( n+1 ) );
                } else if ( token.length > 2 && token.charCodeAt( 0 ) > 127 ) { // a string of insertable characters
                    for ( var j = 0; j < token.length; j++ ) {
                        addLink( token.charAt( j ), '' );
                    }
                } else {
                    addLink( token, '' );
                }
            }
            return;

            function addLink( tagOpen, tagClose, name ) {
                var handler;
                var dle = tagOpen.indexOf( '\x10' );
                var a = document.createElement( 'a' );
                
                if ( dle > 0 ) {
                    var path = tagOpen.substring( dle + 1 ).split( '.' );
                    tagOpen = tagOpen.substring( 0, dle );
                    handler = window;
                    for ( var i = 0; i < path.length; i++ ) {
                        handler = handler[path[i]];
                    }
	                $( a ).on( 'click', handler );
                } else {
                    tagOpen = tagOpen.replace( /\./g,' ' );
                    tagClose = tagClose ? tagClose.replace( /_/g,' ' ) : '';
                    $( a ).on( 'click', {
                    	tagOpen: tagOpen,
                    	sampleText: '',
                    	tagClose: tagClose
                    }, insertTags );
                }

                name = name || tagOpen + tagClose;
                name = name.replace( /\\n/g,'' );
                a.appendChild( document.createTextNode( name ) );
                a.href = '';
                paragraph.appendChild( a );
                addText( ' ' );
            }

            function addBold( text ) {
                var b = document.createElement( 'b' );
                b.appendChild( document.createTextNode( text.replace( /_/g,' ' ) ) );
                paragraph.appendChild( b );
                addText( ' ' );
            }
            function addText( txt ) {
                paragraph.appendChild( document.createTextNode( txt ) );
            }
            function insertTags( e ) {
            	e.preventDefault();
            	if ( $currentFocused && $currentFocused.length && !$currentFocused.prop( 'readonly' ) ) {
					$currentFocused.textSelection(
						'encapsulateSelection', {
							pre: e.data.tagOpen,
							peri: e.data.sampleText,
							post: e.data.tagClose
						}
					);
				}
            }
        },

        setup: function () {
            var placeholder;
            if ( $( '#editpage-specialchars' ).length ) {
                placeholder = $( '#editpage-specialchars' )[0];
            } else {
                placeholder = $( '<div id="editpage-specialchars"> </div>' ).prependTo( '.mw-editTools' )[0];
            }
            if ( !placeholder ) {
                return;
            }
            if ( !window.charinsertDontMove ) {
                $( '.editOptions' ).before( placeholder );
            }
            // Find the element that is focused
            $currentFocused = $( '#wpTextbox1' );
            // Apply to dynamically created textboxes as well as normal ones
			$( document ).on( 'focus', 'textarea, input:text', function () {
				$currentFocused = $( this );
			} );

			// Used to determine where to insert tags
            editTools.createEditTools( placeholder );
            window.updateEditTools = function () {
                editTools.createEditTools( $( '#editpage-specialchars' )[0] );
            };
        }

    }; // end editTools

    editTools.setup();
} );