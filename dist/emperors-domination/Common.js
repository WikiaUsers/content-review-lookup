/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
// Based on https://www.mediawiki.org/wiki/Extension:WikiEditor/Toolbar_customization
////////////////////////////////////////////////////////////////////
*/
var customizeToolbar = function () {
	/* Comment */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'main',
	group: 'format',
	tools: {
		"comment": {
			label: 'Comment',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "<!-- ",
					post: " -->"
					}
				}
			}
		}
	} );
	/* Quote */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'insert',
	tools: {
		"quote": {
			label: 'Quote',
			type: 'button',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Quote|",
					post: "|zh=|speaker=|source=}}"
					}
				}
			}
		}
	} );
	/* Literal meaning */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'insert',
	tools: {
		"literal": {
			label: 'Literal meaning',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/5/53/Button_Zh.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Translation|original=",
					post: "|literal=}}"
					}
				}
			}
		}
	} );
	/* Gallery */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'insert',
	tools: {
		"gallery": {
			label: 'Gallery',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/central/images/1/12/Button_gallery.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Tabs|[[{{BASEPAGENAME}}|Main]]|[[{{BASEPAGENAME}}/Gallery|Gallery]]}}\r<gallery position=center spacing=small widths=250 captionalign=center>\r\r",
					post: "</gallery>\r[[Category:Galleries]]"
					}
				}
			}
		}
	} );
	/*-------- INFOBOXES --------*/
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	groups: {
		"infoboxes": {
			'label': 'Infoboxes'
		}
	}
	} );
	/* Character */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"character": {
			label: 'Character',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox character\r|title             = {{PAGENAME}}\r|title_ref         = \r|chinese_title     = ",
					post: "\r|name              = {{PAGENAME}}\r|name_ref          = \r|chinese_name      = \r|aliases           = \r|afiliation        = \r|occupation        = \r|relatives         = \r|master(s)         = \r|disciple(s)       = \r\r|gender            = \r|age               = \r|status            = \r\r|era               = \r|race              = \r|world             = \r|region            = \r|nation            = \r|city              = \r\r|level             = \r|number_of_fp      = \r|fate_palace       = \r|life_wheel        = \r|physique          = \r\r|first_appearance  = \r|death_appearance  = \r\r|history           = \r|description       = \r|techniques        = \r|items             = \r}}"
					}
				}
			}
		}
	} );
	/* Location */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"location": {
			label: 'Location',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/f/f2/Location_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox location\r|title                 = {{PAGENAME}}\r|title_ref             = \r|chinese_title         = ",
					post: "\r|status                = \r\r|founder               = \r|immortal_emperor(s)   = \r<!-- for sects -->\r|heavenly_guardian     = \r|old_ancestors         = \r|supreme_elders        = \r|sect_master           = \r|elders                = \r|guest_advisor         = \r|protectors            = \r|sectional_leaders     = \r|prime_descendant      = \r|prime_disciple        = \r|disciples             = \r|former_members        = \r<!-- for nations -->\r|ruler                 = \r|citizens              = \r<!-- for tribes -->\r|tribe_chief           = \r|members               = \r\r|race                  = \r|era                   = \r|type                  = <!-- World / Region / Sect / Ancient Kingdom / Kingdom / Country / City / Place / Tribe / Clan / etc. -->\r|world                 = \r|region                = \r|nation                = \r|sect                  = \r|city                  = \r\r|first_appearance      = \r\r|history               = \r|geography             = \r|sublocations          = \r|description           = \r|techniques            = \r|items                 = \r}}"
					}
				}
			}
		}
	} );
	/* Item */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"item": {
			label: 'Item',
			type: 'button',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Button_bombe.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox item\r|title               = {{PAGENAME}}\r|title_ref           = \r|chinese_title       = ",
					post: "\r|status              = \r|era                 = \r\r|type                = <!-- Weapon / Defining Treasure / Life Treasure / True Treasure / Foreign Dao Treasure / Grand Heavenly Treasure / Grand Heavenly Scripture / Heavenly Cauldron / Emperor's Possession -->\r|grade               = <!-- Mortal / ... / Virtuous Paragon / Immortal Emperor -->\r\r|creator             = \r|current_owner       = \r|former_owner        = \r\r|first_appearance    = \r\r|history             = \r|description         = \r|properties          = \r}}"
					}
				}
			}
		}
	} );
	/* Technique */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"technique": {
			label: 'Technique',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/a/aa/Button_Technique.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox Technique\r|title                  = {{PAGENAME}}\r|title_ref              = \r|chinese_title          = ",
					post: "\r\r|type                   = <!-- Martial Art / Technique / Fate Palace Merit Law / Life Wheel Merit Law / Physique Merit Law / Alchemic Technique / Heaven's Will Secret Law / Formation Technique -->\r|level                  = <!-- Mortal / ... / Virtuous Paragon / Immortal Emperor -->\r\r|era                    = \r\r|creator                = \r|users                  = \r|former_users           = \r\r|first_appearance       = \r\r|history                = \r|capabilities           = \r}}"
					}
				}
			}
		}
	} );
	/* Event */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"event": {
			label: 'Event',
			type: 'button',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Button_%C3%A9clair.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox event\r|title             = {{PAGENAME}}\r|title_ref         = \r|chinese_title     = ",
					post: "\r\r|type              = <!-- War / Battle / Auction / ... -->\r|era               = \r\r|world             = \r|region            = \r|nation            = \r|sect              = \r|city              = \r|place             = \r\r|side1             = \r|side2             = \r\r|objective1        = \r|objective2        = \r\r|outcome           = \r\r|first_appearance  = \r|last_appearance   = \r\r|history           = \r}}"
					}
				}
			}
		}
	} );
	/* Race */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"race": {
			label: 'Race',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/a/a5/Button_Race.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox Race\r|title                  = {{PAGENAME}}\r|title_ref              = \r|chinese_title          = ",
					post: "\r|aliases                = \r\r|era                    = \r|world                  = \r\r|first_appearance       = \r\r|history                = \r|description            = \r}}"
					}
				}
			}
		}
	} );
	/* Cultivation */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"cultivation": {
			label: 'Cultivation',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/4/42/Button_Cultivation.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox Cultivation\r|title                  = {{PAGENAME}}\r|title_ref              = \r|chinese_title          = ",
					post: "\r\r|type                   = <!-- Physique / Fate Palace / Life Wheel / Immortal Bone / Divine Eyes -->\r|subtype                = <!-- Houtian / Xiantian / King / Saint / Immortal -->\r|cultivators            = \r|former_cultivators     = \r\r|first_appearance       = \r\r|history                = \r|capabilities           = \r|laws                   = \r}}"
					}
				}
			}
		}
	} );
	/* Substance */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"substance": {
			label: 'Substance',
			type: 'button',
			icon: 'https://vignette.wikia.nocookie.net/emperors-domination/images/b/bb/Button_Substance.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox substance\r|title             = {{PAGENAME}}\r|title_ref         = \r|chinese_title     = ",
					post: "\r\r|type              = <!-- Destiny Stone / Grand Dao Metal / Liquid / Metal / etc. -->\r|era               = \r\r|current_owner     = \r|former_owner      = \r\r|first_appearance  = \r|last_appearance   = \r\r|history           = \r|description       = \r|properties        = \r"
					}
				}
			}
		}
	} );
	/* Group */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"group": {
			label: 'Group',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/5/5d/Team_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox group\r|title            = {{PAGENAME}}\r|title_ref        = \r|chinese_title    = ",
					post: "\r|status           = \r|era              = \r\r|founder          = \r|leader           = \r|members          = \r|former_members   = \r\r|first_appearance = \r|last_appearance  = \r\r|history          = \r|techniques       = \r|items            = \r}}"
					}
				}
			}
		}
	} );
	/* Chapter */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"chapter": {
			label: 'Chapter',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox Chapter\r|title         = \r|chinese_title = \r|zh_release    = \r|eng_release   = \r|volume        = ",
					post: "\r\r|characters    = \r* {{a|[[Li Qiye]]}}\r|locations     = \r|races         = \r* {{a|[[Humans]]}}\r|items         = \r|techniques    = \r|concepts      = \r|eras          = \r* {{a|[[Current Era]]}}\r|events        = \r}}"
					}
				}
			}
		}
	} );
	/* Volume */
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'advanced',
	group: 'infoboxes',
	tools: {
		"volume": {
			label: 'Volume',
			type: 'button',
			icon: 'https://images.wikia.nocookie.net/marveldatabase/images/8/88/Comic_List.png',
			action: {
				type: 'encapsulate',
				options: {
					pre: "{{Infobox Volume\r|volume         = \r|release        = \r|ISBN           = \r|cover          = ",
					post: "\r\r|summary_eng    = \r|summary_zh     = \r}}"
					}
				}
			}
		}
	} );
}

