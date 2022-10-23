/*
 *
 * @module        ReadProgressBar.js
 * @description   Adds a progress bar below the Global Navigation Bar that shows
                  how much the user has progressed through a blog post.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 * @note          The script uses css-in-js, therefore, it can bypass disabling
                  of user css. Done with vanilla Javascript.
 
 *
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

    // Defining relevant elements.
    var progressBarCss = document.createElement('style');
    var navBar = document.querySelector('.fandom-sticky-header');
    var pageHeader = document.querySelector('.page-header');
    var siteHeader = document.querySelector('.community-header-wrapper');
    var articleWrapper = document.getElementById('content');
    var progressBar = document.createElement('div');
    // To avoid using 3D CSS or DOM manipulation to get the progress bar behind
    // the navbar, we create a pseudo-element for .fandom-sticky-header that
    // will be in front (with z-index) of the progress bar. It will use the same
    // background color as the navbar in order to visually hide it. We also set
    // the rest of styles the script needs.
    var progressBarCssContent = ':root {\n  --progress-bar-color: var(--theme-accent-color--hover, #997600);\n  --progress-bar-height: 4px;\n}\n\n.fandom-sticky-header > .fandom-sticky-header__logo,\n.fandom-sticky-header > .fandom-sticky-header__sitename,\n.fandom-sticky-header > .fandom-community-header__local-navigation,\n.fandom-sticky-header > .wiki-tools {\n  z-index: 2;\n}\n\n.fandom-sticky-header::after {\n  background-color: var(--theme-sticky-nav-background-color);\n  bottom: 0;\n  content: "";\n  display: block;\n  height: var(--progress-bar-height, 4px);\n  left: 0;\n  max-height: 8px;\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n  z-index: 1;\n}\n\n.article-progress-bar__indicator {\n  background-color: var(--progress-bar-color);\n  bottom: 0;\n  height: var(--progress-bar-height, 4px);\n  left: 0;\n  max-height: 8px;\n  position: absolute;\n  transform: translateY(clamp(0px, var(--progress-bar-height, 4px), 8px));\n  transition: transform 250ms cubic-bezier(0.0, 0.0, 0.2, 1);\n  width: 0%;\n  z-index: 1;\n}\n\n.article-progress-bar__indicator.hide {\n  transform: translateY(0);\n  transition: transform 200ms cubic-bezier(0.4, 0.0, 1, 1);\n}';

    // Adding the CSS defined above along with the progress bar to the DOM.
    progressBarCss.classList.add('progress-bar-css');
    progressBarCss.textContent = progressBarCssContent;
    document.head.appendChild(progressBarCss);
    progressBar.classList.add('article-progress-bar__indicator');
    navBar.appendChild(progressBar);

    function articleHeight() {
      return articleWrapper.clientHeight + pageHeader.clientHeight + siteHeader.clientHeight;
    }
  
    function scrolledProgressBar(e) {
      var percentage = window.pageYOffset / articleHeight() * 100;
      progressBar.style.width = percentage + '%',
      percentage >= 100 ? hideProgressBar() : showProgressBar();
    }
  
    function hideProgressBar() {
      progressBar.classList.add('hide');
    }
  
    function showProgressBar() {
      progressBar.classList.remove('hide');
    }
  
    ['scroll', 'resize'].forEach(function(event) {
      window.addEventListener(event, function() {
        scrolledProgressBar();
      }, false);
    });
  }
}(window.mediaWiki));