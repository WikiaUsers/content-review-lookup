/*global mw, $, importStylesheet, importScript */
/*jshint curly:false eqnull:true, strict:false, browser:true, */
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:ReferencePopups/code.js',
    ]
});

/**
 * Map addPortletLink to mw.util 
 *
 * @deprecated: Use mw.util.addPortletLink instead.
 */
window.addPortletLink = function () {
    return mw.util.addPortletLink.apply( mw.util, arguments );
};
 
/**
 * Extract a URL parameter from the current URL
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
window.getURLParamValue = function () {
    return mw.util.getParamValue.apply( mw.util, arguments );
};
 
/** 
 * Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
window.hasClass = function ( element, className ) {
    return $( element ).hasClass( className );
};

/**
 * Load scripts specific to Internet Explorer
 */
if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
}

/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[wikipedia:Wikipedia:NavFrame]].
 * Maintainers: [[wikipedia:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[wikipedia:Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
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
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
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
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
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
    }
}
 
$( createNavigationBarToggleButton );
/*** end copied from [[wikipedia:MediaWiki:Common.js]] ***/


// ==================================================
//            Archive edit tab/button disabling
// ==================================================

/* Disables the edit tab/button on discussion pages to stop people bumping old forum threads or editing archive pages.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Wikia (Oasis) support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if(wgNamespaceNumber == 110 || wgNamespaceNumber%2 == 1) {

function disableEditLink() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if( !document.getElementById('archived-edit-link') )
		return;

        if(skin == 'oasis')
	{
		$('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
		return;
	}
	if( !document.getElementById('ca-edit') )
		return;
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}


	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';

	$('span.editsection-upper').remove();

}
addOnloadHook( disableEditLink );
}

/** Page format checking *********************************************************
 *
 *  Maintainers: [[User:Falzar FZ]]
 */
var mNamespace = mw.config.get('wgCanonicalNamespace');
var mAction    = mw.util.getParamValue('action');
var mPreload   = mw.util.getParamValue('preload');
var mRedlink   = mw.util.getParamValue('redlink');
var mUseFormat = mw.util.getParamValue('useFormat');
var mSection   = mw.util.getParamValue('section');

	/*
	 * Check that you have signed your post on Talk pages and Forum pages.
 
	 * Disable for yourself on every page by adding:
			var signCheck = "Disable";
		to [[Special:MyPage/common.js]]
 
	 * Alternatively, if you sign with 3 tildes, add:
			var signCheck = 3;
 
	 * To disable checking on a specific page for everyone, add:
			<!--~~~~-->
		 to that page somewhere, it will overlook it each time.
	 */
if (mNamespace.match(/talk/i) || mNamespace == "Forum") {
	if (!document.URL.match("&undo") && !document.URL.match("/Archive")) {
		addOnloadHook(function() {
			$('#wpSave, #wpPreview').mousedown(signChecker);
		});
	
		var vSignCheckerCounter = 0;
		var mInitialLength = $('#wpTextbox1').val().length;
		function signChecker() {
			var vForumMessage = "Be sure to sign your edits with four tildes: ~~\~~"; // Bypassing the line in the forum template.
			var vNoWiki = "<nowiki>~~\~~</nowiki>";
			var vMinorChecked = $('#wpMinoredit').is(':checked');
			var mFinalLength = $('#wpTextbox1').val().length;

			var vText = $('#wpTextbox1').val().replace(vForumMessage, "").replace(vNoWiki, "");
			if (vSignCheckerCounter < 3 && !vText.match("~~\~~")
					&& vText != "{\{Talkheader}\}" && !vText.match("{\{Delete")
					&& !vMinorChecked && !$('#wpSummary').val().match(/move/i)
					&& !$('#wpSummary').val().match(/archive/i)
					&& mFinalLength > mInitialLength + 15) {
				vSignCheckerCounter++;
				if (!window.signCheck) {
					alert("Please sign your post by adding 4 tildes (~~\~~) to the end of your post.");
				} else if (window.signCheck == 3) {
					alert("Please sign your post by adding 3 tildes (~\~~) to the end of your post.");
				} else if (window.signCheck == "Disable") {
					vSignCheckerCounter = 9;
				}
			}
		}
	}
}

// Add Template:Navigation if it's not there.
if (mNamespace == "Card_Gallery"
		|| mNamespace == "Card_Rulings"
		|| mNamespace == "Card_Errata"
		|| mNamespace == "Card_Tips"
		|| mNamespace == "Card_Appearances"
		|| mNamespace == "Card_Trivia"
		|| mNamespace == "Card_Lores"
		|| mNamespace == "Card_Artworks"
		|| mNamespace == "Card_Names"
		|| mNamespace == "Card_Sets") {
	if (!mSection && mAction != "submit") {
		addOnloadHook(addNav);
	
		function addNav() {
			var vText = $('#wpTextbox1').val().replace("{\{navigation", "{\{Navigation").replace("{\{Navigation2}", "{\{Navigation|mode=nonGame}");
			if (!vText.match("{\{Navigation") && !vText.match("{\{Delete")) {
				$('#wpTextbox1').val("{\{Navigation}\}\n\n" + vText);
			} else {
				$('#wpTextbox1').val(vText);
			}

			$('form[name=editform]').submit(function() {
				if ($('#wpTextbox1').val() == "{\{Navigation}\}\n\n") {
					alert("You have not made any changes to the template.");
					return false;
				}
			});
		}
	}
}

// Add Template:Talkheader if it's not there.
if (mNamespace.match(/talk/i) && mNamespace != "User_talk" && !mSection && mAction != "submit") {
	addOnloadHook(addTalkheader);
	
	function addTalkheader() {
		var vText = $('#wpTextbox1').val().replace("{\{talkheader", "{\{Talkheader");
		if (!vText.match("{\{Talkheader") && !vText.match("{\{Delete")) {
			$('#wpTextbox1').val("{\{Talkheader}\}\n\n" + vText);
		} else {
			$('#wpTextbox1').val(vText);
		}
	}
}

// Add a preload depending on the namespace during page creation from redlink.
if (mRedlink) {

	if (mNamespace == "Card_Tips"
			|| mNamespace == "Card_Trivia"
			|| mNamespace == "Card_Names") {
		var vCardNavTemplate = "{\{Navigation}\}\n\n* "; // Deliberate no "\n" at the end.
		addOnloadHook(addPreload(vCardNavTemplate));
	} else if (mNamespace == "Card_Gallery") {
		var vCardGalleryTemplate = "{\{Navigation}\}\n\n{\{GalleryHeader|lang=en}\}\n<gallery widths=\"175px\">\nImage.png  | [[Set Number]] ([[Rarity]])<br />''([[Edition]])''<br />[[Set Name]]\n</gallery>\n|}\n\n{\{GalleryHeader|lang=jp|set=Anime}\}\n<gallery widths=\"175px\">\nImage.png  | [[]]\n</gallery>\n|}\n";
		addOnloadHook(addPreload(vCardGalleryTemplate));
	} else if (mNamespace == "Card_Appearances") {
		var vCardAppearancesTemplate = "{\{Navigation}\}\n\n* In [[Yu-Gi-Oh! ZEXAL - Episode 000|episode 00]], [[character name]] plays this card against [[opponent name]].\n";
		addOnloadHook(addPreload(vCardAppearancesTemplate));
	} else if (mNamespace == "Card_Errata") {
		var vCardErrataTemplate = "{\{Navigation}\}\n\n{\{Errata table\n| lore0  = \n| image0 = \n| cap0   = [[Set Number]]<br />[[Set Name]]\n\n| lore1  = \n| image1 = \n| cap1   = [[Set Number]]<br />[[Set Name]]\n}\}\n";
		addOnloadHook(addPreload(vCardErrataTemplate));
	} else if (mNamespace == "Card_Artworks") {
		var vCardArtworksTemplate = "{\{Navigation}\}\n\n* \n\n{\{ArtworkHeader|lang=jp}\}\n<gallery widths=\"275px\">\nImage.png  | Japanese\nImage.png  | International\n</gallery>\n|}\n";
		addOnloadHook(addPreload(vCardArtworksTemplate));
	}

	function addPreload(pBlankTemplate) {
		$('#wpTextbox1').val(pBlankTemplate);
		
		$('#wpSave, #wpPreview').mousedown(cleanUpStuff);
		function cleanUpStuff() {
			$('#wpTextbox1').val($('#wpTextbox1').val().replace("{\{Navigation2}\}", "{\{Navigation|mode=nonGame}\}")).replace("{\{Navigation3}\}", "{\{Navigation|mode=otherGame}\}");
		}
		
		$('form[name=editform]').submit(function() {
			if ($('#wpTextbox1').val() == pBlankTemplate) {
				alert("You have not made any changes to the template.");
				return false;
			}
		});

	}

}

// Prevent "accidental" save of the default (MediaWiki:Newpagelayout) "blank" new page template.
if (mUseFormat) {
	addOnloadHook(function() {
		var vNewPageLayout = "Write the first paragraph of your article here.\n\n==Section heading==\n\nWrite the first section of your article here. \n\n==Section heading==\n\nWrite the second section of your article here.\n";
		$('form[name=editform]').submit(function() {
			if ($('#wpTextbox1').val() == vNewPageLayout) {
				alert("You have not made any changes to the template.");
				return false;
			}
		});
	});
}

//Add missing preload to [[MediaWiki:Createbox-exists]]. Using js since there doesn't seem to be a "getURL" option in the wikia magic words.
if (mAction == "create" && $('[name="preload"]').val() == "") {
	$('[name="preload"]').val(mPreload);
}

// "File - " -> "File:"
if( skin == 'monobook' )
 if (document.getElementsByClassName('ns-6'))
  if (document.getElementById('firstHeading'))
  {
   document.getElementById('firstHeading').innerHTML = document.getElementById('firstHeading').innerHTML.replace('File - ','File:');
   document.title = document.title.replace('File - ', 'File:');
  }

/* remove empty rows from {{Infobox}} transclusions */
$('.infobox tr').each(function () {
     if (!$.trim($(this).text()) && !$(this).find('img').length && !$(this).find('hr').length ) $(this).remove();
});
 
/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */