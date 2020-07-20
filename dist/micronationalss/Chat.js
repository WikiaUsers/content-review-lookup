// @todo move inline styling to classes and define in [[MediaWiki:Wikia.css]] (which is imported to chat)
 
//Import message-control system, used for chat pings and such.
if (typeof onNewMessage == 'undefined') {
	var onNewMessage = [];
}
if (typeof onStatusMessage == 'undefined') {
	onStatusMessage = [];
}
importScript('MediaWiki:Chat.js/newmessage.js');
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Micronationals Hub.<br /><a href="/wiki/Micronationals:Chat/Help" target="_blank" title="NFT Latest" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/Micronationalss:Chat/Help" target="_blank" title="Micronationalss:Chat/Help" style="position:relative;text-decoration:underline;">Information</a> • <a href="/wiki/Micronationalss:Chat/Logs" target="_blank" title="Micronationalss:Chat/Logs" style="position:relative;text-decoration:underline;">Logs</a> • <a href="/wiki/Micronationalss:Chat/Help/QuickChat" target="_blank" title="Micronationalss:Chat/Help/QuickChat" style="position:relative;text-decoration:underline;">Quick Chat</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
window.aliases = {};
 
/*Script that changes Google Image Search urls to the short url, and notifies the user that they should click for the full image url next time instead.*/
createAlias('imgres','13,32', function(val,e) {
	var dis = e.target;
	var re = /(https?:\/\/)?(www\.)?google\.(co\.)?\w{2,3}\/imgres\?([^&]*&)*imgurl=([^&\s]+)[^ ]*/i;
	if (!val.match(re)) return false;
	document.getElementsByClassName('Chat')[0].getElementsByTagName('ul')[0].innerHTML += '<li class="inline-alert">'+'<span style="color:red;">It looks like you tried to share a link via Google Images. Please click "View image" on the Google Images page to view the full image before sharing it, in order to keep the link shorter.</span>'+'</li>';
	document.getElementsByClassName('Chat')[0].scrollTop=document.getElementsByClassName('Chat')[0].scrollHeight
	dis.value = dis.value.replace(re,'$5');
}, true);
 
/* Prevent whitespace messages */
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 13 && /^[\]\[\s]+$/.test(this.value)) {
		e.preventDefault();
		this.value = ''; //prevent sending the message if contains only [ ] and/or whitespace.
	}
});
 
/* Correct obvious attempts at pasting urls */
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 13) {
		this.value = this.value.replace(/(\s|^)(([a-z0-9][a-z0-9-]*[a-z0-9]\.|[a-z0-9]\.)+[a-z]{2,4}\/[^\s]+|www\.([a-z0-9][a-z0-9-]+[a-z0-9]\.)[a-z]{2,4})/gi, '$1http://$2');
	}
});

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

//... import ...
chatags.tags['user'] = function(s,t) {        // S is the user string, T is the tag
    if (t.charAt(0) === '/') {                // We have been given the ending tag
        s = s.replace('[/user]', '</span>');
    } else {                                  // We have been given the opening tag
        s = s.replace('[user]', '<span style="color:purple">');
    }
    return s;                                 // Return the user string for further parsing
};