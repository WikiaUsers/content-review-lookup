/*
 * @module			ReadProgressBar.js
 * @description		Adds a progress bar below the Global Navigation Bar that
					shows how much the user has progressed through a blog post
					(or article).
 * @author			Polymeric
 * @license			CC-BY-SA 3.0
*/

;(function(mw) {
	'use strict';

	// Get user name and namespace ID.
	// If a username is returned, it means that the user is in a user's blog
	// list page, in which the progress bar won't appear.
	// If the namespace ID is not the same as the blogs or articles, add the
	// progress bar (on the later it's also required to manually enable it
	// with window.enableReadProgressBarOnArticles = true).
	// We also add a double-run protection on the same if statement.
	const config = mw.config.get(['profileUserName', 'wgNamespaceNumber']);

	if ((config.wgNamespaceNumber === 500 && !config.profileUserName ||
		config.wgNamespaceNumber === 0 && window.enableReadProgressBarOnArticles) &&
		!window.progressBarLoaded) {
		progressBarInit();
	}

	function progressBarInit() {

		// Double-run protection.
		window.progressBarLoaded = true;

		importArticle({ article: 'u:dev:MediaWiki:ReadProgressBar.css' });

		// Get article elements to get their height and create progress bar.
		const navBar = document.querySelector('.fandom-sticky-header'),
			  pageHeader = document.querySelector('.page-header'),
			  siteHeader = document.querySelector('.community-header-wrapper'),
			  articleWrapper = document.getElementById('content'),
			  progressBarWrapper = document.createElement('div'),
			  progressBar = document.createElement('div'),
			  barDirection = document.documentElement.getAttribute('dir') || 'ltr',
			  barPosMin = barDirection === 'ltr' ? -100 : 0,
			  barPosMax = barDirection === 'ltr' ? 0 : 100;
        var articleHeight = articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight,
            percentage = 0;
		progressBarWrapper.classList.add('article-progress-bar');
		progressBar.classList.add('article-progress-bar__indicator');
		navBar.appendChild(progressBarWrapper);
		progressBarWrapper.appendChild(progressBar);

		// Get height of the article and use it along with the user's Y position
		// to calculate the scrollbar's X position. Once the scrollbar's X
		// position is greater than 100% (in ltr view) or less than 0% (in rtl
		// view), hide it behind the global nav bar; otherwise show it.
		function scrolledProgressBarLTR() {
            percentage = window.pageYOffset / articleHeight * 100;
            progressBar.style.transform = 'translateX(clamp(' + barPosMin + '%, ' + (percentage - 100) + '%, ' + barPosMax + '%)';
        }

        function scrolledProgressBarRTL() {
            percentage = window.pageYOffset / articleHeight * 100;
            progressBar.style.transform = 'translateX(clamp(' + barPosMin + '%, ' + (-percentage + 100) + '%, ' + barPosMax + '%)';
        }

        // Hide progress bar when article is not on view (aka. when scroll
        // percentage would be around or more than 100%) by using an intersection
        // observer so (IO) we don't have to check every scroll event if the
        // progress bar should be hidden or re-displayed.
        function handleProgressBarVisibility() {
            attachViewportObserver(articleWrapper);

        	function attachViewportObserver(elem) {
        		var observerConfig = {
        			// Use the viewport as the observer.
        			root: null,
                    // Trigger intersection handler when scrolled past
                    // (100% - 60px) the article.
                    rootMargin: '-60px 0px 0px 0px'
        		};

        		var observer = new IntersectionObserver(function (e) {
        			e.forEach(function (e) {
        				// If the element is on view, trigger a function that
        				// makes it visible.
        				e.isIntersecting && showProgressBar();
        				// Otherwise, hide it.
        				!e.isIntersecting && hideProgressBar();
        			});
        		}, observerConfig);

        		observer.observe(elem);
        	}
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

		if (barDirection === 'rtl') {
            ['scroll', 'resize'].forEach(function(event) {
                window.addEventListener(event, scrolledProgressBarRTL, { passive: true });
            });
        } else {
            ['scroll', 'resize'].forEach(function(event) {
                window.addEventListener(event, scrolledProgressBarLTR, { passive: true });
            });
        }

        window.addEventListener('resize', updateArticleHeight);

        handleProgressBarVisibility();
	}
}(window.mediaWiki));