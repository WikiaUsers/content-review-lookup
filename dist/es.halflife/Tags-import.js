var chatags = typeof chatags !== 'undefined' ? chatags : {};
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : true;
chatags.media = typeof chatags.media !== 'undefined' ? chatags.media : true;
function showSpoiler(obj) {
	var inner = obj.parentNode.getElementsByTagName("span")[0];
	if (inner.style.display == "none") inner.style.display = "";
	else inner.style.display = "none";
}
chatags.tags = {
	'b': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/b]', '</span>');
		} else {
			s = s.replace('[b]', '<span style="font-weight:bold;">');
		}
		return s;
	},
	'bg': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/bg]', '</span>');
		} else {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'big': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/big]', '</span>');
		} else {
			s = s.replace('[big]', '<span style="font-size:16pt;">');
		}
		return s;
	},
	'c': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/c]', '</span>');
		} else {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'code': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/code]', '</span>');
		} else {
			s = s.replace('[code]', '<span style="font-family:monospace;">');
		}
		return s;
	},
	'font': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/font]', '</span>');
		} else {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'center': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/center]', '</div>');
		} else {
			s = s.replace('[center]', '<div style="text-align:center">');
		}
		return s;
	},
	'i': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/i]', '</span>');
		} else {
			s = s.replace('[i]', '<span style="font-style:italic;">');
		}
		return s;
	},
	'small': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/small]', '</span>');
		} else {
			s = s.replace('[small]', '<span style="font-size:7pt;">');
		}
		return s;
	},
	's': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/s]', '</span>');
		} else {
			s = s.replace('[s]', '<span style="text-decoration:line-through;">');
		}
		return s;
	},
	'sub': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/sub]', '</sub>');
		} else {
			s = s.replace('[sub]', '<sub>');
		}
		return s;
	},
	'sup': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/sup]', '</sup>');
		} else {
			s = s.replace('[sup]', '<sup>');
		}
		return s;
	},
	'u': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/u]', '</span>');
		} else {
			s = s.replace('[u]', '<span style="text-decoration:underline;">');
		}
		return s;
	},
	'spoiler': function (s, t) {
		if (t.charAt(0) === '/') {
			s = s.replace('[/spoiler]', '</span>');
		} else {
			s = s.replace('[spoiler]', '<span class="spoiler"><input type="button" onclick="showSpoiler(this);" value="Spoiler" /><span class="inner" style="display:none;"> ');
		}
		return s;
	},
	'img': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[img="' + t[1] + '"]', '<img class="chat-image" src="http://' + mw.html.escape(t[1]) + '" />');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'audio': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[audio="' + t[1] + '"]', '<audio class="chat-audio" controls preload="auto"><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'audio-a': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[audio-a="' + t[1] + '"]', '<audio preload="auto" autoplay><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'audio-ca': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[audio-ca="' + t[1] + '"]', '<audio class="chat-audio" controls preload="auto" autoplay><source src="http://' + mw.html.escape(t[1]) + '"></audio>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'vocaroo': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[vocaroo="' + t[1] + '"]', '<audio class="chat-audio" controls preload="auto"><source src="http://vocaroo.com/media_command.php?media=' + mw.html.escape(t[1]) + '&command=download_ogg" type="audio/ogg"><source src="http://vocaroo.com/media_command.php?media=' + mw.html.escape(t[1]) + '&command=download_mp3" type="audio/mpeg"></audio>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'soundcloud': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[soundcloud="' + t[1] + '"]', '<iframe class="chat-soundcloud" height="166" src="//w.soundcloud.com/player/?url=/' + mw.html.escape(t[1]) + '&show_artwork=false" frameborder="0"></iframe>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'soundcloud-playlist': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[soundcloud-playlist="' + t[1] + '"]', '<iframe class="chat-soundcloud-pl" height="465" src="//w.soundcloud.com/player/?url=/' + mw.html.escape(t[1]) + '&show_artwork=false" frameborder="0"></iframe>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'youtube-audio': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[youtube-audio="' + t[1] + '"]', '<audio class="chat-audio" controls preload="auto"><source src="https://elnobdetfm.cf/yt/getvideo.mp4?videoid=' + mw.html.escape(t[1]) + '&format=audio" type="audio/mpeg"></audio>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'video': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[video="' + t[1] + '"]', '<video class="chat-video" controls preload="auto"><source src="http://' + mw.html.escape(t[1]) + '"></video>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'youtube': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[youtube="' + t[1] + '"]', '<video class="chat-video" controls preload="metadata" poster="https://img.youtube.com/vi/' + mw.html.escape(t[1]) + '/hqdefault.jpg"><source src="https://elnobdetfm.cf/yt/getvideo.mp4?videoid=' + mw.html.escape(t[1]) + '"></video><br /><a class="ignore_yt_parser" href="https://www.youtube.com/watch?v=' + mw.html.escape(t[1]) + '" target="_blank">[Ver en YouTube]</a><br />');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
	'youtube-2': function (s, t) {
		if (chatags.media !== true) return s;
		if (t.charAt(0) !== '/') {
			try {
				t = t.split('="');
				t[1] = t[1].replace('"', '');
				s = s.replace('[youtube-2="' + t[1] + '"]', '<iframe class="chat-ytvideo" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
			} catch (e) {
				console.log(e);
			}
		}
		return s;
	},
};
chatags.parser = function (s) {
	var t = s.match(/\[([^\[\];]*)\]/g);
	var tg = '';
	if (!t) return s;
	for (var i = 0; i < t.length; i++) {
		tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
		try {
			tg = tg.split('="')[0];
		} catch (e) {
			console.log(e);
		}
		if (typeof chatags.tags[tg] !== 'undefined') {
			s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
		}
	}
	return s;
};
chatags.init = function () {
	if (typeof window.mainRoom !== 'undefined') {
		window.mainRoom.model.chats.bind("afteradd", function (c) {
			if (typeof window.mainRoom.roomId === "undefined") return;
			var string = $('#entry-' + c.cid).html();
			string = chatags.parser(string);
			if (!string) return;
			$('#entry-' + c.cid).html(string);
		});
        window.mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];
            privateRoom.model.chats.bind('afteradd', function(c) {
                if (c.attributes.isInlineAlert) return;
                var string = $('#entry-' + c.cid).html();
                if (!string) return;
                string = chatags.parser(string);
                $('#entry-' + c.cid).html(string);
            });
        });
	}
};
$(document).ready(function () {
	chatags.init();
});