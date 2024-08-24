/* © Star Wars Wiki */

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'cacher' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'cacher', 'afficher' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'afficher', 'cacher' ) );
		}
	} );
} );

/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/* @author Grunny */
function addHideButtons() {
    var hidables = document.querySelectorAll('.hidable');

    if (hidables !== null){
    	for( var i = 0; i < hidables.length; i++ ) {
    		var box = hidables[i];
    		var button = box.querySelector('span.hidable-button');
     
    		if( button !== null ) {
    			button.onclick = toggleHidable;
    			button.appendChild( document.createTextNode('[masquer]') );
    
                var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
    			if( isMatch(regex ,'start-hidden', box) )
    				button.onclick('bypass');
    		}
    	}
    }
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = this.closest('.hidable');
	
	var content = parent.querySelectorAll('.hidable-content');
	var nowShown;
 
	if( content !== null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[masquer]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[afficher]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = document.querySelectorAll('.hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
    var hidables = document.querySelector('.hidable');

    if (hidables !== null){
        for(var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
    		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
    		
    		var content = box.querySelector('.hidable-content');
    		var button = box.querySelector('.hidable-button');
    
    		if( show == 'false' ) {
    			if( content !== null &&	button !== null && content[0].style.display != 'none' )	{
    				button[0].onclick('bypass');
    			}
    		} else if( show == 'true' ) {
    			if( content !== null && button !== null && content[0].style.display == 'none' )	{
    				button[0].onclick('bypass');
    			}
    		}
    	}
    }
}

function isMatch(regex, className, element) {
	return regex.test(element.className);
}
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
/*window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */