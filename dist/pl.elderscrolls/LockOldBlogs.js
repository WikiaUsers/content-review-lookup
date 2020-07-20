/* __NOWYSIWYG__<source lang="javascript"> */
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
if(mediaWiki.config.get('wgNamespaceNumber') === 500) {
	(function ($, mw, LockOldBlogs, ArticleComments) {
		"use strict";
		if(typeof LockOldBlogs !== "object" || LockOldBlogs === null) {
			LockOldBlogs = {};
		}
		if(typeof LockOldBlogs.expiryDays !== "number") {
			LockOldBlogs.expiryDays = 30;
		}
		if(typeof LockOldBlogs.expiryMessage !== "string") {
			LockOldBlogs.expiryMessage = "Ten blog nie był komentowany ponad <expiryDays> dni. Nie ma potrzeby dodawać do niego nowych komentarzy.";
		}
		if(typeof LockOldBlogs.nonexpiryCategory !== "string") {
			LockOldBlogs.nonexpiryCategory = "Niewygasające blogi";
		}
		if(!$.isArray(LockOldBlogs.expiryCategories)) {
			LockOldBlogs.expiryCategories = [];
		}
		LockOldBlogs.expiryMessage = LockOldBlogs.expiryMessage.replace(/<expiryDays>/g, LockOldBlogs.expiryDays);
		var expired;
		function areAnyInArray(arr1, arr2) {
			var i = arr1.length,
				hash = {};
			while(i--) hash[arr1[i]] = 1;
			i = arr2.length;
			while(i--) {
				if(hash[arr2[i]] === 1) return true;
			}
			return false;
		}
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

			if(-1 !== $.inArray(LockOldBlogs.nonexpiryCategory, wgCategories)) {
				expired = false;
				return false;
			}

			if(LockOldBlogs.expiryCategories.length && !areAnyInArray(LockOldBlogs.expiryCategories, wgCategories)) {
				expired = false;
				return false;
			}

			$articleCommentsLI = $('#article-comments-ul li.SpeechBubble');

			if($articleCommentsLI.length === 0) {
				wgArticleId = mw.config.get("wgArticleId");
				url = "/api.php?action=query&format=json&prop=info&inprop=created&pageids=" + wgArticleId;
				$.getJSON(url, function (data) {
					try {
						var created = data.query.pages[wgArticleId].created;
						expiryMilliseconds = LockOldBlogs.expiryDays * 24 * 60 * 60 * 1000;
						diffMilliseconds = new Date().getTime() - new Date(created).getTime();
						expired = diffMilliseconds > expiryMilliseconds;
						if(expired) {
							lockComments();
						}
					} catch(e) {
						expired = false;
					}
				});
			} else {
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
				if(expired) {
					lockComments();
				}
			}
		}

		function lockComments() {
			$('#article-comm')
				.attr('disabled', 'disabled')
				.text(LockOldBlogs.expiryMessage);

			$('#article-comm-submit').attr('disabled', 'disabled');

			$('.article-comm-reply').remove();
		}

		function checkAndLock() {
			if(expired) {
				lockComments();
			} else if(expired === undefined) {
				setExpiration();
			}
		}

		function initLockOldBlogs() {
			if(ArticleComments) {
				if(ArticleComments.addHover) {
					var realFunc = ArticleComments.addHover;
					ArticleComments.addHover = function () {
						var result = realFunc.apply(ArticleComments, arguments);
						checkAndLock();
						return result;
					};
				}

				if(ArticleComments.initCompleted) {
					checkAndLock();
				}
			}
		}

		$(initLockOldBlogs);

		window.LockOldBlogs = LockOldBlogs;
	}(jQuery, mediaWiki, window.LockOldBlogs, window.ArticleComments));
}

/* </source> */