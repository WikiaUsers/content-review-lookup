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

  el.innerHTML = el.textContent.replace(/([_-])/g, "$1<wbr>");
}

function scan() {
  const isMobile = document.body.classList.contains("skin-minerva");

  document.querySelectorAll(".wrap-id").forEach(applyWrap);

  if (isMobile) {
    document.querySelectorAll(".wrap-id-mobile").forEach(applyWrap);
  }
}

document.addEventListener("DOMContentLoaded", scan);

const observer = new MutationObserver(scan);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

/**********************************/