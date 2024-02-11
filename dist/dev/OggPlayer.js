(function($, mw) {
	'use strict';
	//Load Protection
	if (window.OggPlayerLoaded) return;
	window.OggPlayerLoaded = true;
	//Load Localization and styles
	importArticles({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	}, {
		type: 'style',
		article: 'u:dev:MediaWiki:OggPlayer.css'
	});

	//Default Setting
	if (typeof window.oggPlayerButtonOnly == 'undefined') window.oggPlayerButtonOnly = false;

	function init(i18n) {
		var OggPlayer = {
			constRef:{
				wrapper:"audio-button",
				noSupport:"no-support",
				noAudio:"no-audio",
				nowPlaying:"now-playing",
				OggAudio:"OggPlayer-Audio",
				play:"play",
				focusable:"focusable"
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
				
				if (target.hasClass(OggPlayer.constRef.focusable)) {
					target.attr("tabindex", 0)
					target.on("keypress", function(e) {
						// enter key pressed
						if (e.which === 13) {
							target.trigger("click");
						}
						// space bar pressed
						else if (e.which === 32) {
							e.preventDefault();
							target.trigger("click");
						}
					});
				}
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
				if(url.search(/\.(ogg|oga|ogv|mp3|wav)/) < 0) return false; //Removed the ending tag ($) from previous author's vesion since regex strip didn't work too well
				return true;
			}
		};

		OggPlayer.init();
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('OggPlayer').then(init);
	});
})(window.jQuery, window.mediaWiki);