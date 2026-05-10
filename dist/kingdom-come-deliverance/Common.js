/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/
/* <nowiki>
 * 
 * @module          WDSIcons demo
 * @description     Wikia Design System icon library demo.
 * @author          Speedit
 * @version         1.2.0
 * @license         CC-BY-SA 3.0
 * 
 */
;(function (window, mw, undefined) {
    mw.hook('dev.wds').add(function(wds) {
        wds.render(mw.util.$content.find('#dev-wds-demo'));
    });
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
}(this, mediaWiki));
/* </nowiki> */

/* for true toggle */

document.addEventListener("click", function (e) {
  const el = e.target.closest(".swap");
  if (!el) return;

  el.classList.toggle("active");
});

/**********************************/
/* code wrap */
function applyWrap(el) {
  if (el.dataset.wrapped) return;
  el.dataset.wrapped = "1";

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const node of textNodes) {
    node.nodeValue = node.nodeValue.replace(/([_-])/g, "$1\u200B");
  }
}

function scan() {
  document.querySelectorAll(".wrap-id, .wrap-id-mobile").forEach(applyWrap);
}

document.addEventListener("DOMContentLoaded", scan);

const observer = new MutationObserver(scan);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

/**********************************/