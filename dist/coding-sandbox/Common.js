/* Any JavaScript here will be loaded for all users on every page load. 
/* Replace {{Username}} with the name of the user who is viewing the page.
Requires copying Template:Username. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{Username}} replacement */

/* Set custom usertags */
window.UserTagsJS = {
    modules: {},
    tags: {
        pd2: { u:'Payday 2 obsessive'},
        actop: { u:'Most active admin, probably'},
        scrub: { u:'Cheecky skrub'},
        lol: { u:'Is incapable of removing this tag'},
        axboi: { u:'Sorry, Ax Boi ran out of funny stuff to type here'},
        gwb: { u:'BUSH DID 9/11'},
    },
    oasisPlaceBefore: '',
};

/* Map custom tags to users */

UserTagsJS.modules.custom = {
  'AXBOIvsWIKIA': ['pd2'],
  'CyanSkull': ['actop'],
  'Ioprocessing': ['scrub'],
  'Geometry Dash gamer': ['lol'],
  'Giant Bubbles': ['axboi'],
  'Nusdan': ['gwb'],
};

/* Change colours of users according to permissions */
highlight = {
    selectAll: true,
    sysop: '#8A2BE2',
    threadmoderator: '#FF3838',
    users: {
 
    }
};

/* Finally, import articles */
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:PurgeButton/code.js',
    ]
});

/* Damn it Nusdan, notate your code */