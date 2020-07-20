// Imports LinkImagePopup by Bobogoobo
// Shows a popup image of a character/episode/location when hovering over a link to it
// Lists of categories in the script need to be updated manually
// To delete stored data: window.sessionStorage.removeItem('linkPopupStorage');
// To disable the script: in your Special:MyPage/wikia.js add: window.linkImagePopupDisabled = true;
// To disable sessionStorage caching: window.linkImagePopupCachingDisabled = true;
if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    importScript('MediaWiki:Common.js/LinkImagePopup.js');
}