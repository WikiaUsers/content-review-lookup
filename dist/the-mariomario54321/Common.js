// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                wikicoder: { u:'Wiki Coder' }, // each line except the last needs a comma at the end
                color: { u:'The Color Code Master' },
                raptor: { u:'Velociraptor' },
                dylan: { u:'The Creator' },
                mm: { u:'The Big Man' },
                kazi: { u:'Rahmen Noodles' },
                chris: { u:'Sushi Rolls'},
                ll : { u:'Hibernating Bear'}
	}
};
UserTagsJS.modules.custom = {
	'The Zog.': ['wikicoder'], // each line except the last needs a comma at the end
        'Pinkolol16': ['color'],
        'EmigaRaptor': ['raptor'],
        'DylanDylan54321': ['dylan'],
        'MarioMario543212': ['mm'],
        'SonicFan13': ['kazi'],
        'MarioFan5050': ['chris'],
        'LuigiLuigi573': ['ll']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator'];
 
// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:UserTags/code.js'          // User Rights Tags
    ]
});