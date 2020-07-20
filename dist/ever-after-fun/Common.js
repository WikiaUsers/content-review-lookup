/* Any JavaScript here will be loaded for all users on every page load. */

// All Javascript start!

/**** Javascript for Wiki Clock ****/
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

importArticles({
    type: "script",
    artciles: [
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js'
        'u:dev:LastEdited/code.js'
        'u:dev:DisplayClock/code.js'
        ]
        
});
        
window.lastEdited = {
    avatar: true
};

window.MessageWallUserTags = {
    tagColor:'#2dadfa';
    glow: true;
    glowSize:'15px';
    glowColor:'#2dadfa';
    users: {
        'Elsa of Arandelle': 'Headmistress',
        'SparklRosePONY22': 'Faculty Adviser',
        'Precious no-tribe': 'Teacher',
        'KittyCheshireCat': 'Former Teacher',
    }
};

window.UserTagJS = {
    modules: {}
    tags: {
        founder: {u: 'Headmistress'},
        bureaucrat: {u: 'Faculty Adviser'},
        sysop: {u: 'Teacher'},
        ravenqueen: {u: 'Raven Queen'},
        maddierooney: {u: 'Maddie Rooney'},
        pegasister: {u: 'Pegasister'},
    }
};

UserTagJS.modules.custom = {
    'Elsa of Arandelle': ['founder', 'ravenqueen', 'maddierooney', 'pegasister'],
    'SparklRosePONY22': ['bureaucrat'],
    'Precious no-tribe': ['sysop'],
};

UserTagJS.modules.mwGroups = ['bureaucrat', 'sysop', 'newuser'];
userTagJS.modules.metfilter = {
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['bureaucrat', 'founder', 'sysop'],
    rollback: ['founder', 'bureaucrat', 'sysop']
    newuser: ['bannedfromchat']
}

UserTagJS.modules.autoconfirmed = false;
UserTagJS.modules.isblocked = true;
UserTagJS.modules.inactive = 30; // Equivalent to a month

UserTagJS.modules.userfilter = 
{ 'Elsa of Arandelle' : ['bureaucrat'] //Take away the bureaucrat cuz I am the founder
};