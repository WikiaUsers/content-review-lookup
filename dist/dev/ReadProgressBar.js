/*
** @module			ReadProgressBar.js
** @description		Adds a progress bar below the Global Navigation Bar that
					shows how much the user has progressed through a blog post
					(or article).
** @author			Polymeric
** @license			CC-BY-SA 3.0
*/

;(function(mw) {
	'use strict';

	// Get user name and namespace ID.
	//
	// If a username is returned, it means that the user is in a user's blog
	// list page, in which the progress bar won't appear.
	//
	// If the namespace ID is not the same as the blogs or articles, add the
	// progress bar (on the latter it's also required to manually enable it
	// with window.enableReadProgressBarOnArticles = true).
	const config = mw.config.get(['profileUserName', 'wgNamespaceNumber']),
		isInBlog = config.wgNamespaceNumber === 500 && !config.profileUserName,
		isAllowedInArticles = config.wgNamespaceNumber === 0 && window.enableReadProgressBarOnArticles;

	if (isInBlog || isAllowedInArticles && !window.progressBarLoaded) progressBarInit();

	function progressBarInit() {
		// Double-run protection.
		window.progressBarLoaded = true;

		importArticle({ article: 'u:dev:MediaWiki:ReadProgressBar.css' });

		// Get article elements to get their height and create progress bar.
		const navBar = document.getElementById('community-navigation'),
			pageHeader = document.querySelector('.page-header'),
			siteHeader = document.querySelector('.community-header-wrapper'),
			articleWrapper = document.getElementById('content'),
			progressBarWrapper = document.createElement('div'),
			progressBar = document.createElement('div');
		var articleHeight = articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight,
			percentage = 0;

			progressBarWrapper.classList.add('article-progress-bar');
			progressBar.classList.add('article-progress-bar__indicator');
			navBar.appendChild(progressBarWrapper);
			progressBarWrapper.appendChild(progressBar);

		// Get height of the article and use it along with the user's Y position
		// to calculate the scrollbar's X position.
		function updateProgressBar() {
			percentage = window.scrollY  / articleHeight;

			progressBar.style.transform = 'scaleX(' + percentage + ')';
		}

		// Hide progress bar when article is not on view (aka. when scroll
		// percentage would be around or more than 100%) by using an intersection
		// observer so we don't have to check every scroll event if the
		// progress bar should be hidden or re-displayed.
		function handleProgressBarVisibility() {
			function attachViewportObserver(elem) {
				const observerConfig = {
					// Use the viewport as the observer.
					root: null,
					// Trigger intersection handler when scrolled past the article.
					rootMargin: '-60px 0px 0px 0px'
				};

				const observer = new IntersectionObserver(function(e) {
					e.forEach(function(e) {
						// If the element is on view, trigger a function that makes it visible.
						e.isIntersecting && showProgressBar();
						// Otherwise, hide it.
						!e.isIntersecting && hideProgressBar();
					});
				}, observerConfig);

				observer.observe(elem);
			}

			attachViewportObserver(articleWrapper);
		}

		function hideProgressBar() {
			progressBarWrapper.classList.add('hide');
		}

		function showProgressBar() {
			progressBarWrapper.classList.remove('hide');
		}

		function updateArticleHeight() {
			articleHeight = articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight;
		}

		['scroll', 'resize'].forEach(function(event) {
			window.addEventListener(event, updateProgressBar, { passive: true });
		});

		window.addEventListener('resize', updateArticleHeight);

		handleProgressBarVisibility();
	}
}(window.mediaWiki));