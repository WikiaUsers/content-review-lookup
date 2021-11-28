// <nowiki>
/**
 * This script makes Videos looks like a plain GIFs, which is with autoplay,
 * loop and muted.
 */

(function () {
	'use strict';

	function replaceVideo(containerSelector, originalSelector, controlSelector) {
		document.querySelectorAll(containerSelector).forEach( function ( $container) {
			var $original = $container.querySelector(originalSelector);
			if (!$original) {
				return;
			}
			$container.classList.add('replacedVideoContainer');
			var src =
				$original.getAttribute('src') || $original.getAttribute('poster');
			if (!src.endsWith('mp4.jpg')) {
				return;
			}
			var $video = document.createElement('video');
			// $video.classList.remove('kskin', 'playerPoster', 'pi-image-thumbnail');
			$video.setAttribute('src', src);
			$video.setAttribute('width', $original.getAttribute('width'));
			$video.setAttribute('height', $original.getAttribute('height'));
			
			$video['autoplay'] = true;
			$video['muted'] = true;
			$video['loop'] = true;
			$video['playsinline'] = true;
			
			$container.append($video);
			$original.parentElement.removeChild($original);
			var $controls = $container.querySelectorAll(controlSelector);
			$controls.forEach(function($ctr) {
				$ctr.parentElement.removeChild($ctr);
			});
			
			$video.onloadeddata = function (e) {
				e.target.play();
			};
		});
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