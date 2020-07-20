UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback',
'rollbacker', 'bannedfromchat']; 
UserTagsJS.modules.autoconfirmed = false; 
UserTagsJS.modules.newuser = false; 
importArticles({  
type: 'script',  
articles: [  
'u:dev:UserTags/code.js'  
]  
});