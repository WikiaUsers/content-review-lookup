/* Contains some content derived from ChatHacks.js, by Monchoman45. */
/* Sound stuff */
window.Version['Sounds'] = "2016-06-02 - enable flashing title with no sound";

if (!chatOptions.options.chatVolume || (chatOptions.options.chatVolume == undefined)) chatOptions.options.chatVolume = 50;
window.hasFocus = true;
window.flashing = false;
window.flashtimer = 0;
window.titleorig = document.title;
window.silence = false;
window.sounds = new Array("8/86", "9/94", "9/95", "0/07", "0/0b", "6/6c", "b/bf", "5/50", "7/78", "9/99"); 
window.soundprefix = "https://images.wikia.nocookie.net/saintsrow/images/";
window.defaultsound = window.soundprefix+"6/64/Other_InMemory_00478_SR2_cellphone.ogg";

function toggleBeep() {
	window.silence = !window.silence;
	$(".toggleSilent").toggleClass("highlight");
}

//Function for adding messages to the window
NodeChatDiscussion.prototype.activityNotify = function (chat) {
	if(mainRoom.isInitialized && chat.attributes.name != wgUserName) {
		if(window.hasFocus) return;
		window.flashing = true;
		clearInterval(window.flashtimer);
		window.flashtimer = setInterval('flashTitle()', 500);

		if (window.silence || !chatOptions.options.sounds) return;
		randsound = Math.floor((Math.random()*9));
		sound = window.soundprefix+window.sounds[randsound]+'/Chatbeep_'+randsound+'.ogg';
		if(chat.attributes.text.toLowerCase().indexOf(wgUserName.toLowerCase()) != -1) sound = window.defaultsound;

		if (chatOptions.options.alertSound && (chatOptions.options.alertSound != undefined )) sound = chatOptions.options.alertSound;
		document.getElementById('chatalert').src = sound;
		document.getElementById('chatalert').play();
	}
}
mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.activityNotify, mainRoom.viewDiscussion));

function flashTitle() {
	if(!window.flashing) {
		$('title').html(window.titleorig);
		clearInterval(window.flashtimer);
		return;
	}
	$('title').html($('title').html() == window.titleorig?"!!! - "+window.titleorig:window.titleorig);
}

$(function () {
	//Add the sound space
	$('body').append('<span id="sound" style="display:none;"></span>');

	document.getElementById('sound').innerHTML = '<audio id="chatalert" src="'+window.defaultsound+'"></audio>';
	$('#chatalert').prop('volume', chatOptions.options.chatVolume/100);

	//bind focus and blur handlers to know whether to make noise
	$(window).bind('focus', function() { window.hasFocus = true; window.flashing = false; });
	$(window).bind('blur', function() { window.hasFocus = false; });

	if (!chatOptions.options.sounds) return;
	silencebutton = '<a class="wikia-button toggleSilent" title="This button silences all notifications" href="javascript:toggleBeep()" style="position:absolute; right:0; bottom:1px;width: 75px;">' + "Silence" + '</a>';
	$('#Write').append(silencebutton);
	$('head').append('<style type="text/css">\n.Write .message {\nmargin-right: 80px; \n}\n</style>');
});