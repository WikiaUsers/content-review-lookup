/**
 * Periodically fire Google's platform script for the YouTube Subscribe button
 * @param delay Delay between load trial
 * @param maxIter Maximum number of iteration before it gives up (default: 10)
 */
function subButtonLoad(delay, maxIter) {
  const platformJS = 'https://apis.google.com/js/platform.js';
  let iter = 0;

  if (mw.config.get('wgNamespaceNumber') !== 0 && document.querySelector("div.g-ytsubscribe")) {
    const handler = setInterval(function () {
      mw.loader.load(platformJS);
      console.count("[Wikitubia] Firing payload");
      iter++;

      if (!document.querySelector("div.g-ytsubscribe") || iter >= maxIter) {
        console.debug("[Wikitubia] Stopping sub button payload firing at iteration: ".concat(iter.toString()));
        clearInterval(handler);
      }
    }, delay)
  } else {
    return
  }
}

/** Change PI label */
$('.pi-data-label:contains("Username")').replaceWith('<h3 class="pi-data-label pi-secondary-font">Subscribers</h3>');

/**
 * Cosmetically remove Alida's bot tag
 * @param delay Delay between remove attempts
 */
function removeNFGBotTag(delay) {
  if (mw.config.get('wgPageName') !== 'User:Nerdfightergirl') return;

  const userTags = document.querySelectorAll('span.user-identity-header__tag');
  const handler = setInterval(function () {
    if (userTags) {
      userTags.forEach(function (userTag) {
        if (userTag.innerText === "Bot") userTag.remove();
      })
      clearInterval(handler);
    }
  }, delay);
}

subButtonLoad(1000, 10);
removeNFGBotTag(1000)