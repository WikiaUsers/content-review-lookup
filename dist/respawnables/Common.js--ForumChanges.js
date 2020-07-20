/* Any JavaScript here will be loaded for all users on every page load. */
jQuery(function($) {
    "use strict";
 
    // Tag users in the new forums
    // Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
 
    var users = {
        // Tag all bureaucrats
        Jacky_50A: 'Bureaucrat',
        Spooky_Rish: 'Bureaucrat',
        DocDoBig: 'Bureaucrat',
        Darkangel12S: 'Bureaucrat',
        Dan67: 'Bureaucrat',
        William_indonesian: 'Bureaucrat',
 
        // Administrators
        NoobxNoob: 'Admin',
        LordHazanator: 'Admin',
        Kumatora0203: 'Admin',
        Classified12: 'Admin',
        Aidanha: 'Admin',
        TheMCGamer: 'Admin',
        HazzaBuzz15: 'Admin',
        Bane64: 'Admin',
        Activerios: 'Admin',
        DivergenceKills: 'Admin',
        Agent_4T7: 'Admin',
        RebornDan: 'Admin',
        BlitzForever: 'Admin',
 
        // Moderators
        HulkSmashU: 'Moderator',
        Yarrrr: 'Moderator',
        Kishin(Bryan): 'Moderator'
    };
 
    $.each(users, function(name, v) {
        $('<span class="ForumTags"></span>')
            .text('(' + v + ')')
            .insertAfter($('a.subtle[href$="Message_Wall:' + name.replace(/(["])/g, '\\$1') + '"]'));
    });
});