/* Check if view is in edit mode and that the required modules are available. Then, customize the toolbar … */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	mw.loader.using( 'user.options' ).then( function () {
		// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
		if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor' ), $.ready
			).then( customizeToolbar );
		}
	} );
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
 *
 * @version 2.0.3 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */

var autoCollapse = 2;
var collapseCaption = '-';
var expandCaption = '+';
var tableIndex = 0;

function collapseTable( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.rows;
    var i;
    var $row0 = $(Rows[0]);

    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = $row0.css( 'display' );
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createClickHandler( tableIndex ) {
    return function ( e ) {
        e.preventDefault();
        collapseTable( tableIndex );
    };
}

function createCollapseButtons( $content ) {
    var NavigationBoxes = {};
    var $Tables = $content.find( 'table' );
    var i;

    $Tables.each( function( i, table ) {
        if ( $(table).hasClass( 'collapsible' ) ) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = table.getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) {
                return;
            }
            var Header = table.getElementsByTagName( 'th' )[0];
            if ( !Header ) {
                return;
            }

            NavigationBoxes[ tableIndex ] = table;
            table.setAttribute( 'id', 'collapsibleTable' + tableIndex );

            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton';

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );

            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    } );

    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
            ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
        ) {
            collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

/**
 * Add support to mw-collapsible for autocollapse, innercollapse and outercollapse
 *
 * Maintainers: TheDJ
 */
function mwCollapsibleSetup( $collapsibleContent ) {
	var $element,
		autoCollapseThreshold = 2;
	$.each( $collapsibleContent, function (index, element) {
		$element = $( element );
		if ( index > autoCollapseThreshold && $element.hasClass( 'autocollapse' ) ) {
			$element.data( 'mw-collapsible' ).collapse();
		} else if ( $element.hasClass( 'innercollapse' ) ) {
			if ( $element.parents( '.outercollapse' ).length > 0 ) {
				$element.data( 'mw-collapsible' ).collapse();
			}
		}
	} );
}

mw.hook( 'wikipage.collapsibleContent' ).add( mwCollapsibleSetup );

/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */

/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
var indexNavigationBar = 0;

/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;

    if ( !NavFrame || !NavToggle ) {
        return false;
    }

    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }

    event.preventDefault();
};

/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton( $content ) {
    var NavChild;
    /* iterate over all < div >-elements */
    var $divs = $content.find( 'div' );
    $divs.each( function ( i, NavFrame ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {

            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );

            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );

            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    } );
}

mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );