/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});

window.MessageWallUserTags = {
    tagColor: 'purple',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Darthwikia': 'Coder',
        'Evul Robotnix': 'Bureaucrat',
        'Hungry Shark Evolution Helpline': 'Bureaucrat',
        'BaconMan1234': 'Bureaucrat',
        'FDrybob': 'Bureaucrat',
        'FireTail101': 'Chat moderator',
        'Armorchompy': 'Administrator',
        'Superproshark': 'Chat Moderator',
        'Firetail101': 'Chat Moderator'
    }
};

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
}

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = { modules: {}, 
tags: { bureaucrat: { u:'Bureaucrat Tag', link:'Project:Bureaucrats' }, 
inactive: { u: 'Has not edited recently' } } }; 

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chat moderator', 'bannedfromchat'];

importArticles({
    type: 'script',
    articles: [
	'u:dev:WallGreetingButton/code.js', //Adds Wall Greeting Edit Button
        'u:dev:Voice_Dictation/voice.js', //Adds Voice Dictation
        'MediaWiki:Common.js/StandardEditSummaries.js', //Adds Edit Summaries Dropdown
        'u:dev:DynamicImages/code.js', //Fixes GIFs in thumbnails
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:NullEditButton/code.js', //Adds a function like purging, but better
        'u:dev:AjaxRC/code.js', //Auto refreshes Wiki Activity and Recent Changes
        'w:c:dev:LockOldBlogs/code.js',
    ]
});