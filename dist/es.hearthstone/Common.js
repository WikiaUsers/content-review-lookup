window.UserTagsJS = { 
modules: {}, 
tags: { 
'bureaucrat': { u:'Burócrata' }, 
'sysop': { u:'Administrador' }, 
'inactive': { u:'Inactivo', f:'Inactiva' }, 
} 
}; 
UserTagsJS.modules.inactive = { 
days: 30,
namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 500, 501, 1201], 
zeroIsInactive: false 
}; 
mwGroups: [ 
'bannedfromchat', 
'bureaucrat', 
'chatmoderator', 
'founder', 
'sysop', 
'rollback', 
'bot' 
], UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true; 
importArticles({ 
type: 'script', 
articles: [ 
'u:dev:UserTags/code.js' 
] 
});