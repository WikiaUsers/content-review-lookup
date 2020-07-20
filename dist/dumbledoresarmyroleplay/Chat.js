//Automatic Emoticon Refresh w/o chat refresh
importScriptPage('AjaxEmoticons/code.js', 'dev');
/* importArticle({
    type: "script",
    article: "MediaWiki:ChatImport.js"
}); */

//Multiple PMS
if(wgCanonicalSpecialPageName == 'Chat') {
function createGroupPM() {
var users = prompt('Enter comma seperated list of users to start a PM with','');
var users = users.split(',');
mainRoom.openPrivateChat(users);
}
$('form#Write').append('<a class="wikia-button" href="javascript:createGroupPM()" style="position:absolute; right:55px; top:22px;">Multi-PM</a>');
}

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome. Our chat policy can be found <a href="/wiki/Project:Chat Policy" target="_blank" title="here"><u>here</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Chat Options */
importScriptPage('ChatOptions/code.js', 'dev');

/* Mute User */
// Original Code by Joeytje50. Fixed and formatted by Madnessfan34537.
 
$.getJSON('/index.php?action=ajax&rs=ChatAjax&method=getListOfBlockedPrivate', function(response) {
	$('head').append('<style type="text/css" id="ignoredUsers">li[data-user="'+response.blockedChatUsers.join('"], li[data-user="')+'"] {display:none;} #Rail li[data-user] {display:list-item !important;}</style>');
})
 
NodeChatController.prototype.blockAllowPrivateAjax = function (name, dir, callback) {
	$.ajax({
		type: 'POST',
		url: wgScript + '?action=ajax&rs=ChatAjax&method=blockOrBanChat',
		data: {
			userToBan : name,
			dir: dir
		},
		success: function(data, textStatus, jqXHR) {
			 if(typeof callback == 'function') {callback(data, textStatus, jqXHR);}
			$.getJSON('/index.php?action=ajax&rs=ChatAjax&method=getListOfBlockedPrivate', function(response) {
				$('#ignoredUsers').html('li[data-user="'+response.blockedChatUsers.join('"], li[data-user="')+'"] {display:none;} #Rail li[data-user] {display:list-item !important;}');
			})
		}
	});
}

var chatags = { images: true, videos: true };

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('MediaWiki:CustomModIcons.js', 'dev');