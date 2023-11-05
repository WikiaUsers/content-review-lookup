/* Анимация в рейле */
  var currentPageNamespace = mw.config.get('wgCanonicalNamespace');
  var hasPhotoModule = currentPageNamespace !== 'Special' && currentPageNamespace !== 'MediaWiki';
  var waitForEl = function waitForEl(selector, blockElement) {
    return new Promise(function (resolve, reject) {
      var targetNode = document.querySelector(selector);
      var timeoutId;
      new MutationObserver(function (_, observer) {
        clearInterval(timeoutId);
        timeoutId = setTimeout(function () {
          if (blockElement && !targetNode.querySelectorAll(blockElement).length) {
            clearInterval(timeoutId);
            return;
          }

          observer.disconnect();
          return resolve();
        }, 500);
      }).observe(targetNode, {
        childList: true,
        subtree: true
      });  

    });
  };
  waitForEl('.right-rail-wrapper', hasPhotoModule ? '.photo-module' : null).then(function () {
  
    var railHeadings = document.querySelectorAll('.UserProfileAchievementsModule h2, .rail-module h2, .recentImages__title');
    railHeadings.forEach(function (rail) {
      return rail.insertAdjacentHTML('afterend', '<div class="rail-module__lines"></div>');
    });
  });