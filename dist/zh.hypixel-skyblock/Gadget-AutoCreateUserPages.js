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

/* global mw, importArticles */

// settings
mw.loader.using('mediawiki.user').then(function () {
    if (mw.user.isAnon()) return;

    window.AutoCreateUserPagesConfig = window.AutoCreateUserPagesConfig || {
        content: {
            2: '{{Userpage Links|\n\
* [[Special:Mypage/Sandbox|我的沙盒]]\n\
* [[Special:Mypage/Drafts|我的原稿]]\n\
}}\n\
這是你的用家頁面，來加入關於你的資訊吧！\n\
\n\
== 最愛頁面 ==\n\
* 你最喜歡這個站的甚麼頁面？\n\
* 頁面 #1\n\
* 頁面 #2\n\
\n\
== 我的 SkyBlock 進程 ==\n\
* 我的線上名稱：\n\
* 我的主要武器：\n\
* 我的主要盔甲：',
        },
        summary: 'Auto Create Userpage',
        nesummary: 'Auto Null Edit for User',
        notify: '<b>已自動創建你的用家頁面！</b><br /><a href="/zh/wiki/User:$2">就去看看屬於你的頁面吧！</a>',
    };

    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:Gadget-AutoCreateUserPages/code.js',
        ],
    });
});