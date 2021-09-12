// <nowiki>
/**
 * This script makes Videos looks like a plain GIFs, which is with autoplay,
 * loop and muted.
 */

(function () {
	'use strict';

	function replaceVideo(containerSelector, originalSelector, controlSelector) {
		for (var $container of document.querySelectorAll(containerSelector)) {
			var $original = $container.querySelector(originalSelector);
			if (!$original) {
				continue;
			}
			$container.classList.add('replacedVideoContainer');
			var src =
				$original.getAttribute('src') || $original.getAttribute('poster');
			if (!src.endsWith('mp4.jpg')) {
				continue;
			}
			var $video = document.createElement('video');
			// $video.classList.remove('kskin', 'playerPoster', 'pi-image-thumbnail');
			$video.setAttribute('src', src);
			for (var attr of ['width', 'height']) {
				$video.setAttribute(attr, $original.getAttribute(attr));
			}
			for (var [k, v] of Object.entries({
				autoplay: true,
				muted: true,
				loop: true,
				playsinline: true,
			})) {
				$video[k] = v;
			}
			$container.append($video);
			$original.parentElement.removeChild($original);
			var $controls = $container.querySelectorAll(controlSelector);
			for (var $ctr of $controls) {
				$ctr.parentElement.removeChild($ctr);
			} 
			
			$video.onloadeddata = function (e) {
				e.target.play();
			};
		}
	}

	// For portable infobox
	replaceVideo(
		'.video-thumbnail',
		'img.pi-image-thumbnail',
		'.thumbnail-play-icon-container'
	);

	// For unloaded inline video
	// replaceVideo('.mediaContainer', 'video.kskin', 'source');

	// For loaded inline video
	// replaceVideo('.mediaContainer', 'img.playerPoster', '.mwPlayerContainer');
})();