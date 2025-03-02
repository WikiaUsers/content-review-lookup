/**
 * @name BilibiliVideo.js
 * @author 机智的小鱼君
 * @description Add video from bilibili.com to article
 */
(function ($, mw) {
	'use strict';

	var msg;

	function generate(index, ele) {
		ele.classList.add('loaded');
		// Variables
		var data = ele.dataset;
		var videoId;
		var av = data.av;
		var bv = data.bv;
		var page = data.page || data.param || 1; // data-param is typo made by the author in the old version
		var size = data.size || data.width || '80%';
		var height = data.height;
		var autoplay = data.autoplay == false ? 0 : 1;

		// Verify data
		// Video ID must be set
		if (!av && !bv) {
			return $('<span>', { class: 'error', text: msg('undefineAv').escape() });
		}
		// Video ID
		if (bv) {
			bv = bv.replace(/^bv/i, '');
			videoId = 'bvid=' + bv;
		} else if (av) {
			av = av.replace(/^av/i, '');
			// AV number must be positive integer
			if (!/^[1-9]\d*$/.test(av)) {
				return $('<span>', { class: 'error', text: msg('invalidAvNumber').escape() });
			}
			videoId = 'aid=' + av;
		}
		// Page of video must be positive integer
		if (!/^[1-9]\d*$/.test(page)) {
			page = 1;
		}

		// build iframe element
		var $iframe = $('<iframe>', {
			class: 'bili-show bilibili-iframe',
			id: bv ? 'bv-' + bv : 'av-' + av,
			src: 'https://player.bilibili.com/player.html?' + videoId + '&page=' + page + '&autoplay=' + autoplay,
			scrolling: 'no',
			border: 0,
			frameborder: 'no',
			framespacing: 0,
			allowfullscreen: true
		}).css('width', size);

		if (height) {
			$iframe.css('height', height);
		}

		// Resize
		function resizeBilibili() {
			$iframe.height(function () {
				if (!height && $(this).width() !== 0) {
					return $(this).width() / 4 * 3;
				}
			});
		}

		// Run
		$iframe.ready(resizeBilibili);
		$(window).resize(resizeBilibili);
		$('.mw-collapsible-toggle').click(resizeBilibili);
		$('.content-size-toggle, .right-rail-toggle, .wds-tabs__tab-label a').click(function() {
			setTimeout(resizeBilibili, 300);
		});

		// Return element
		$(ele).append($iframe);
	}

	function init($content) {
		$content.find('.BiliVideo:not(.loaded), .BilibiliVideo:not(.loaded)').each(generate);
	}

	// i18n-js
	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('BilibiliVideo').then(function(i18no) {
			msg = i18no.msg;
			mw.hook('wikipage.content').add(init);
		});
	});

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);