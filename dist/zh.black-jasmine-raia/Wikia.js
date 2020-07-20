// Ajax auto-refresh
window.ajaxPages = [
    '特殊:近期變動',
    '特殊:WikiActivity',
    '特殊:用戶貢獻'
];

window.AjaxRCRefreshText = 'Auto-refresh';
// END Ajax auto-refresh

// Last edit details on articles
window.lastEdited = {
    avatar: true,
    size: true,
    diff: true,
    comment: true,
    position: {
        element: document.getElementById('WikiaArticle'),
        method: 'prepend'
    },
    time: 'timestamp',
    lang: 'zh-tw',
    namespaces: {
        include: [],
        exclude: ["User_blog", "User_blog_comment"]
    },
    pages: ["紅眼意外調查數據庫"]
};
// END Last edit details on articles
 
window.railWAM = {
    logPage:"Project:WAM Log",
    lang: 'zh-tw',
};

// Display 12 hour time followed by "(UTC)" and YYYY/MM/DD
window.DisplayClockJS = {
    format: '%2I:%2M:%2S%p (UTC) %Y年%B%2d日',
    location: 'toolbar',
    interval: 500,
    monofonts: 'Consolas, monospace'
};