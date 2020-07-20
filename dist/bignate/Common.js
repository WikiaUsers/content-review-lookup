/* Any JavaScript here will be loaded for all users on every page load. */
 
(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
                    'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
                    'from localStorage to re-enable site-wide JavaScript.');
        return;
    }

/* Lock Forums */
window.LockForums = {
    disableOn: ['29793'],//Admins may use this field to unlock specific threads if necessary.
    expiryDays: 60,
    expiryMessage: 'This thread hasn’t been commented on for <actualDays> days. The discussion is over — there is no need to comment.',
    warningDays: 30,
    warningMessage: 'This thread is now <actualDays> days old. Please reply ONLY if a response is seriously needed.',
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: 'This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. If you feel this thread needs additional information, contact an administrator so they may unlock it if necessary.',
    warningBannerMessage: 'This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. Do not add to it unless it really needs a response.',
    expiryBannerStyle: 'stylesheet',
    warningBannerStyle: 'stylesheet',
    warningPopup: true,
    warningPopupMessage: 'Posting in an old thread can cause many users still following this thread to be spammed with notifications. Are you sure you want to do this?',
    boxHeight: 50
};//**/

window.UserTagsJS = {
    modules: {
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'chatmoderator',
            'threadmoderator',
            'rollback',
            'bot',
            'bot-global'
        ],
        metafilter: {
            sysop: ['bureaucrat'],
            'content-moderator': ['bureaucrat', 'sysop'], 
            chatmoderator: ['bureaucrat', 'sysop', 'content-moderator'],
            threadmoderator: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator'],
            rollback: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator', 'threadmoderator']
        },
        custom: {
            'Positive Elixir Trade': ['bureaucrat', 'administrator', 'admincrat'],
            'HereComeTheTurtles': ['content moderator', 'chat moderator', 'discussions moderator', 'rollback'],
            'MemeMachine1.0': ['content moderator', 'rollback'],
            'NL2022': ['content moderator', 'discussions moderator', 'rollback'],
            'TheAmazingCrafter': ['chat moderator','discussions moderator', 'rollback'],
            'FudgyGuy': ['discussions moderator', 'rollback']
        
        }
    }
};

/* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'MediaWiki:Common.js/Protection.js',
    ];

window.ArticleRating = {
  title: 'Rate This Article',
  values: ['Worst', 'Bad', 'Average', 'Good', 'Great'],
  starSize: [24, 24],
  starColor: ['#ccc', '#ffba01'],
  starStroke: '#000',
  exclude: ['Page A', 'Page B'],
  excludeCats: ['Category:A', 'Category:B'],
  location: 'bottom-page'
}