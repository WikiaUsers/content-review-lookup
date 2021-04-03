/* SCRIPT SETTINGS
   Due to how these scripts work, variable-type settings should be set before import */
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */

/* IMPORTS */
importArticles({
  type: 'script',
  articles: [
    'u:dev:ChatOptions/code.js',
    'u:dev:ChatTags/code.js',
    'u:dev:AjaxEmoticons/code.js',
    'u:le-miiverse-resource:MediaWiki:Chat.js/clearchat.js'
  ]
});