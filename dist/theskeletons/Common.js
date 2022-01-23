/* Any JavaScript here will be loaded for all users on every loaded pages. */

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/* massBlockDelay */

importArticles({    
       type: 'script',    
       articles: [        
          'u:dev:MediaWiki:MassBlock/code.js',
       ]
});

/* Message Wall Greeting for all users */
importArticles({    
	type: 'script',    
	articles: [        
		'u:dev:MediaWiki:WallGreeting.js',    
		]
});