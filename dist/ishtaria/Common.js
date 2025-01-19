/* Any JavaScript here will be loaded for all users on every page load. */
 
if (wgPageName === "Unit_List") {
  importArticles ({
    type:    'script',
    articles: [
      'MediaWiki:UnitListTableFilter.js',
      'w:c:dev:ReferencePopups/code.js',
      'MediaWiki:UnitListTooltip.js'
    ]
  }, {
    type:    'style',
    article: 'MediaWiki:UnitList.css'
  });
} else if (wgPageName === "Other_Data") {
  importArticle ({
    type:    'script',
    article: [
        'MediaWiki:DamageCalculator.js',
        'MediaWiki:Schedule.js'
    ]
  });
} else {
  importArticles ({
    type: 'script',
    articles: [
      'MediaWiki:UserTags.js',
      'MediaWiki:IRC.js',
      'u:dev:ReferencePopups/code.js',
      'u:dev:Countdown/code.js',
      'u:dev:Tooltips/code.js',
      'w:c:dev:ReferencePopups/code.js',
      'u:dev:UserTags/code.js',
      'u:pad.wikia.com:MediaWiki:FilterTable.js'
    ]
  });
}