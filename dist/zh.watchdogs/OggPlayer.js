//此JS是OggPlayer的实现，详见dev.fandom.com/wiki/MediaWiki:OggPlayer.js?action=edit
(function($, mw) {		// 使用立即执行函数表达式（IIFE），传入 jQuery（$）和 MediaWiki（mw）作为参数
    'use strict';		// 在严格模式下运行代码，强制执行更严格的语法和错误检查
	if (window.OggPlayerLoaded) return;		// 检查是否已加载OggPlayer，以防止重复加载
    window.OggPlayerLoaded = true;			// 将OggPlayerLoaded标志设置为true，表示OggPlayer已加载
    // 加载本地化和样式
    importArticles({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js' // 加载本地化脚本
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:OggPlayer.css' // 加载OggPlayer CSS样式
    });
	//默认设置
	// 如果 window.oggPlayerButtonOnly 未定义，则将其设置为 false
	if (typeof window.oggPlayerButtonOnly == 'undefined') window.oggPlayerButtonOnly = false;

	function init(i18n) {
    // 定义 OggPlayer 对象，包含常量引用
		 var OggPlayer = {
        	constRef: {
            	wrapper: "audio-button",     // 包装器元素的类名
            	noSupport: "no-support",     // 不支持音频的类名
            	noAudio: "no-audio",         // 没有音频文件的类名
            	nowPlaying: "now-playing",   // 当前正在播放的音频的类名
            	OggAudio: "OggPlayer-Audio", // Ogg 音频的类名
            	play: "play",                // 播放按钮的类名
            	focusable: "focusable"       // 可以获取焦点的元素的类名
        	},
			init: function() {				 // 初始化函数
				// 测试浏览器是否支持播放 Ogg 音频格式
    			var support = document.createElement('audio').canPlayType('audio/ogg');
    			if (support === "") return OggPlayer.noSupport();// 如果不支持，调用 noSupport 函数
    			// 如果支持，监听 wikipage.content 钩子，并在内容加载后执行 monitor 函数
    			mw.hook('wikipage.content').add(OggPlayer.monitor);  
			},
			noSupport: function() {
    		// 如果不支持音频格式，为所有未准备好的音频按钮添加对应的类和标题
				 $('.audio-button:not(.ready)').attr('title', i18n.msg(OggPlayer.constRef.noSupport).plain()).addClass(OggPlayer.constRef.noAudio);
			},
			monitor: function($elem) {
				// 监听函数，当内容加载完成后，查找所有的音频按钮并对每个进行处理
    			$elem.find('.audio-button').each(OggPlayer.eachInstance);
			},
			eachInstance: function() {		// 对每个音频按钮实例进行处理
    			var instance = $(this);			// 将嵌入的数据标准化为实例
    			if (instance.children().length) {
    				var focus = instance.find("a[href][class=internal],audio[src],video[src],source[src]");
        			instance.data("src", focus.attr("href") || focus.attr("src"));
    			}
			OggPlayer.createButton(instance); // 从实例源创建按钮
			},

			createButton: function(target) {
    			if (!OggPlayer.isValid(target.data('src')))	// 检查数据源是否有效
        			return OggPlayer.errorPlayer(target);	// 如果数据源无效，调用 errorPlayer 函数并返回
    			var audioObj = $('<audio>', {				// 创建音频元素对象
        			src: target.data('src'),        		// 设置音频源
        			preload: 'none',                		// 设置预加载方式
        			class: OggPlayer.constRef.OggAudio, 	// 添加类
        			on: {
            			playing: function() {				// 当音频播放时，给父元素添加类以显示当前正在播放
                $(this).parent().addClass(OggPlayer.constRef.nowPlaying);
            			},
        				pause: OggPlayer.stopThis,			// 当音频暂停时，调用 stopThis 函数
            			ended: OggPlayer.stopThis,			// 当音频播放结束时，调用 stopThis 函数
            			error: function() {					// 当音频加载错误时，调用 errorPlayer 函数
            				// 调用 errorPlayer 函数，传递当前元素的父元素作为参数
                			OggPlayer.errorPlayer($(this).parent());
						}
					}
				});
				// 给目标元素绑定点击事件，并添加音频元素，并设置标题
				target.click(OggPlayer.clickButton).append(audioObj).attr('title', i18n.msg(OggPlayer.constRef.play).plain());
				// 如果目标元素有 focusable 类，则添加键盘交互功能
				if (target.hasClass(OggPlayer.constRef.focusable)) {
					target.attr("tabindex", 0);			// 设置 tabindex 属性，使目标元素可聚焦
    				target.on("keypress", function(e) {	// 添加键盘事件监听器
        				if (e.which === 13) {			// 如果按下 Enter 键（键码为 13），
            				target.trigger("click");	// 则触发点击事件
        				}
        				else if (e.which === 32) {		// 如果按下空格键（键码为 32），
            				e.preventDefault();			//则阻止默认行为，
            				target.trigger("click");	//并触发点击事件
        				}
    				});
				}
			},
		
			clickButton: function() {			// 处理音频按钮的点击事件
    			// 查找当前音频按钮下的音频元素
    			var focusDom = $(this).find("audio." + OggPlayer.constRef.OggAudio).get(0);
    			var toPlay = false; 			// 标志变量，用于指示是否需要播放音频
    			if (!focusDom.currentTime) {	// 如果音频当前时间为 0（未播放状态），则将 toPlay 设置为 true
        	toPlay = true;
    		}
    			OggPlayer.pauseAll();			// 暂停所有正在播放的音频
    			if (toPlay) {					// 如果需要播放音频
        			focusDom.preload = "auto";	// 设置音频的 preload 属性为 "auto"，以自动加载音频
    				focusDom.play();			// 播放音频
    			}
			},
			pauseAll: function() {				// 暂停所有正在播放的音频
    			$("." + OggPlayer.constRef.nowPlaying + " audio." + OggPlayer.constRef.OggAudio).trigger("pause");
			},
			errorPlayer: function(player) {		// 处理音频播放错误的情况
    			// 添加错误类并设置错误提示
    			player.addClass(OggPlayer.constRef.noAudio).attr('title', i18n.msg(OggPlayer.constRef.noAudio).plain());
			},
			stopThis: function() {				// 处理音频播放结束或暂停的情况
    			$(this).parent().removeClass(OggPlayer.constRef.nowPlaying);  // 移除当前正在播放的标记类
    			this.currentTime = 0;			// 将当前播放时间重置为0
			},
			
			isValid: function(url) {			// 检查给定的 URL 是否有效
  
    			if (url === undefined) return false;  // 如果 URL 未定义，则视为无效
    			url = url.replace(/\?.*$/, '');		  // 去除 URL 中的查询字符串部分
    			// 检查 URL 是否符合 Wikia 和 Wikimedia 的规范
    			if (url.search(/(?:https?:)?(?:\/\/)(?:images|img|static|vignette)\d*\.wikia\.(?:nocookie\.)?(?:net|com)/) < 0 &&	url.search(/(?:https?:)?(?:\/\/)upload\.wikimedia\.org/) < 0) {
        		return false;						// 仅限 Wikia 和 Wikimedia
				}
    			// 修正 URL 中的 vignette 和 revision 部分
    			url = url.replace(/(vignette.*?)(\/revision.*$)/, '$1');
    			// 检查 URL 是否指向支持的音频格式
				// 从先前作者的版本中删除了结束标记($)，因为正则表达式条带不能很好地工作    
				if (url.search(/\.(ogg|oga|ogv|mp3|wav)/) < 0) return false; 
				return true;						  // 如果通过以上所有检查，则视为有效
			}
		};
		OggPlayer.init();   // 初始化 OggPlayer
    	mw.hook('dev.OggPlayer').fire(OggPlayer);	// 触发 OggPlayer 钩子，传递 OggPlayer 对象
	}

	mw.hook('dev.i18n').add(function(i18n) {		// 当 dev.i18n 钩子被触发时，执行回调函数
    	i18n.loadMessages('OggPlayer').then(init);	// 加载名为 'OggPlayer' 的插件的国际化消息
	});
// 结束立即执行函数表达式，并传递 window.jQuery 和 window.mediaWiki 作为参数
})(window.jQuery, window.mediaWiki);