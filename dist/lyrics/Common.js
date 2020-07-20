/*
ATTENTION ADMINISTRATORS:

This page contains JavaScript used with all skins.
For skin-specific JavaScript, see [[MediaWiki:Monobook.js]] and [[MediaWiki:Wikia.js]].
*/


/**
 * Collapsible tables
 *
 * Description: Allows tables to be collapsed, showing only the header.
 * Slightly modified from source, to support AJAX-loaded pages (e.g. edit preview in Wikia skin)
 *
 * @version 2.0.2 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[mw:User:R. Koot]]
 * @author [[mw:User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */

$(function () {
'use strict';

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

function collapseTable( tableIndex ) {
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
}

function createClickHandler( tableIndex ) {
	return function ( e ) {
		e.preventDefault();
		collapseTable( tableIndex );
	};
}

function createCollapseButtons( $content ) {
	var tableIndex = 0;
	var NavigationBoxes = {};
	var i;

	$content.find( 'table' ).each( function( index, table ) {
		if ( $( table ).hasClass( 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = table.getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				return;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				return;
			}

			NavigationBoxes[tableIndex] = table;
			table.setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
			// TODO: Declare styles in MediaWiki:Gadget-collapsibleTables.css
			// Button.className = 'collapseButton';
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';

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

	for ( i = 0; i < tableIndex; i++ ) {
		if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
			( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
		) {
			collapseTable( i );
		}
	}
}

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

});


/**
 * WarnBar for LW:PN - maintained by LWChris
 *
 * Successfully tested with
 *    Firefox 3.6.3
 *    Internet Explorer 8.0.6001.18904
 *    Opera 10.51 Build 3315
 *    Safari 3.2.2 (525.28.1)
 */

// commented out as not currently working - seems an interesting idea though, perhaps it could be revived?
/*
function WarnBarShow() {
  Body=document.getElementById("body");
  Body.insertBefore(WarnBar,Body.firstChild);
  for(a=60;a<=105;++a){
   window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(a-105)+"px; margin-bottom: "+(a-105)+"px;');",a*10);
  };
};

function WarnBarHide() {
  for(a=1;a<=46;++a){
    window.setTimeout("document.getElementById('WarnBar').setAttribute('style','top: "+(-a)+"px; margin-bottom: "+(-a)+"px;');",a*10);
  };
};

if(wgNamespaceNumber+wgArticleId==0){
  var FLUC="", ColAt=wgTitle.indexOf(":"), NewWord=true;
  for(CN=0;CN<wgTitle.length;++CN){
    Letter=wgTitle.substring(CN,CN+1);
    FLUC+=(NewWord)?Letter.toUpperCase():Letter;
    NewWord=(Letter==" "||CN==ColAt);
  };
  if(wgTitle!=FLUC){
    WarnBar=document.createElement("div");
    WarnBar.setAttribute("style","top: -46px; margin-bottom: -46px;");
    WarnBar.setAttribute("id","WarnBar");
    WarnBar.innerHTML='<span id="WarnBarHead">&nbsp;</span><div id="WarnBarMsg">The page you are creating does <b>not</b> match our <b><a href="//lyrics.wikia.com/LW:PN" target="_blank">page naming conventions</a></b>.<br>The correct title is <b>"<a href="//lyrics.wikia.com/'+FLUC.replace(/ /g,"_")+'" target="_blank">'+FLUC+'</a>"</b>. Please use that page instead.</div><span id="WarnBarX" onClick="WarnBarHide();" title="Hide">x</span>';
    window.setTimeout("WarnBarShow();", 1500); // Wait for the "body" Element
  };
};
*/


/**
 * YouTube video embedder
 *
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * Slightly modified from source, to support AJAX-loaded pages (e.g. edit preview in Wikia skin)
 *
 * See https://runescape.wikia.com/wiki/Template:Youtube for further documentation
 * @source https://runescape.wikia.com/wiki/MediaWiki:Common.js/youtube.js
 */

;(function ($) {

    'use strict';

    function injectVideo($content) {
        var $tags = $content.find('.youtube');

        if (!$tags.length) {
            return;
        }

        $tags.each(function () {
            var $this = $(this),
                contents = $this.text().split('|'),
                $iframe;

            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }

            // normal links always have querystring (ex. "youtube.com/watch?v=xyz")
            // but embed links don't, so replace first "&" with "?" to fix these
            if (contents[0].indexOf('&') !== -1) {
                contents[0] = contents[0].replace('&', '?');
            }

            $iframe = $('<iframe>')
                .attr({
                    src: 'https://www.youtube-nocookie.com/embed/' + contents[0],
                    height: contents[1],
                    width: contents[2],
                    allowfullscreen: 'allowfullscreen'
                });

            $this
                .empty()
                .append($iframe)
                // reverse the display:none; set in the template
                .show();
        });

        $content.find('.original-link').hide();
    }

    mw.hook('wikipage.content').add(injectVideo);

}(jQuery));


/**
 * SOTD submitter
 * 
 * Intercept SOTD nominations made at [[Special:SOTD]] and add them to [[LyricWiki talk:Song of the Day]] instead
 */

if (mw.config.get('wgPageName') === 'Special:SOTD' && mw.config.get('wgUserName') !== 'LWChris') {
    importArticles({
        type: 'script',
        articles: ['MediaWiki:SOTD submitter.js']
    });
}