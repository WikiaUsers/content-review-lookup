/* Import auto profiles */
importArticles({
	type: 'script',    
	articles: [        
		'u:dev:MediaWiki:AutoCreateUserPages.js',    
		]
});

/* To replace the now dead "welcome bot" */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:Default Profile}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};