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
          progressBar = document.createElement('div');
    progressBarWrapper.classList.add('article-progress-bar');
    progressBar.classList.add('article-progress-bar__indicator');
    navBar.appendChild(progressBarWrapper);
    progressBarWrapper.appendChild(progressBar);

    // Get height of the article and use it along with the user's Y position to
    // calculate the scrollbar's X position. Once the scrollbar's X position is
    // greater than 100%, hide it behind the global nav bar; otherwise show it.
    function scrolledProgressBar() {
        var articleHeight = articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight,
            percentage = window.pageYOffset / articleHeight * 100;
        progressBar.style.transform = 'translateX(' + (percentage - 100) + '%)',
        percentage >= 100 ? hideProgressBar() : showProgressBar();
    }

    function hideProgressBar() {
        progressBarWrapper.classList.add('hide');
        progressBar.style.transform = 'translateX(0%)';
    }

    function showProgressBar() {
        progressBarWrapper.classList.remove('hide');
    }

    ['scroll', 'resize'].forEach(function(event) {
        window.addEventListener(event, scrolledProgressBar, { passive: true }, false);
    });
    }
}(window.mediaWiki));