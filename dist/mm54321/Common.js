// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************
 
window.UserTagsJS = {
	modules: {},
	tags: {
                wikicoder: { u:'Wiki Coder' }, // each line except the last needs a comma at the end
                color: { u:'The Color Code Master' },
                raptor: { u:'Velociraptor' },
                dylan: { u:'EmBRACE' },
                mm: { u:'The Big Man' },
                kazi: { u:'Rahmen Noodles' },
                chris: { u:'Sushi Rolls'},
                ll : { u:'The Original Kiddy Stopper'},
                retired: { u:'RETIRED'}, 
                ks: { u:'Kiddy Stopper'}
	}
};
UserTagsJS.modules.custom = {
	'The Zog.': ['wikicoder', 'ks'],// each line except the last needs a comma at the end
        'Pinkolol16': ['color'],
        'EmigaRaptor': ['raptor'],
        'DylanDylan54321': ['dylan', 'ks', 'retired'],
        'MarioMario543212': ['mm'],
        'SonicFan13': ['kazi'] ['ks'],
        'MarioFan5050': ['chris', 'ks', 'retired'],
        'LuigiLuigi573': ['retired']
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