/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
                villain: { u:'Villain' },
                victim: { u:'Rescue Victim' },
                hero: { u: 'Hero', f: 'Heroine' },
        }
},
UserTagsJS.modules.custom = {
        'Guyus24': ['hero'],
        'PaulAgnew': ['villain'],
};
UserTagsJS.modules.mwGroups = ['founder', 'sysop'];


window.railWAM = {
    loadOnPage: 'Special:WikiActivity',
    logPage: 'Project:WAM Log',
    autoLogForUsers: 'Guyus24',
    showToAnons: 'false',
};

importArticles({
    type:'script',
    articles:[
        'w:c:dev:UserTags/code.js',
        'w:c:dev:ReferencePopups/code.js',
    ]
    
    });