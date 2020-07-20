/* Any JavaScript here will be loaded for all users on every page load. */
/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */
 
/**
 * LockOldBlogs
 * http://dev.wikia.com/wiki/LockOldBlogs
 *
 * - Original version by User:Joeyaa
 * - Modified to work with Wikia's Lazy Loading by User:Mathmagician
 * - Configuration options by User:Mathmagician
 * - additional category option by User:Pecoes
 * 
 * License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
 */
 
if (mediaWiki.config.get('wgNamespaceNumber') === 500) {
	(function ($, mw, LockOldBlogs, ArticleComments) {
		"use strict";
 
		// set up default config options if custom ones haven't been supplied
		// want to ensure variables have the right type, so not using $.extend here
		if (typeof LockOldBlogs !== "object" || LockOldBlogs === null) {
			LockOldBlogs = {};
		}
		if (typeof LockOldBlogs.expiryDays !== "number") {
			LockOldBlogs.expiryDays = 30;
		}
		if (typeof LockOldBlogs.expiryMessage !== "string") {
			LockOldBlogs.expiryMessage = "This blog hasn\'t been commented on for over <expiryDays> days. There is no need to comment.";
		}
		if (typeof LockOldBlogs.nonexpiryCategory !== "string") {
			LockOldBlogs.nonexpiryCategory = "Nonexpiry blogs";
		}
		if (!$.isArray(LockOldBlogs.expiryCategories)) {
			LockOldBlogs.expiryCategories = [];
		}
 
		// dynamically replace <expiryDays> with the value of LockOldBlogs.expiryDays
		LockOldBlogs.expiryMessage = LockOldBlogs.expiryMessage.replace(/<expiryDays>/g, LockOldBlogs.expiryDays);
 
		// (private) true if comments should be locked, false otherwise
		// needs to be undefined by default
		var expired;
 
		// Finds if any of element of array A is in array B
		// [Only works with primitives (strings/numbers), not objects]
		function areAnyInArray(arr1, arr2) {
			/*jshint curly:false */
			var i = arr1.length, hash = {};
			while (i--) hash[arr1[i]] = 1;
			i = arr2.length;
			while (i--) {
				if (hash[arr2[i]] === 1) return true;
			}
			return false;
		}
 
		// (private) sets whether or not this blog has expired
		function setExpiration() {
			var wgCategories = mw.config.get('wgCategories'),
				$articleCommentsLI,
				wgArticleId,
				url,
				expiryMilliseconds,
				then,
				year,
				month,
				date,
				oldDate,
				currentDate,
				diffMilliseconds;
 
			// return false if this blog is in the nonexpiry category
			// indexOf is IE9+, Wikia supports IE8
			if (-1 !== $.inArray(LockOldBlogs.nonexpiryCategory, wgCategories)) {
				expired = false;
				return false;
			}
 
			// return false if this blog is not on the list of categories that expire
			// (if there is no list of categories then it's treated as match-any)
			if (LockOldBlogs.expiryCategories.length && !areAnyInArray(LockOldBlogs.expiryCategories, wgCategories)) {
				expired = false;
				return false;
			}
 
			// NOTE: Lazy Loading needs to be complete before parser reaches this line
			$articleCommentsLI = $('.Wall .MiniEditorWrapper .editarea textarea');
 
			if ($articleCommentsLI.length === 0) {
				// if there are no comments, base time calculation off the blog post creation date
				wgArticleId = mw.config.get("wgArticleId");
				url = "/api.php?action=query&format=json&prop=info&inprop=created&pageids=" + wgArticleId;
				$.getJSON(url, function (data) {
					try {
						var created = data.query.pages[wgArticleId].created; // e.g. 2010-09-29T01:47:30Z
						expiryMilliseconds = LockOldBlogs.expiryDays * 24 * 60 * 60 * 1000;
						diffMilliseconds = new Date().getTime() - new Date(created).getTime();
						expired = diffMilliseconds > expiryMilliseconds;
						// lock commenting if the blog has expired
						if (expired) {
							lockComments();
						}
					} catch (e) {
						expired = false;
					}
				});
			} else {
				// base time calculation off the top comment on the blog post
				expiryMilliseconds = LockOldBlogs.expiryDays * 24 * 60 * 60 * 1000;
				then = $articleCommentsLI
					.first()
					.find('.permalink')
					.attr('href')
					.match(/\d{8}(?=\d{6}\?)/)[0];
				year = +then.substring(0, 4);
				month = +then.substring(4, 6) - 1;
				date = +then.substring(6);
				oldDate = new Date(year, month, date);
				currentDate = new Date();
				diffMilliseconds = currentDate.getTime() - oldDate.getTime();
				expired = diffMilliseconds > expiryMilliseconds;
				// lock commenting if the blog has expired
				if (expired) {
					lockComments();
				}
			}
		}
 
		// (private) locks commenting
		// be sure to check if expired === true before calling this function!
		function lockComments() {
			$('.Wall .MiniEditorWrapper .editarea textarea')
			.attr('disabled', 'disabled')
			.text(LockOldBlogs.expiryMessage);
 
			$('.Wall .new-reply button').attr('disabled', 'disabled');
 
			$('.Wall .new-reply button .previewButton secondary').remove();
		}
 
		// (private) if expired == true, locks comments
		// if expired === undefined, first calculate it, then lock comments if expired == true
		function checkAndLock() {
			if (expired) {
				// if expired, lock comments immediately
				lockComments();
			} else if (expired === undefined) {
				// otherwise, calculate expired and then lock comments if necessary
				setExpiration();
			}
		}
 
		// (private) initialize LockOldBlogs
		function initLockOldBlogs() {
			if (ArticleComments) {
				if (ArticleComments.addHover) {
					var realFunc = ArticleComments.addHover;
					ArticleComments.addHover = function () {
						var result = realFunc.apply(ArticleComments, arguments);
						checkAndLock();
						return result;
					};
				}
 
				// special case where article comments have already loaded (shouldn't happen much in production)
				if (ArticleComments.initCompleted) {
					checkAndLock();
				}
			}
		}
 
		// add onload handler
		$(initLockOldBlogs);
 
		// expose public interface
		window.LockOldBlogs = LockOldBlogs;
	}(jQuery, mediaWiki, window.LockOldBlogs, window.ArticleComments));
}