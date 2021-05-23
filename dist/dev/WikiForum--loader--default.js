/**
 * @name WikiForum/loader/default
 * @version 3.0.5 (Core version)
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @desc Provide a front-end structured discussion page with JavaScript.
 *       Similar to Community Feed and support wikitext.
 *
 * @license MIT
 * @url https://github.com/Fandom-zh/Gadget-WikiForum
 */

/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/loader/default.js ***!
  \*******************************/
mw.hook('WikiForum').add(function (Core) {
  var conf = mw.config.get();
  var settings = window.WikiForumLoaderDefault || {};
  var loadNS = settings.loadNS || window.WikiForumNS || [];
  if (typeof loadNS === 'number') loadNS = [loadNS];
  if (loadNS.length < 1 && conf.wgNamespaceIds.forum) loadNS = [conf.wgNamespaceIds.forum];

  if (loadNS.includes(conf.wgNamespaceNumber) && $('.wiki-forum').length > 0 && // conf.wgArticleId !== 0 &&
  conf.wgAction === 'view') {
    Core.renderer.fromPage(conf.wgPageName);
  }
});
/******/ })()
;
//# sourceMappingURL=default.js.map