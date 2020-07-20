// Spoiler sctipt. Taken from [[w:c:boombeach]] Wiki. Thanks!
(function($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
            'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
            'from localStorage to re-enable site-wide JavaScript.');
        return;
    }
 
    window.UserTagsJS = {
        modules: {},
        tags: {}
    };
 
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = [
        'bureaucrat',
        'chatmoderator',
        'patroller',
        'rollback',
        'sysop',
        'bannedfromchat',
        'bot',
        'bot-global',
    ];
 
    UserTagsJS.modules.metafilter = {
        sysop: ['bureaucrat', 'founder'],
        bureaucrat: ['founder'],
        chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat']
    };
 
    window.SpoilerAlert = {
        question: 'Командир! Эта статья содержит секретную информацию! Вы уверены, что ' +
            'хотите войти?',
        yes: 'Да, пожалуйста.',
        no: 'Нет, пусть это будет сюрпризом',
        isSpoiler: function() {
            return (-1 !== wgCategories.indexOf('Spoiler') &&
                Boolean($('.spoiler').length));
        }
    };
 
}(jQuery, mediaWiki, window.localStorage));