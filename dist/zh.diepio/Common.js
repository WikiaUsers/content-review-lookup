/* 標籤設置 */
window.UserTagsJS = {
    modules: {},
    tags: {
        /** 設定FANDOM所有職員的標籤，絕不可重新命名或是更改順序（order） **/
        staff   : { link: 'http://zh.diepio.wikia.com/w/使用說明:Fandom_Staff' }, //FANDOM職員
        vanguard: { link: 'http://zh.diepio.wikia.com/w/使用說明:先鋒'         }, //先鋒
        council : { link: 'http://zh.diepio.wikia.com/w/使用說明:社區委員會'   }, //委員
 
        /** 設定本地標籤，全部都可以被重新命名或是更改順序 **/
        founder : { u: '創建者'      , order: 100, link: 'http://zh.diepio.wikia.com/w/使用說明:創建者' },
        sysop   : { u: '伺服器清除者', order: 120, link: 'http://zh.diepio.wikia.com/w/Project:管理員'  },
        inactive: { u: '休假中'      , order: 300                                                       },
 
        /** 創建新標籤 **/
        inactivefounder: { u: '不活躍的創建者', order: 100, link: 'http://zh.diepio.wikia.com/w/使用說明:創建者' },
        engineer       : { u: '工程師'        , order: 200                                                       },
        translator     : { u: '翻譯員'        , order: 210                                                       },
        newsleader     : { u: '新聞部部長'    , order: 220, link: 'http://zh.diepio.wikia.com/wiki/User_blog:Zollo757347/新聞部首頁'},
        wikihelper     : { u: '中立魔王'      , order: 360, link: 'http://zh.diepio.wikia.com/w/Project:管理員'}
    }
};
 
/* 設定模組 */
UserTagsJS.modules.inactive = 30; //如果有用戶未編輯達30天，就會獲得此「休假中」標籤。若要刪除此功能，可將此行刪除或將變量設為false
UserTagsJS.modules.stopblocked = false; //此標籤會決定封禁用戶是否繼續擁有先前得到的標籤，true為是，false為否
 
/* 直接分配用戶標籤 */
UserTagsJS.modules.custom = {
    'Kurofox zero': ['translator'],
    'Ursuul'      : ['engineer'  ],
    'Zollo757347' : ['newsleader'],
    'Arras.i0'    : ['wikihelper'],
};
 
/* 禁止某些用戶頁面得顯示他擁有的標籤 */
UserTagsJS.modules.userfilter = {
    'The0warrier': [                   'bureaucrat'],
    'Zollo757347': ['sysop'          , 'bureaucrat'],
    'Arras.i0'   : ['threadmoderator', 'chatmoderator'],
    'AC0xRPFS001': [                   'bureaucrat']
};
 
/* 過濾 */
UserTagsJS.modules.metafilter = {
    'bureaucrat': ['founder', 'newsleader'], //禁止創建者與新聞部得到行政員標籤
    'sysop'     : ['founder',             ]  //禁止創建者得到管理員標籤
};
 
/* 當某些情況發生時合併兩種標籤為另一種標籤 */
UserTagsJS.modules.implode = {
    'inactivefounder': ['founder', 'inactive'], //當用戶同時擁有創建者與休假中標籤時，會將其合併為不活躍的創建者
};
 
/* 當某些情況發生時增加另一個標籤 */
/*UserTagsJS.modules.explode = {'engineer': ['vanguard', 'council']};*/
 
/*** 返回頁首功能 ***/
window.BackToTopText = "返回頁首";
 
/* 導入功能 */
importArticles({
    type: 'script',
    articles: [
        'u:diepio:Tournaments.js',
        'u:dev:MediaWiki:CreateSpecialPage/code.js',
        'u:dev:MediaWiki:SaveKey.js',
    ]
});

/****** Add-Rail Module ******/
window.AddRailModule = [
    {page: 'Template:DiscordRail', prepend: true},
    {page: 'Template:NewsRail',},
];