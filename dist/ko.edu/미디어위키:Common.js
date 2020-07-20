/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/* */
/* 현재 시각 표시 */
( function( $, undefined ) {
 
function showLocalTime( $target ) {
	var dateNode = LocalLiveClockConfig.node;
	if( !dateNode ) {
		return;
	}
 
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();
	var ss = now.getSeconds();
	if ( typeof $target === 'undefined' ) {
		$target = $( dateNode ).find( 'a:first' );
	}
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	$target.text( time );
 
	setTimeout( function(){
		showLocalTime( $target );	
	}, 1000 );
}
 
function localLiveClock() {
	appendCSS( '#localdate a { font-weight:bolder; font-size:120%; }' );
 
	if ( typeof( LocalLiveClockConfig ) === 'undefined' ) {
		window.LocalLiveClockConfig = {};
	}
	var portletId = LocalLiveClockConfig.portletId || 'p-personal';
	var nextNode = LocalLiveClockConfig.nextNodeId ? document.getElementById( LocalLiveClockConfig.nextNodeId ) : undefined;
	LocalLiveClockConfig.node = addPortletLink(
		portletId,
		wgScript + '?title=' + encodeURIComponent( wgPageName ) + '&action=purge',
		'',
		'localdate',
		undefined,
		undefined,
		nextNode
	);
	if( !LocalLiveClockConfig.node ) {
		return;
	}
 
	showLocalTime();
}
$( document ).ready( localLiveClock );
 
} )( jQuery );
 
/* 문단명 옆 [편집] 버튼 */
// **********************************************************************
// **                 ***WARNING GLOBAL GADGET FILE***                 **
// **             changes to this file affect many users.              **
// **           please discuss on the talk page before editing         **
// **                                                                  **
// **********************************************************************
// Imported from [[User:Alex Smotrov/edittop.js]], version as of: 2007-06-19T04:28:52
// Updated from [[User:TheDJ/Gadget-edittop.js]], version as of: 2009-04-28T11:54:22

if ($.inArray( mw.config.get('wgAction'), [ 'view', 'purge' ]) !== -1 && mw.config.get( 'wgNamespaceNumber' ) >=0) {
  $(function edittop_hook () {
    var localtitles = {
      cs: 'Editovat úvodní sekci',
      en: 'Edit lead section',
      fa: 'ویرایش بخش آغازین',
      fr: 'Modifier le résumé introductif',
      it: 'Modifica della sezione iniziale',
      ja: '導入部を編集',
      ko: '도입부를 편집',
      pt: 'Editar a seção superior',
      'pt-br': 'Editar a seção superior'
    };

    var our_content = document.getElementById ("content") || document.getElementById ("mw_content") || document.body;
    var editspans = getElementsByClassName (our_content, "span", "editsection");
    var span1;
    var dir = $('#firstHeading').css('direction') || 'rtl';
    var side = "right";

    if (dir.toLowerCase() == "rtl" ) {
      side = "left";
    }


    for (var i = 0; editspans && i < editspans.length; i++) {
      if (editspans[i].className.indexOf ("plainlinks") == -1) {
        span1 = editspans[i];
        break;
      }
    }
    if (!span1) {
      return;
    }
    var span0 = span1.cloneNode (true);
    var editwidth = span1.offsetWidth;
    if (mw.config.get("skin") == "monobook") {
      mw.util.addCSS ("h1.firstHeading span.editsection {float: " + side + ";}");
    }
    if (mw.config.get("skin") == "modern") {
      mw.util.addCSS ("h1#firstHeading span.editsection {float: " + side + ";}");
    }
    if (mw.config.get("skin") == "vector") {
      mw.util.addCSS ("h1.firstHeading span.editsection {font-size: 50%;}");
    } else {
      editwidth += 10;
    }
    var topicons = getElementsByClassName (our_content, "div", "topicon");
    for (var el = 0; topicons && el < topicons.length; el++) {
      if (dir.toLowerCase() == "rtl" ) {
        topicons[el].style.marginLeft = editwidth + "px";
      } else {
        topicons[el].style.marginRight = editwidth + "px";
      }
    }
    var mwfrtag = document.getElementById ("mw-fr-revisiontag");
    if (mwfrtag) {
      if (dir.toLowerCase() == "rtl" ) {
        mwfrtag.style.marginLeft = editwidth + "px";
      } else {
        mwfrtag.style.marginRight = editwidth + "px";
      }
    }

    our_content = document.getElementById ("mw_header") || document.getElementById ("content") || document.body;
    var parent = our_content.getElementsByTagName ("H1")[0];
    parent.insertBefore (span0, parent.firstChild);
    var a = span0.getElementsByTagName ("A")[0];
    if (a.href.indexOf ("&section=T") == -1) {
      a.title = a.title.replace (/(: |：).*$/, "$1" + "0");
      a.setAttribute ("href", a.getAttribute ("href", 2).replace (/&section=\d+/, "&section=0"));
    }
    else { //transcluded
      a.title = localtitles[mw.config.get( 'wgUserLanguage' )] || localtitles.en;
      a.setAttribute ("href", mw.util.wikiGetlink( mw.config.get( 'wgPageName' ) ) + "?action=edit&section=0");
    }
  });
}
 
/* 제목 옆 [편집] 버튼 */
/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 *
 * Moves edit links next to section headers, see [[User:Drilnoth/lefteditlinks.js/doc]]
*/

// user customizable variables via monobook.js:

// font-size css definition for edit link span
if (typeof(leftEditLinkFontSize) == 'undefined') { var leftEditLinkFontSize = 'small'; }

// css definition for spacing after heading text span
if (typeof(leftEditLinkSpacing) == 'undefined') { var leftEditLinkSpacing = '0.2em'; }


// main program
var LeftEditLinkMain = function() {

// recursively fix all spans inside headings
    var content = document.getElementById('content');
    var LeftEditLink = function(level) {
 
// get all heading of this level
        var headings = content.getElementsByTagName('h' + level);
        for (var i = 0; i < headings.length; i ++) {
            var heading = headings[i];
 
// get edit span
            var editSpan = heading.firstChild;
            if (editSpan == null) { continue }
            if (editSpan.className != 'editsection') { continue }
 
// get blank
            var blank = editSpan.nextSibling;
            if (blank == null) { continue }
            if (blank.nodeValue != ' ') { continue }
 
// get heading span
            var headingSpan = blank.nextSibling;
            if (headingSpan == null) { continue }
            if (headingSpan.nodeName != 'SPAN') { continue }
 
// move blank after heading text
            heading.appendChild(blank);
 
// move edit span after blank
            heading.appendChild(editSpan);
 
// get rid of evil edit span floating
            editSpan.style.styleFloat = 'none';
            editSpan.style.cssFloat = 'none';
 
// set edit span font size
            editSpan.style.fontSize = leftEditLinkFontSize;
 
// set heading span right margin
            headingSpan.style.marginRight = leftEditLinkSpacing;
        }
 
// recurse through heading levels
        if (level < 6) {
            LeftEditLink(level + 1);
        }
        return;
    };
 
// call recursive function
    LeftEditLink(1);
 
};

addOnloadHook(LeftEditLinkMain);