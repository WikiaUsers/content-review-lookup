 var defCBanDuration = 1200; // Equals to 20 minutes. Default is 1 day. (86400)
 // Import...
 
 importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 importScriptPage('MediaWiki:FixAdminKick/code.js','dev');
 
 var chatags = { images: true, videos: true };
 
 importArticles( {
     type: 'script',
     articles: [
         // ...
         'u:dev:MediaWiki:FasterBanModule/code.js',
         'u:dev:MediaWiki:!ban/code.js',
         'u:shining-armor:MediaWiki:ChatTags/code.js'
         // ...
     ]
 } );