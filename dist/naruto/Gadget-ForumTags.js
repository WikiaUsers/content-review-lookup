jQuery(function($) {
    "use strict";

    // Tag users in the new forums
    // Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
    // by User:RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
    // this version by User:UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)

    var users = {
        // Tag all bureaucrats
        Dantman: 'Bureaucrat',
        Tranclan: 'Bureaucrat',

        // Tag all sysops
        UltimateSupreme: 'Sysop • Coder',
        Simant: 'Sysop • Coder',
        Ten_Tailed_Fox: 'Sysop',
        Jacce: 'Sysop',
        TheUltimate3: 'Sysop',
        Omnibender: 'Sysop',
        ShounenSuki: 'Sysop',
        Snapper2: 'Sysop',

        // Translators
        Seelentau: 'Translator',
        'FF-Suzaku': 'Translator',

        // Moderators (active only) - This would need some updating
        SuperSajuuk: 'Moderator',
        Elveonora: 'Moderator',
        WindStar7125: 'Moderator'
    };

    $.each(users, function(name, v) {
        $('<span class="ForumTags"></span>')
            .text('(' + v + ')')
            .insertAfter($('a.subtle[href$="User_talk:' + name.replace(/(["])/g, '\\$1') + '"]'));
    });
});