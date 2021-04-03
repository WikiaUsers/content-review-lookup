/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});


/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');


/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]] and [[User:Monchoman45|Monchoman45]]
 ********************************************************************/
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') ) {
		return;
	}
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
addOnloadHook( disableOldForumEdit );
}

/******************************/
/* changes the redirect image */
/******************************/
function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/__cb20100902033555/dragonage/images/b/b5/Redirectltr.png');
}
addOnloadHook(ChangeRedirectImage);

/*****************************************************/
/* Changes the full page title                       */
/* jQuery version and new wikia skin fixes by Grunny */
/*****************************************************/
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

addOnloadHook(rewriteTitle);

/*-----------------------------------------------------------/
/--Checks whether user is logged-in--------------------------/
/-----------------------Replaces user's name in {{USERNAME}}-/
/-------------------------Toggles text with {{ifregistered}}-/
/---------------Originally by [[wikia:User:Splarka|Splarka]]-/
/------------------------New version by [[User:Spang|Spang]]-/
/---------------------------------Expanded by JBed of FFWiki-/
/-----------------------------------------------------------*/
 function checkUserLogin() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
    $('span.userregistered').each(function() {
        $(this).css("display", "inline");
    });
    $('span.userunregistered').each(function() {
        $(this).css("display", "none");
    });
 }
 addOnloadHook(checkUserLogin);

/*****************************************************/
/* ReferencePopups                                   */
/*****************************************************/

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/** <pre>
 * YouTube video embedder
 * Injects an iframe, rather than uploading the video to Wikia's video library
 * See http://runescape.wikia.com/wiki/Template:Youtube for further documentation
 */
 
;(function ($, document) {
 
    'use strict';
 
    function injectVideo() {
        var tags = $('.youtube'),
            i,
            contents,
            iframe;
 
        if (tags.length === 0) {
            return;
        }
 
        for (i = 0; i < tags.length; i += 1) {
            contents = $(tags[i]).html().split('|');
 
            // for no arguments in template use
            if (contents[0] === 'ERROR') {
                return;
            }
 
            iframe = document.createElement('iframe');
            iframe.src = 'http://www.youtube.com/embed/' + contents[0];
            iframe.height = contents[1];
            iframe.width = contents[2];
 
            $(tags[i]).html(iframe);
            // reverse the display:none; set in the template
            $(tags[i]).show();
        }
 
        // hide the original link as there's already one in the player
        $('.original-link').hide();
    }
 
    $(function () {
        injectVideo();
    });
 
}(this.jQuery, this.document));
 
/* </pre> */

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF CODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////