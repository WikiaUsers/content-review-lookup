var chatags = typeof chatags !== 'undefined' ? chatags : {};
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : true;
chatags.media = typeof chatags.media !== 'undefined' ? chatags.media : true;
chatags.css = '.chat-image{max-width:480px;max-height:270px;}';
function showSpoiler(obj)
    {
    var inner = obj.parentNode.getElementsByTagName("span")[0];
    if (inner.style.display == "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
    };
chatags.tags = {
	'b':     function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/b]', '</span>');
				} else {
					s = s.replace('[b]', '<span style="font-weight:bold;">');
				}
				return s;
			},
	'bg':    function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/bg]', '</span>');
				 } else {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'big':   function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/big]', '</span>');
				 } else {
					 s = s.replace('[big]', '<span style="font-size:16pt;">');
				 }
				 return s;
			 },
	'c':     function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/c]', '</span>');
				 } else {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'code':  function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/code]', '</span>');
				 } else {
					 s = s.replace('[code]', '<span style="font-family:monospace;">');
				 }
				 return s;
			 },
	'font':  function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/font]', '</span>');
				 } else {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'center':    function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/center]', '</center>');
				} else {
					s = s.replace('[center]', '<center>');
				}
				return s;
			},
	'inline':    function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/inline]', '</li>');
				} else {
					s = s.replace('[inline]', '<li class="inline-alert">');
				}
				return s;
			},
	'i':     function (s,t) {
				 if (t.charAt(0) === '/') {
					 s = s.replace('[/i]', '</span>');
				 } else {
					 s = s.replace('[i]', '<span style="font-style:italic;">');
				 }
				 return s;
			 },
	'small': function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/small]', '</span>');
				} else {
					s = s.replace('[small]', '<span style="font-size:7pt;">');
				}
				return s;
			},
	's':    function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/s]', '</span>');
				} else {
					s = s.replace('[s]', '<span style="text-decoration:line-through;">');
				}
				return s;
			},
	'sub':  function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/sub]', '</sub>');
				} else {
					s = s.replace('[sub]', '<sub>');
				}
				return s;
			},
	'sup':  function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/sup]', '</sup>');
				} else {
					s = s.replace('[sup]', '<sup>');
				}
				return s;
			},
	'u':    function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/u]', '</span>');
				} else {
					s = s.replace('[u]', '<span style="text-decoration:underline;">');
				}
				return s;
			},
	'spoiler':    function (s,t) {
				if (t.charAt(0) === '/') {
					s = s.replace('[/spoiler]', '</div>');
				} else {
					s = s.replace('[spoiler]', '<span class="spoiler"><input type="button" onclick="showSpoiler(this);" value="Spoiler" /><span class="inner" style="display:none;"> ');
				}
				return s;
			},
	'img':   function (s,t) {
				 if (chatags.images !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[img="' + t[1] + '"]', '<img class="chat-image" src="http://' + mw.html.escape(t[1]) + '" />');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'audio':   function (s,t) {
				 if (chatags.media !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[audio="' + t[1] + '"]', '<audio class="chat-audio" controls><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'audio-a':   function (s,t) {
				 if (chatags.media !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[audio-a="' + t[1] + '"]', '<audio class="chat-audio-a" autoplay><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'audio-al':   function (s,t) {
				 if (chatags.media !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[audio-al="' + t[1] + '"]', '<audio class="chat-audio-al" autoplay loop><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'video':   function (s,t) {
				 if (chatags.media !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[video="' + t[1] + '"]', '<video class="chat-video" width="480" height="270" controls><source src="http://' + mw.html.escape(t[1]) + '"></video>');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 },
	'yt':   function (s,t) {
				 if (chatags.media !== true) return s;
				 if (t.charAt(0) !== '/') {
					 try {
						 t = t.split('="');
						 t[1] = t[1].replace('"', '');
						 s = s.replace('[yt="' + t[1] + '"]', '<iframe class="chat-ytvideo" width="480" height="270" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
					 } catch(e) { console.log(e) }
				 }
				 return s;
			 }
};
chatags.parser = function (s) {
	var t = s.match(/\[([^\[\];]*)\]/g);
	var tg = '';
	if (!t) return s;
	for (var i = 0; i < t.length; i++) {
		tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
		try {
			tg = tg.split('="')[0];
		} catch(e) { console.log(e) }
 
		if (typeof chatags.tags[tg] !== 'undefined') {
			s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
		}
	}
	return s;
};
chatags.init = function() {
	if (typeof window.mainRoom !== 'undefined') {
		$('head').append('<style>' + chatags.css + '</style>');
		window.mainRoom.model.chats.bind("afteradd", function(c) {
			if (typeof window.mainRoom.roomId === "undefined")
				return;
			var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
 
			string = chatags.parser(string);
			$("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);
			});
		window.mainRoom.model.privateUsers.bind('add', function(u) {
			var privateRoomId = u.attributes.roomId;
			var privateRoom = mainRoom.chats.privates[privateRoomId];
			privateRoom.model.chats.bind('afteradd', function(chat) {
				if (chat.attributes.isInlineAlert) return;
				var string = $("#Chat_" + privateRoomId + " .message:last").html();
					string = chatags.parser(string);
				$("#Chat_" + privateRoomId + " .message:last").html(string);
			});
		});
	}
};
$(document).ready(function() {
	chatags.init();
});