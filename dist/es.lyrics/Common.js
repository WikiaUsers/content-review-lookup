// <nowiki>
 
 
/**
 * Collapsible tables
 *
 * Description: Allows tables to be collapsed, showing only the header.
 * Slightly modified from source, to support AJAX-loaded pages (e.g. edit preview in Wikia skin)
 *
 * @version 2.0.2 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */
 
importScriptPage('MediaWiki:AudioIntegrator/AudioIntegrator.js', 'dev');

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
			// TODO: Declare styles in [[MediaWiki:Gadget-collapsibleTables.css]]
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
    WarnBar.innerHTML='<span id="WarnBarHead">&nbsp;</span><div id="WarnBarMsg">The page you are creating does <b>not</b> match our <b><a href="http://lyrics.wikia.com/LW:PN" target="_blank">page naming conventions</a></b>.<br>The correct title is <b>"<a href="http://lyrics.wikia.com/'+FLUC.replace(/ /g,"_")+'" target="_blank">'+FLUC+'</a>"</b>. Please use that page instead.</div><span id="WarnBarX" onClick="WarnBarHide();" title="Hide">x</span>';
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
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 * @source http://runescape.wikia.com/wiki/MediaWiki:Common.js/youtube.js
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
                contents = $this.html().split('|'),
                $iframe;
 
            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
 
            $iframe = $('<iframe>')
                .attr({
                    src: 'https://www.youtube.com/embed/' + contents[0],
                    height: contents[1],
                    width: contents[2]
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

 
importArticle({type: 'script', article: 'w:c:dev:VisualSpellCheck/code.js'});


//<syntaxhighlight lang="javascript">
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        outerLoop:
        switch (spans[index].className) {
            case "Metacafe":
                spans[index].innerHTML = '<iframe width="560" height="315" src="http://www.metacafe.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "HaganTube":
                spans[index].innerHTML = '<iframe width="640" height="360" src="http://hagantube.diamandahagan.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" allowfullscreen="true" seamless="true"></iframe>';
                break outerLoop;
            case "Crackle":
                spans[index].innerHTML = '<object width="640" height="360" type="application/x-shockwave-flash" data="http://legacyweb-us.crackle.com/flash/ReferrerRedirect.ashx"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="flashvars" value="rootURL=http%3A%2F%2Flegacyweb-us.crackle.com&amp;id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></object>';
                break outerLoop;
            case "Facebook":
                spans[index].innerHTML = '<iframe src="https://www.facebook.com/video/embed?video_id=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" style="display: inline-block; height: inherit; width: inherit;"></iframe>' ;
                break outerLoop;
            case "Vine":
                spans[index].innerHTML = '<iframe src="https://vine.co/v/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/embed/simple" style="width: inherit; height: inherit;"></iframe>';
                break outerLoop;
            case "afreeca":
                spans[index].innerHTML = '<iframe src="http://play.afreeca.com/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/embed" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "internetArchive":
                spans[index].innerHTML = '<iframe src="https://archive.org/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" style="width: inherit; height: inherit;" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "YahooTV":
                spans[index].innerHTML = "<iframe style='width: inherit; height: inherit;' frameborder='0' src='https://www.yahoo.com/tv/v/" + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + "?format=embed' allowfullscreen='true' allowtransparency='true'></iframe>";
                break outerLoop;
            case "WikimediaCommons":
                spans[index].innerHTML = '<iframe src="https://commons.wikimedia.org/wiki/File%3A' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '?embedplayer=yes" style="width: inherit; height: inherit;" frameborder="0" ></iframe>';
                break outerLoop;
            case "openload":
spans[index].innerHTML = '<iframe data-src="https://openload.co/embed' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" width="617" height="370" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" src="https://openload.co/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '"></iframe>';
              break outerLoop;
            case "funnyordie":
                spans[index].innerHTML = '<iframe src="https://www.funnyordie.com/embed/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" style="width: inherit; height: inherit;" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            case "TwitchStream":
                spans[index].innerHTML = '<iframe src="https://player.twitch.tv/?channel=' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '" frameborder="0" scrolling="no" height="378" width="620"></iframe>'
                break outerLoop;
            case "ellenTube":
                spans[index].innerHTML = '<iframe style="width: inherit; height: inherit;" src="https://widgets.ellentube.com/videos/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '/" frameborder="0" allowfullscreen="true"></iframe>';
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});

$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("style") && spans[index].getAttribute("class")) {
          if (spans[index].style.width && spans[index].style.height && spans[index].getAttribute("class")=="VevoVid") {
            spans[index].innerHTML = "<iframe width='" + mw.html.escape(spans[index].style.width) + "' height='" + mw.html.escape(spans[index].style.height) + "' src='http://cache.vevo.com/assets/html/embed.html?video=" + mw.html.escape(encodeURIComponent(spans[index].getAttribute("data-widget-id"))) + "&autoplay=0' frameborder='0' allowfullscreen='true'></iframe>";
          }
      }
   }
});
// </nowiki>