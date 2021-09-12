/*
--- This is basically dev:OggPlayer.js, but with support for all uploadable audio file formats
--- Changes:
---     1) Removed mw 1.19 specific stuff
---     2) Changed the string that validates file formats
---     3) Removed the test whether ogg is supported by the browser
*/
(function() {
	'use strict';
	if (window.OggPlayerLoaded) return;
	window.OggPlayerLoaded = true;
	importArticle({type: 'script',article: 'u:dev:MediaWiki:I18n-js/code.js'});
	importArticle({type: 'style',article: 'u:dev:MediaWiki:OggPlayer.css'});

	if(typeof window.oggPlayerButtonOnly == 'undefined') window.oggPlayerButtonOnly = false;

	function init(i18n) {
		var OggPlayer = {
				constRef:{
					wrapper:"audio-button",
					noAudio:"no-audio",
					nowPlaying:"now-playing",
					OggAudio:"OggPlayer-Audio",
					play:"play"
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
								$(this).parent().addClass(OggPlayer.constRef.nowPlaying).attr('title', 'Stop');
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
					$(this).parent().removeClass(OggPlayer.constRef.nowPlaying).attr('title', i18n.msg(OggPlayer.constRef.play).plain());
					this.currentTime = 0;
				},
				isValid: function(url) {
					if(url === undefined) return false;
					url = url.replace(/\?.*$/, '');
					if(url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 && url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) return false; // Wikia and Wikimedia only
					url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
					if(url.search(/\.(ogg|oga|ogv|flac|opus|wav|webm|mp3)/) < 0) return false;
					return true;
				}
			};
		mw.hook('wikipage.content').add(OggPlayer.monitor);
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('OggPlayer').then(init);
	});
})();