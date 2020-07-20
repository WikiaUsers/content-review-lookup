/**
 * @fileOverview NoImageLightbox
 * http://dev.wikia.com/wiki/NoImageLightbox/code.js
 * - Kills image lightbox so that clicking an image takes you to the File:
 * - Videos use the same LightboxLoader.handleClick method that images do,
 *   so if that method is deleted, then videos can no longer be played,
 *   but this version uses a trick/hack to make sure that if a video is
 *   clicked, then the LightboxLoader.handleClick is still called properly
 * - Available under Creative Commons Attribution-Share Alike License 3.0
 * @author User:Mathmagician
 */
 
/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */
 
if ({ 'oasis': 1, 'wikia': 1 }[mediaWiki.config.get('skin')] === 1) {
	jQuery(function ($) {
		"use strict";
 
		var LightboxLoader = window.LightboxLoader;
 
		// only run script if LightboxLoader is defined and handleClick hasn't been overwritten yet
		// i.e. don't let this script run twice, because it causes problems
		if (LightboxLoader && !LightboxLoader.handleClickOverride) {
			LightboxLoader.handleClickOverride = LightboxLoader.handleClick;
			LightboxLoader.handleClick = function (event) {
				// let videos play in the lightbox as intended
				if ($(event.target).parent().hasClass('video')) {
					LightboxLoader.handleClickOverride.apply(LightboxLoader, arguments);
				}
			};
 
			// href to File: page, but not for images that have the link= set, e.g. [[File:Image.png|link=MyPage]]
			$('a[data-image-name]').not('.link-internal').each(function () {
				var $this = $(this),
					e = encodeURIComponent($this.attr('data-image-name').replace(/ /g, '_'));
				$this.attr('href', '/wiki/File:' + e);
			});
		}
	});
}