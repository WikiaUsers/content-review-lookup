/*
 * @module        ReadProgressBar.js
 * @description   Adds a progress bar below the Global Navigation Bar that shows
                  how much the user has progressed through a blog post.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
*/

;(function (mw) {
  'use strict';
  // Enabling script exclusively on blogs.
  switch (mw.config.get('wgNamespaceNumber')) {
    // case 0:  // Articles
    case 500:   // Blogs
      progressBarInit();
    break;
  }

  function progressBarInit() {

    // Double run protection.
    if (window.progressBarLoaded) return;

    window.progressBarLoaded = true;

    importArticle({ article: 'u:dev:MediaWiki:ReadProgressBar.css' });

    // Defining relevant elements.
    var navBar = document.querySelector('.fandom-sticky-header');
    var pageHeader = document.querySelector('.page-header');
    var siteHeader = document.querySelector('.community-header-wrapper');
    var articleWrapper = document.getElementById('content');
    var progressBarWrapper = document.createElement('div');
    var progressBar = document.createElement('div');
    var articleHeight = articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight;
    progressBarWrapper.classList.add('article-progress-bar');
    progressBar.classList.add('article-progress-bar__indicator');
    navBar.appendChild(progressBarWrapper);
    progressBarWrapper.appendChild(progressBar);

    // Defining progress bar functionality.
    function scrolledProgressBar() {
      var percentage = window.pageYOffset / articleHeight * 100;
      progressBar.style.transform = 'translateX(' + (percentage - 100) + '%)',
      percentage >= 100 ? hideProgressBar() : showProgressBar();
    }
  
    function hideProgressBar() {
      progressBarWrapper.classList.add('hide');
      progressBar.style.transform = 'translateX(0)';
    }
  
    function showProgressBar() {
      progressBarWrapper.classList.remove('hide');
    }
  
    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, function() {
        scrolledProgressBar();
      }, { passive: true }, false);
    });
  }
}(window.mediaWiki));