var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
cacheSkip = [];
cacheSkipLimit = 5000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:SocialIcons/code.js',  
        'u:dev:CacheCheck/code.js',
        'w:dev:TopEditors/code.js'
    ]
});