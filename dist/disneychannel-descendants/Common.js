/* Any JavaScript here will be loaded for all users on every page load. */ PurgeButtonText = 'Refresh'; 

importArticles({ 
   type: 'script',
   articles: [
       'u:dev:MediaWiki:PurgeButton/code.js',
       'u:dev:InactiveUsers/code.js'
   ]


}); 
   InactiveUsers = { months: 2 };