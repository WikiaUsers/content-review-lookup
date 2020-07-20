/* <pre> */
/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&templates=expand&buster=2');

/*** start copied from [[wikipedia:MediaWiki:Common.js]] ***/
/** For sysops *****************************************
 *
 *  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
 */
if ( wgUserGroups ) {
  for ( var g = 0; g < wgUserGroups.length; ++g ) {
    if ( wgUserGroups[g] == "sysop" ) {
      importStylesheet("MediaWiki:Sysop.css");
      addOnloadHook( function() {
        if ( !window.disableSysopJS ) {
          importScript("MediaWiki:Sysop.js");
        }
      } );
    }
  }
}
/*** end copied from [[wikipedia:MediaWiki:Common.js]] ***/

if (skin!='monaco') {
  if (typeof ta == 'undefined') {
    var ta = [];
  }
  ta['ca-nstab-card_gallery'] = ['c','View the card gallery page'];
  ta['ca-nstab-card_rulings'] = ['c','View the card rulings page'];
  ta['ca-nstab-card_errata'] = ['c','View the card errata page'];
  ta['ca-nstab-card_tips'] = ['c','View the card tips page'];
  ta['ca-nstab-card_appearances'] = ['c','View the card appearances page'];
  ta['ca-nstab-card_trivia'] = ['c','View the card trivia page'];
}

// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title += ' (click to display)';
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}
// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

if(skin === "monaco") {
switch(wgCanonicalNamespace) {
case "Card_Gallery":
case "Card_Rulings":
case "Card_Errata":
case "Card_Tips":
case "Card_Appearances":
case "Card_Trivia":
case "Card_Names":
case "Card_Lores":
case "Card_Artworks":
  $(function() {
    $('<li class=""/>').append( $('<a id="ca-card" class="">Card</a>').attr({href: wgTitle.replace(/^(.*)$/, wgArticlePath)}) ).prependTo('#page_tabs');
    $('#ca-nstab-'+wgCanonicalNamespace.toLowerCase()).text(wgCanonicalNamespace.replace(/^Card_/, ''));
  });
  break;
}
$('#cardtablelinks a').clone().appendTo('<div id=cardlinks/>').parent().prependTo('.firstHeading:first');
}

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
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
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

/* Apply the above to the "leave message" button/tab too */

if(wgNamespaceNumber%2 == 1) {
 
function disableAddSectionLink() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if( !document.getElementById('archived-addsection-link') )
		return;
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		return;
	}
 
	if( !document.getElementById('ca-addsection') )
		return;
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-addsection');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-addsection').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
}
addOnloadHook( disableAddSectionLink );
}

var archiveListTemplate = 'ArchiveList'; //The name of the template that will be placed on top of the talk page, linking to the different archives
var archivePageTemplate = 'ArchivePage'; //The name of the template that will be placed on top of the archive page, explaining that it is an archive
importScriptPage('ArchiveTool/code.js', 'dev');

/** == Hiding == **/
importScriptPage('Project:JS/hide.js', 'keroro');


/** == Tabber == **/
importScriptPage('Project:JS/tabber.js', 'keroro');
/* </pre> */