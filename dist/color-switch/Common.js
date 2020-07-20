/* Any JavaScript here will be loaded for all users on every page load. */

/* Import Pages*/
importScriptPage('ShowHide/code.js', 'dev');

/* UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
        rollback: {u:'Rollback'},
        contentmoderator: {u:'Content Moderator'}
    }
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = {
    days: 3,
    edits: 10
};

highlight = {
    selectAll: false,
    rollback: '#F6DF0E',
    'content-moderator': '#FF0080',
    threadmoderator: '#FF0080',
    chatmoderator: '#FF0080',
    sysop: '#0000FF',
    bureaucrat: '#9400D3'
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=Kongregate" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

/* IRClogin div */
(function() {
    if ($('#IRClogin').length) {
        var nick;
        if (typeof wgUserName == 'undefined') {
            nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="https://kiwiirc.com/client/irc.freenode.net/?nick=' + nick + '&#color-switch-wikia" width="870" height="550" style="border:0;"></iframe>');
    }
})();

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}