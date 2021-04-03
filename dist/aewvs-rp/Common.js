/* Any JavaScript here will be loaded for all users on every page load. */
//Usertags
window.UserTagsJS={
    modules:{},
    tags:{
        founder: {u:'The Creator'},
        bureaucrat: {u: 'Bearer of 1000 eyes'},
        sysop: {u: 'Administrator'},
        chatmoderator: {u: 'Chat Mod'},
        rollback: {u:'Rollbacker'},
        blocked: {u: 'Killed by VILE'},
        inactive: {u: 'Inactive'},
        newuser: {u: 'New Editor'},
        leader: {u: 'Viktor'},
        developer: {u:'Game Developer'},
        contributor: {u: 'Helper'},
        guard: {u: 'Principal'},
        novice: {u: 'Beginner'},
        unstoppable: {u:'Unstoppable'},
        gone: {u: 'Gone but not forgotten'},
        montheditor: {u: 'Editor of the month'},
        featured: {u:'Featured'},
        templates: {u:'Templates Moderator'},
        leadadmin: {u:'Head Sysop'},
        contlead: {u:'Content Manager'},
        disclead: {u:'Head Guard'},
        patroller: {u:'Vandalism Prevention Team'},
        moderator: {u:'General Moderator'}
        quality: {u:'Games Master'}
        }
    };
    UserTagsJS.modules.custom= {
        'AEwVS RP Wiki Official': ['leadadmin''leader','developer', 'contributor','quality','guard','unstoppable','novice','featured','templates','gone']
;    UserTagsJS.modules.implode= {        'moderator':['content-moderator', 'threadmoderator', 'chatmoderator']
        
        
            
;        
};   UserTagsJS.modules.newuser=10;

     UserTagsJS.modules.inactive=500;
    };
/*Social Network Icons*/
$('.WikiaRail').prepend(<div style="position: absolute; margin-top:42px" )
/*Block Message */
window.MessageBlock={
 title: ‘Blocked’,
 message: ‘You have been blocked from AEwVS RP Wiki because you have violated one or more of the wiki’s rules. You may appeal by asking one of the wiki’s admins on Community Central, or you can reply to this message.’
};

// Anonymous users
window.RevealAnonIP={
 permissions: [‘sysop’,’bureaucrat’,‘moderator’]
};