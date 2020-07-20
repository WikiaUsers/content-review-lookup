window.UserTagsJS = {
    modules: {
        custom: {
            'JennaRules': ['bureaucrat']
        }
    },
    tags: {
	bureaucrat: { 
            u: 'Bureaucrat'
        }
    }
};
importScriptPage('UserTags/code.js', 'dev');









cacheSkip = [];
cacheSkipLimit = 1000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:CacheCheck/code.js'
    ]
});