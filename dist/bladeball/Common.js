/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Navigation Icons */
importScript('MediaWiki:CustomNavigationIcons.js');
/* Custom Navigation Icons Dropdown*/
importArticle({ type: 'script', article: 'MediaWiki:Custom-Navigation-Icons.js' });
/* User Account Age Configurations*/
window.customUserAccountAge = {
  showFullDate: true
};

importArticles({
  type: 'script',
  articles: [
    'u:dev:MediaWiki:UserAccountAge/code2.js'
  ]
});
/* Load avatar and user on the main page*/
importScript('MediaWiki:CircleAvatar.js');
/* Merchant Spawning Time Converter */
importScript('MediaWiki:MerchantTime.js');