// Variable pour PreloadTemplates
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
 
// Variables pour Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
}; 
 
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Standard Edit Summary/code.js',
        'u:dev:Mediawiki:PreloadTemplates.js',
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

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
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* @author Grunny */
function addHideButtons() {
	var hidables = getElementsByClass('hidable', null, null);
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		//var button = box.getElementsByClassName('hidable-button')
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[masquer]') );
 
            var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
			if( isMatch(regex ,'start-hidden', box) )
				button.onclick('bypass');
		}
	}
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent, null);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
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
			var items = getElementsByClass('hidable', null, null);
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
 
	var hidables = getElementsByClass('hidable', null, null);

	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
		
		var content = getElementsByClass('hidable-content', hidables[i], null);
		var button = getElementsByClass('hidable-button', hidables[i], null);
 
		if( show == 'false' ) {

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {

			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}