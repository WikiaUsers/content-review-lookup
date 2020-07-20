
importScriptPage('User:Quarenon/quickpreview.js', 'runescape');
importScriptPage('AdvancedOasisUI/code.js', 'dev');
importScriptPage('User:Joeyaa/wham.js','vstf');
importScriptPage('FastDelete/code.js', 'dev');
importScriptPage( 'AjaxUndo/code.js', 'dev' );
importScriptPage('User:Real_Godisme/Fin.js', 'fairytail');
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});
 
//changes the contribute button to a recent changes button
$(function() { $('.WikiHeader div.buttons nav').replaceWith('<span class="wikia-menu-button secondary"><a data-id="recentchanges" href="/wiki/Special:RecentChanges" title="Recent Changes"><img height="16" width="22" class="sprite activity" src="'+ wgBlankImgUrl +'"> Recent Changes</a></span>'); });
 
/*gets rid of the autodelete summary
function removeDeleteSummary() {
if(wgAction == 'delete') {document.getElementById('wpReason').value = '';}
}
addOnloadHook(removeDeleteSummary); */
 
//suppress undo summary
function removeUndoSummary() {	 	
if(window.location.href.indexOf('&undo=') != -1) {document.getElementById('wpSummary').value = '';}	 	
}	
addOnloadHook(removeUndoSummary);
 
//gets rid of the admin dash drawer and makes things look better
if(document.getElementById('AdminDashboardDrawer')) {
 $('.AdminDashboardNavigation').prepend($('#WikiaSearch').css('float', 'right').detach());}
 
 
 
 
//adds recent Changes and Random page into the new editor
$(function addEditorButtons() {if ($('.checkboxes').length) {
  $('<div style="margin: 0; padding: 0" class="WikiHeader"><div class="buttons" style="float: right; position: relative; right: 0; bottom: 0"><a data-id="randompage" class="wikia-button secondary" accesskey="x" title="Random Page" href="/wiki/Special:Random"><img width="0" height="0" class="sprite random" src="' + wgBlankImgUrl + '"> Random Page</a><a data-id="wikiactivity" class="wikia-button secondary" accesskey="g" title="Recent Changes" href="/wiki/Special:RecentChanges"><img width="0" height="0" src="' + wgBlankImgUrl + '" class="sprite activity">Recent Changes</a></div></div>').insertBefore('.checkboxes');
}
});
//fast delete
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '[[w:Help:Spam|spam]]',
  'label': 'SP'};
fdButtons[fdButtons.length] = {
  'summary': '[[w:Help:Vandalism|vandalism]]',
  'label': 'VA'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'HK'};
fdButtons[fdButtons.length] = {
  'summary': 'Spam/Self-Answered Question',
  'label': 'Self'};
fdButtons[fdButtons.length] = {
  'summary': 'Not a Question/Nonsensical Question',
  'label': 'NotAQ'};
fdButtons[fdButtons.length] = {
  'summary': 'Not About Bleach',
  'label': 'NotB'};
fdButtons[fdButtons.length] = {
  'summary': 'Please see the main page. The anime has ended. It is not coming back',
  'label': 'Anime'};
 
 // remove admin link on toolbar
$().ready( function() {
 $('li > a[data-tracking="admindashboard/toolbar/admin"]').remove();
} );
 
//UrlQuery
function urlQuery(quer) {
	for(i in location.href.split('?')) {
		for(j in location.href.split('?')[i].split('&')) {
			if(location.href.split('?')[i].split('&')[j].split('=')[0] == quer) {
				return location.href.split('?')[i].split('&')[j].split('=')[1];
			}
		}
	}
	return '';
}
 
//adds a recent changes button next to the WikiActivity button on wikis without the new nav
function AddRecentChanges() {
	$('div.buttons').css({'width': '310px'});
	$('a[data-id="wikiactivity"]').after('<a href="/wiki/Special:RecentChanges" title="Special:RecentChanges" class="wikia-button secondary" data-id="recentchanges" style="margin-left:8px">Recent Changes</a>');
}
 
addOnloadHook(AddRecentChanges);
 
 
//Moncho's dumb chat hacks
    /* get all personal code files in chat */
    /* Important: you must click the chat button in the rail for this to work. */
    /* Very important: Chat is still a beta feature. Chat hacks may break as the feature is changed and updated, as it is a work in progress. */
 
    $(setTimeout('ChatCheck()', 200));
 
    function ChatCheck() {
            if($('.chat-join button').length != 0) {
                    $('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()"><img src="http://images.wikia.com/common/__cb36140/extensions/wikia/Chat/images/chat_icon.png" style="margin-right:3px;">Join the Chat</a>');
            } else {
                    setTimeout('ChatCheck()', 200);
            }
    }
 
    function OpenChatWindow() {
            window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
            window.chatwindow.onload = function () {
                    //addOnloadHook, importScript, and importStylesheet
                    window.chatwindow.$('body').prepend('<script>\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\n//This isn\'t the same as the regular addOnloadHook, because the regular one runs from a script tag in the body that I don\'t feel like appending. It\'s easier to just make it $(function), which is essentially equivalent\nfunction addOnloadHook(func) {$(func);}\n</script>');
                    //global.js
                    window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.js&action=raw&ctype=text/javascript');
                    //wikia.js
                    window.chatwindow.importScriptURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.js&action=raw&ctype=text/javascript');
                    //global.css
                    window.chatwindow.importStylesheetURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.css&action=raw&ctype=text/css');
                    //wikia.css
                    window.chatwindow.importStylesheetURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.css&action=raw&ctype=text/css');
 
                    //These are my chat hacks. If you don't want them, you can delete this line.
                    window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:Monchoman45/ChatHacks.js&action=raw&ctype=text/javascript');
            }
    }