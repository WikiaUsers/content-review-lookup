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
    progressBarWrapper.classList.add('article-progress-bar');
    progressBar.classList.add('article-progress-bar__indicator');
    progressBarWrapper.setAttribute('id', 'read-progress-bar-wrapper');
    progressBar.setAttribute('id', 'read-progress-bar');
    navBar.appendChild(progressBarWrapper);
    progressBarWrapper.appendChild(progressBar);

    // Defining progress bar functionality.
    function articleHeight() {
      return articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight;
    }
  
    function scrolledProgressBar() {
      var percentage = window.pageYOffset / articleHeight() * 100;
      progressBar.style.width = percentage + '%',
      percentage >= 100 ? hideProgressBar() : showProgressBar();
    }
  
    function hideProgressBar() {
      progressBarWrapper.classList.add('hide');
    }
  
    function showProgressBar() {
      progressBarWrapper.classList.remove('hide');
    }
  
    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, function() {
        scrolledProgressBar();
      }, false);
    });
  }
}(window.mediaWiki));