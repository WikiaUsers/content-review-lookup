/* Any JavaScript here will be loaded for all users on every page load. */
// Shortcut for importArticle
function impart(article) {
    importArticle({ type: 'script', article: article });
}

// Custom user rights icons on userpages
if (
  {'User':1, 'User_blog':1, 'User_talk':1}[mw.config.get('wgCanonicalNamespace')] ||
  mw.config.get('wgPageName').indexOf('Special:Contributions') !== -1
){
    impart('MediaWiki:Common.js/userRightsIcons.js');
}