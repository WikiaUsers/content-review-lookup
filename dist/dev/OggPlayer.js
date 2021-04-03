(function(window, $, mw) {
	'use strict';
	//Load Protection
	if (window.OggPlayerLoaded) return;
	window.OggPlayerLoaded = true;
	//Load Localization
	importArticle({type: 'script',article: 'u:dev:MediaWiki:I18n-js/code.js'});
	//Load Style
	importArticle({type: 'style',article: 'u:dev:MediaWiki:OggPlayer.css'})

	//Default Setting
	if(typeof window.oggPlayerButtonOnly == 'undefined') window.oggPlayerButtonOnly = false;

	function init(i18n) {
		var OggPlayer = {
			support: '',
			allButtons: $([]),
			monit: function($elem) {
				if(!window.oggPlayerButtonOnly) $elem.find('.audio-button .ogg_player,.mediaContainer').each(OggPlayer.prepPlayer);
				$elem.find('.audio-button').each(OggPlayer.prepButton);
			},
			init: function() {
				//Test Audio Support
				OggPlayer.support = document.createElement('audio').canPlayType('audio/ogg');
				OggPlayer.monit($(document));
				mw.hook('wikipage.content').add(OggPlayer.monit);
			},
			prepPlayer: function() {
				var player = $(this);
				if(player.data('url')) return;
				var button = player.find('button[onclick]');
				if(button.length) {
					var onclick = button[0].onclick.toString();
 
					var match, url, width, height, isVideo;
					if(match = onclick.match(/"videoUrl":"((?:\\.|[^"\\])+)"/)) url = match[1].replace('\\x26', '&');
					if(match = onclick.match(/"width":([0-9]+)/)) width = match[1];
					if(match = onclick.match(/"height":([0-9]+)/)) height = match[1];
					if(match = onclick.match(/"isVideo":(true|false)/)) isVideo = match[1] == 'true';
 
					if(isVideo) {
						OggPlayer.video(player, url, width, height);
					} else {
						OggPlayer.audio(player, url, width);
					}
				} else {
					var p = player.find('audio[src], video[src], source[src]');
					player.closest(".audio-button")
						.data('src', p.attr('src'))
						.empty()//We know this is an audio-button class, so empty contents
						.append(p);
				}
				player.removeClass(['ogg_player','mediaContainer']).addClass('ogg-player').removeAttr('id');
			},
			prepButton: function() {
				var button = $(this);
				if(button.prop('tagName') == 'A' || button.hasClass('no-audio')) return;
				var src = button.data('src'),
					sources = button.find('audio, video, button[onclick], img, a.internal');
				if(OggPlayer.support === '') {
					button.attr('title', i18n.msg('no-support').plain()).addClass('no-audio').empty();
					return;
				}
 
				if(typeof src == 'undefined' || !OggPlayer.isValid(src)) {
					sources.each(function(i, v) {
						v = $(v);
						if(v.prop('tagName') == 'A') {
							src = v.attr('href');
						} else if(v.prop('tagName') == 'BUTTON') {
							var match, onclick = v[0].onclick.toString();
							if(match = onclick.match(/"videoUrl":"((?:\\.|[^"\\])+)"/)) src = match[1];
						} else {
							src = v.attr('src');
						}
						if(OggPlayer.isValid(src)) return false;
						src = false;
					});
					if(!src) {
						button.addClass('no-audio').empty().attr('title', i18n.msg('no-audio').plain());
						return;
					}
				}
				var link = $('<a />', {
					'class': button.attr('class'),
					'style': button.attr('style'),
					'data-src': button.data('src'),
					'title': i18n.msg('play').plain(),
					'href': src,
					'click':function(e) {
						e.preventDefault();
						var audio = $(this).find('audio');
						if(audio.prop('paused')) {
							OggPlayer.stopAllButtons();
							audio.trigger('play');
						} else {
							audio.trigger('pause');
						}
						return false;
					}
				});
				button.replaceWith(link);
 
				if(link.hasClass('click-parent')) {
					if(!link.parent().hasClass('audio-button-parent')) {
						link.parent().addClass('audio-button-parent').click(function(e) {
							$(this).find('.click-parent').click();
						});
					} else {
						link.removeClass('click-parent');
					}
				}
 
				var audio = $('<audio />', {
					src: src,
					preload: 'none',
				}).appendTo(link).on('play', function(e) {
					$(this).parent().addClass('now-playing');
				}).on('pause', function(e) {
					$(this).parent().removeClass('now-playing');
					this.currentTime = 0;
				}).on('ended', function(e) {
					$(this).trigger('pause');
				}).on('error', function(e) {
					$(this).parent().addClass('no-audio').removeClass('now-playing').empty().attr('title', 'err' + i18n.msg('no-audio').plain());
				});
				OggPlayer.allButtons = OggPlayer.allButtons.add(audio);
			},
			stopAllButtons: function() {
				OggPlayer.allButtons.trigger('pause');
			},
			isValid: function(url) {
				if(url === undefined) return false;
				url = url.replace(/\?.*$/, '');
				if(url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 && url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) return false; // Wikia and Wikimedia only
				url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
				if(url.search(/\.(ogg|oga|ogv)$/) < 0) return false;
				return true;
			},
			video: function(player, url, width, height) {
				if(!url) return;
				var a = player.find('a.image');
				player.addClass('ogg-video-player')
					.data('url', url)
					.empty()
					.append(
						$('<video />', {
							controls : 'controls',
							width: width,
							height: height,
							src: url,
							preload: 'metadata'
						})
						.click(function(){
							this.paused ? this.play() : this.pause();
						})
						.dblclick(function(){
							if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
								if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
									if(document.exitFullscreen) {
										document.exitFullscreen();
									} else if(document.webkitExitFullscreen) {
										document.webkitExitFullscreen();
									} else if(document.mozCancelFullScreen) {
										document.mozCancelFullScreen();
									} else if(document.msExitFullscreen) {
										document.msExitFullscreen();
									}
								} else {
									if(this.requestFullscreen) {
										this.requestFullscreen();
									} else if(this.webkitRequestFullscreen) {
										this.webkitRequestFullscreen();
									} else if(this.mozRequestFullScreen) {
										this.mozRequestFullScreen();
									} else if(this.msRequestFullscreen) {
										this.msRequestFullscreen();
									}
								}
							}
						})
					)
					.append($('<a></a>').addClass('info-icon').attr({
						href: a.attr('href'),
						title: a.attr('title')
					}));
			},
			audio: function(player, url, width) {
				if(!url) return;
				var a = player.find('a.image');
				player.addClass('ogg-audio-player')
					.data('url', url)
					.empty()
					.append($('<audio>', {
						controls : 'controls',
						src: url,
						preload: 'metadata'
					}).css('width', width))
					.append($('<a>').addClass('info-icon').attr({
						href: a.attr('href'),
						title: a.attr('title')
					}));
			}
		};
		//If not fandom legacy
		if (mw.config.get('wgVersion') !== '1.19.24')
			OggPlayer = {
				constRef:{
					wrapper:"audio-button",
					noSupport:"no-support",
					noAudio:"no-audio",
					nowPlaying:"now-playing",
					OggAudio:"OggPlayer-Audio",
					play:"play"
				},
				init: function() {
					//Test Audio Support
					var support = document.createElement('audio').canPlayType('audio/ogg');
					if (support === "") return OggPlayer.noSupport();
					mw.hook('wikipage.content').add(OggPlayer.monitor);
				},
				noSupport: function() {
					$('.audio-button:not(.ready)').attr('title',i18n.msg(OggPlayer.constRef.noSupport).plain()).addClass(OggPlayer.constRef.noAudio);
				},
				monitor: function($elem) {
					$elem.find('.audio-button').each(OggPlayer.eachInstance);
				},
				eachInstance: function() {
					var instance = $(this);
					//Normalize embed data to instance
					if (instance.children().length) {
						var focus = instance.find("a[href][class=internal],audio[src],video[src],source[src]");
						instance.data("src",focus.attr("href")||focus.attr("src"));
					}
					//Create Button from instance src
					OggPlayer.createButton(instance);
				},
				createButton: function(target) {
					if (!OggPlayer.isValid(target.data('src')))
						return OggPlayer.errorPlayer(target);
					var audioObj = $('<audio>',{
						src:target.data('src'),
						preload:'none',
						class:OggPlayer.constRef.OggAudio,
						on:{
							playing:function(){
								$(this).parent().addClass(OggPlayer.constRef.nowPlaying);
							},
							pause:OggPlayer.stopThis,
							ended:OggPlayer.stopThis,
							error: function(){
								OggPlayer.errorPlayer($(this).parent());
							}
						}
					});
					target.click(OggPlayer.clickButton).append(audioObj).attr('title',i18n.msg(OggPlayer.constRef.play).plain());
				},
				clickButton: function(){
					var focusDom = $(this).find("audio."+OggPlayer.constRef.OggAudio).get(0);
					var toPlay = false;
					if (!focusDom.currentTime) toPlay = true;
					OggPlayer.pauseAll();
					if (toPlay) {
						focusDom.preload="auto";
						focusDom.play();
					}
				},
				pauseAll: function(){
					$("."+OggPlayer.constRef.nowPlaying+" audio."+OggPlayer.constRef.OggAudio).trigger("pause");
				},
				errorPlayer: function(player){
					player.addClass(OggPlayer.constRef.noAudio).attr('title', i18n.msg(OggPlayer.constRef.noAudio).plain());
				},
				stopThis: function(){
					$(this).parent().removeClass(OggPlayer.constRef.nowPlaying);
					this.currentTime = 0;
				},
				isValid: function(url) {
					if(url === undefined) return false;
					url = url.replace(/\?.*$/, '');
					if(url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 && url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) return false; // Wikia and Wikimedia only
					url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
					if(url.search(/\.(ogg|oga|ogv|mp3)/) < 0) return false; //Removed the ending tag ($) from previous author's vesion since regex strip didn't work too well
					return true;
				}
			};

		OggPlayer.init();
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('OggPlayer').then(init);
	});
})(this,jQuery, mediaWiki);