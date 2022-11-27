//改写自 u:dev:MediaWiki:OggPlayer.js
//尽管叫OggPlayer，但试了下实际上也是支持Mp3类型音频文件的

(function(window, $, mw) {
	'use strict';
	//Load Protection
	if (window.OggPlayerLoaded) return;
	window.OggPlayerLoaded = true;
	//Load Localization
	importArticle({type: 'script',article: 'u:dev:MediaWiki:I18n-js/code.js'});

	//Default Setting
	if(typeof window.oggPlayerButtonOnly == 'undefined') window.oggPlayerButtonOnly = false;

	function init(i18n) {
		var OggPlayer = {
			constRef:{
			wrapper:"audio-button",
			noSupport:"no-support",
			noAudio:"no-audio",
			nowPlaying:"now-playing",
			OggAudio:"OggPlayer-Audio",
			play:"play"
			},
			init: function() {
				mw.hook('wikipage.content').add(OggPlayer.monitor);
			},
			monitor: function($elem) {
				$elem.find('.audio-button').each(OggPlayer.eachInstance);
				$(document).on('readyAgain', function(){
					$elem.find('.audio-button').each(OggPlayer.eachInstance);
				});
			},
			eachInstance: function() {
				var instance = $(this);
				if (instance.children().length) {
					var focus = instance.find("a[href][class=internal],audio[src],video[src],source[src]");
					instance.data("src",focus.attr("href")||focus.attr("src"));
				}
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
							$(this).closest('table').css('border-color', 'red');
						},
						pause:OggPlayer.stopThis,
						ended:OggPlayer.stopThis,
						error: function(){
							OggPlayer.errorPlayer($(this).parent());
						}
					}
				});
				target.click(OggPlayer.clickButton).append(audioObj).attr('title',i18n.msg(OggPlayer.constRef.play).plain());
				target.find('audio:not(.'+OggPlayer.constRef.OggAudio+')').remove();
			},
			clickButton: function(){
				var focusDom = $(this).find("audio."+OggPlayer.constRef.OggAudio).get(0);
				var toPlay = false;
				if (!focusDom.currentTime) toPlay = true;
				OggPlayer.pauseAll();
				if (toPlay) {
					focusDom.preload="auto";
					//尝试添加进度条，失败了
					$('div.audio-text-bg').css({'animation-duration': focusDom.duration.toString()+'s', '-webkit-animation-duration': focusDom.duration.toString()+'s'}).addClass('click');
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
				$(this).closest('table').css('border-color', 'white');
				$('div.audio-text-bg.click').css({'animation-duration': '0', '-webkit-animation-duration': '0'}).removeClass('click');
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