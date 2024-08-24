/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('ShowHide/code.js', 'dev');

$(document).ready(function STemplateUI() {
  $(".ogg_player .image").remove();
});

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges"];
importScriptPage('AjaxRC/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
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
		$('#WikiaPageHeader .wikia-menu-button a:first').html('Archived').removeAttr('href');
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

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/5/57/CIT_Button.png",
     "speedTip": "Canon-In-Training",
     "tagOpen": "{{CIT|",
     "tagClose": "}}",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/2f/TS_Button.png",
     "speedTip": "Timestamp",
     "tagOpen": "{{TS|",
     "tagClose": "|DateAndTime|Timezone}}",
     "sampleText": "Place"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/c/ce/Ep_ref_Button.png",
     "speedTip": "Episode/issue reference tag",
     "tagOpen": "<ref name=>{{ep ref|",
     "tagClose": "}}</ref>",
     "sampleText": "number"};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/2/24/AG_Button.png",
     "speedTip": "Ask Greg reference",
     "tagOpen": "<ref name=qid>[[Greg Weisman|Weisman, Gr\eg]] (2013-MONTH-DAY). [http://www.s8.or\g/gar\goyles/askgr\eg/sear\ch.php?qid=",
     "tagClose": " Question #]. ''Ask Gr\eg''. Retr\ieved 2013-MONTH-DAY.</ref>",
     "sampleText": "QID"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insert character template",
     "tagOpen": "\{\{Character\r| name        = ",
     "tagClose": "\r| image       = \r| real name   = \r| alias       = \r| age (2010)  = \r| age (2016)  = \r| species     = \r| designation = \r| gender      = \r| hair color  = \r| eye color   = \r| relatives   = \r| mentor      = \r| affiliation = \r| powers      = \r| weaknesses  = \r| equipment   = \r| first       = \r| voice       = \r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/d/de/Film_Button.png",
     "speedTip": "Insert episode template",
     "tagOpen": "\{\{Episode\r| episode  = ",
     "tagClose": "\r| image    = \r| airdate  = \r| director = \r| writer   = \r| prev     = \r| next     = \r\}\}",
     "sampleText": ""};
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/5/5d/Team_Button.png",
     "speedTip": "Insert organization template",
     "tagOpen": "\{\{Organization\r| name       = ",
     "tagClose": "\r| image      = \r| location   = \r| leader     = \r| goal       = \r| members    = \r| attributes = \r| first      = \r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/d/dc/Image_Button.png",
     "speedTip": "Insert filebox template",
     "tagOpen": "\{\{Filebox\r| description = ",
     "tagClose": "\r| season      = \r| episode     = \r| source      = \r| origin      = \r| license     = screenshot\r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/1/1d/Copyrights_needed_Button.png",
     "speedTip": "Uncredited image tag",
     "tagOpen": "\{\{subst:Unknown/ukn|",
     "tagClose": "}}",
     "sampleText": "both"};
 
}

/* Countdown clock
 * See w:c:dev:Countdown for info and attribution
 * Modifications by  Lunarity
 */
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if (diff<=0) {
    timers[i].firstChild.nodeValue = 'It\'\s out now!';
  return;
  }

  // calculate the diff
var tmp, flag;
  left = '';

  // days
  tmp = Math.floor(diff/60/60/24);
  if (tmp || flag) {
      left += tmp + 'd, ';
      flag = true;
  }
 
  // hours
  tmp = Math.floor(diff/60/60) % 24;
  if (tmp || flag) {
     left += (tmp) + 'h ';
     flag = true;
  }
 
  // minutes
  tmp = Math.floor(diff/60) % 60;
  if (tmp || flag) {
      left += tmp + 'm ';
      flag = true;
  }
  
  // seconds
  left += (diff%60) + 's';

  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************


/* Automatically fills the summary field in upload form with filebox
 * by: [[User:Xiao Qiao]]
 */
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}

/* Add "IRC" link to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]] and [[User:Thailog]]
 */

$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Young_Justice_Wiki:IRC_access">Chatroom</a></li>');
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Thread:56878">"Ask Us"</a></li>');
    }
});

/**
 * LockOldBlogs
 * See w:c:dev:LockOldBlogs/code.js for info and attribution
 */
window.LockOldBlogs = {
    expiryCategories: ['Blog posts', 'Site news']
};
 
importArticle({
    type: 'script',
    article: 'w:c:dev:LockOldBlogs/code.js'
});

/* Disable comments for specified pages at discretion without disabling feature
 * by: [[User:Pecoes]]
 */
$(function () {
    if (window.ArticleComments && $.inArray("Locked blogs", mw.config.get('wgCategories')) > -1) {
        ArticleComments.interceptedAddHover = ArticleComments.addHover;
        ArticleComments.addHover = function () {
            $('a.wikia-button.comments.secondary').html('Comments locked');
            $('#article-comm').attr('disabled','disabled').text('Comments on this blog have been disabled.');
            $('#article-comm-submit').attr('disabled', 'disabled');
            $('.article-comm-reply').remove();
            ArticleComments.interceptedAddHover();
        };
    }
});

/* Add a tag for "rollback" to user profile header when rollback user category present
 */

$(function() {
	var p = wgPageName.substring("5","9999").replace(/_/g, " ");
	if ($(".masthead-info hgroup").length > 0) {
		if (p == "Anythingspossibleforapossible" || p == "Godblaster" || p == "LLight" || p == "NightwingOfTheFuture" || p == "Psypher") $(".masthead-info hgroup").append('<span class="tag">rollback</span>');
	}
	var p = wgPageName.substring("13","9999").replace(/_/g, " ");
	if ($(".masthead-info hgroup").length > 0) {
		if (p == "Anythingspossibleforapossible" || p == "Godblaster" || p == "LLight" || p == "NightwingOfTheFuture" || p == "Psypher") $(".masthead-info hgroup").append('<span class="tag">rollback</span>');
	}
	//Blog listing page
	var p = wgPageName.substring("10","9999").replace(/_/g, " ");
	if ($(".masthead-info hgroup").length > 0) {
		if (p == "Anythingspossibleforapossible" || p == "Godblaster" || p == "LLight" || p == "NightwingOfTheFuture" || p == "Psypher") $(".masthead-info hgroup").append('<span class="tag">rollback</span>');
	}
	var p = wgPageName.substring("22","9999").replace(/_/g, " ");
	if ($(".masthead-info hgroup").length > 0) {
		if (p == "Anythingspossibleforapossible" || p == "Godblaster" || p == "LLight" || p == "NightwingOfTheFuture" || p == "Psypher") $(".masthead-info hgroup").append('<span class="tag">rollback</span>');
	}
});

/* Reference Popups
 */
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});