/* jshint
    esversion: 5, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    sub: true, forin: false,
    -W082, -W084
*/

/* global mw, BannerNotification */

// settings
mw.loader.using('mediawiki.user').then(function () {
    if (mw.user.isAnon()) return;

    window.AutoCreateUserPagesConfig = window.AutoCreateUserPagesConfig || {
        content: {
            2: '{{Userpage Links|\n\
*[[Special:Mypage/Sandbox|My Sandbox]]\n\
*[[Special:Mypage/Drafts|Drafts]]\n\
*[[Special:Mypage/Quick Copy|Quick Copy]]\n\
}}\n\
This is your user page. Please edit this page to tell the community about yourself!\n\
\n\
== My favorite pages ==\n\
* Add links to your favorite pages on the wiki here!\n\
* Favorite page #2\n\
* Favorite page #3\n\
\n\
== My Skyblock Progress ==\n\
*In-game Name: Add Your In-game name Here!\n\
*Weapon: add your weapon(s) here!\n\
*Armor: Add your Armor Here!',
        },
        summary: 'Auto Create Userpage',
        nesummary: 'Auto Null Edit for User',
        notify: '<b>User pages successfully created</b><br /><a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>',
    };

    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:Gadget-AutoCreateUserPages/code.js',
        ],
    });
});