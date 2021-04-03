(function(mw, $) {
	var MAX_PLAYER_WIDTH = 2000, MIN_PLAYER_WIDTH = 240;
	var MAX_PLAYER_HEIGHT = 1200, MIN_PLAYER_HEIGHT = 80;
	var AUTOINSERT_ROOT_ID = "mw-content-text", AUTOINSERT_AFTER_NODE = "H2", AUTOINSERT_SIZE = "800x450";
	var _CB_VERSION = 3;

	function getVideoLinkTarget(link) {
		var dataset = link.dataset, box,
			pid = dataset ? dataset.player : link.getAttribute("data-player"),
			vid = dataset ? dataset.playlist : link.getAttribute("data-playlist"),
			vidx = dataset? dataset.videoindex : link.getAttribute("data-videoindex"),
			start = dataset ? dataset.starttime : link.getAttribute("data-starttime");
		if (!(pid && vid && start && vidx) || !pid.match(/^[a-z0-9_-]+$/)) return false;
		vid = vid.match(/[a-z0-9_-]{11}/gi);
		start = parseFloat(start);
		vidx = Math.max(0, Math.min(vid.length-1, parseInt(vidx)));
		box = document.getElementById('vplayerbox-' + pid);
		if (!vid || isNaN(start)) return false;
		if (!box) {
			var h = link, root = document.getElementById(AUTOINSERT_ROOT_ID);
			while (h && h !== root && h.nodeName != AUTOINSERT_AFTER_NODE) {
				h = h.previousElementSibling || h.parentElement;
			}
			if (!h) return false;
			if (h == root) h = root.firstChild;
			box = document.createElement('div');
			box.id = 'vplayerbox-' + pid;
			box.setAttribute("data-size", AUTOINSERT_SIZE);
			h.parentNode.insertBefore(box, h.nextSibling);
		}
		return {videos: vid, videoIndex: vidx, playerId: pid, startTime: start, box: box, player: document.getElementById('vplayer-' + pid)};
	}
	function replacePlaceholder(parent, player, w, h, videoId, startTime) {
		var nf = document.createElement('iframe');
		nf.height = h;
		nf.width = w;
		nf.id = 'vplayer-' + player;
		nf.setAttribute('allowFullScreen', '');
		nf.setAttribute('style', 'padding: 0; border: 0');
		parent.innerHTML = '';
		parent.style.display = parent.style.display == 'none' ? null : parent.style.display;
		parent.appendChild(nf);
		var nw = nf.contentWindow;
		var nd = nf.contentDocument || nw.document || nw;
		nd.body.setAttribute('style', 'padding: 0; margin: 0');
		var sc = nd.createElement('script');
		sc.src = "https://www.youtube.com/iframe_api";
		nd.body.appendChild(sc);
		var pe = nd.createElement('div');
		pe.id = 'player';
		nd.body.appendChild(pe);
		nw.onYouTubeIframeAPIReady = function(event) {
			var p = new nw.YT.Player('player', {
				height: '100%',
				width: '100%',
				videoId: videoId,
				playerVars: {
					autoplay: '1',
					start: startTime,
					iv_load_policy: '3',
					rel: '0',
				},
			});
			parent.playerObject = nf.playerObject = p;
		};
		return nf;
	}
	function scrollTo(player) {
		var pTop = $(player).offset().top, pHeight = $(player).height(), wTop = $(window).scrollTop(), wHeight = $(window).height();
		if (pTop < wTop) {
			$("body").animate({scrollTop: pTop - 5});
		} else if ((pTop + pHeight) > (wTop + wHeight)) {
			$("body").animate({scrollTop: pTop + pHeight - wHeight + 5});
		}
	}
	function onVideoLinkClick() {
		var conf = getVideoLinkTarget(this);
		var po = conf && conf.player && conf.player.playerObject;
		if (conf && conf.player == null) {
			var iid, size = (conf.box.dataset ? conf.box.dataset.size : conf.box.getAttribute("data-size")).split('x'),
				w = Math.max(MIN_PLAYER_WIDTH, Math.min(MAX_PLAYER_WIDTH, size[0])),
				h = Math.max(MIN_PLAYER_HEIGHT, Math.min(MAX_PLAYER_HEIGHT, size[1])),
				player = replacePlaceholder(conf.box, conf.playerId, w, h, conf.videos[conf.videoIndex], conf.startTime);
		
			if (player != null) {
				conf.player = player;
				scrollTo(player);
				if (conf.videos.length > 1) {
					iid = window.setInterval(function() {
						var po = player.playerObject;
						if (po && po.loadPlaylist) {
							po.loadPlaylist(conf.videos, conf.videoIndex, conf.startTime, 'default');
							po.playVideo();
							window.clearInterval(iid);
						}
					}, 250);
				}
				return false;
			}
		} else if (conf && po.loadPlaylist) {
			po.loadPlaylist(conf.videos, conf.videoIndex, conf.startTime, po.getPlaybackQuality());
			po.playVideo();
			scrollTo(conf.player);
			return false;
		}
		return true;
	}
	if (mw.loader.getState('ext.videolink') !== null) {
		mw.loader.using('ext.videolink', function() {
			$("body").off("click", ".vplink");
			(mw.util.$content || $("body")).off("click", ".vplink");
			(mw.util.$content || $("body")).on("click", ".vplink", onVideoLinkClick);
		});
	}
	(mw.util.$content || $("body")).on("click", ".vplink", onVideoLinkClick);
}(mediaWiki, jQuery));