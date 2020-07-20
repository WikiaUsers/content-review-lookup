//Random Wiki BG
$(function RandomBkgnd() {
    var bkgndArray = new Array(); 
    bkgndArray[0] = 'https://vignette.wikia.nocookie.net/corpseparty/images/0/02/Background_wiki.png/revision/latest?cb=20160716195633';
    bkgndArray[1] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/59/Main_bg2.png/revision/latest?cb=20160512214615';
    bkgndArray[2] = 'https://vignette.wikia.nocookie.net/corpseparty/images/2/24/Main_bg.png/revision/latest?cb=20160508234542';
    bkgndArray[3] = 'https://vignette.wikia.nocookie.net/corpseparty/images/b/b3/Bg2.png/revision/latest?cb=20160716225551';
    bkgndArray[4] = 'https://vignette.wikia.nocookie.net/corpseparty/images/e/ee/Bg3.png/revision/latest?cb=20160716234900';
    bkgndArray[5] = 'https://vignette.wikia.nocookie.net/corpseparty/images/1/1e/Bg4.png/revision/latest?cb=20160717003739';
    bkgndArray[6] = 'https://vignette.wikia.nocookie.net/corpseparty/images/6/68/Bg5.png/revision/latest?cb=20160717044142';
    bkgndArray[7] = 'https://vignette.wikia.nocookie.net/corpseparty/images/7/77/Bg6.png/revision/latest?cb=20160717063010';
    bkgndArray[8] = 'https://vignette.wikia.nocookie.net/corpseparty/images/a/a9/Bg7.png/revision/latest?cb=20181024042321';
    bkgndArray[9] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/55/Chat_bg.png/revision/latest?cb=20160513030231';
  
    var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );

    $("section.WikiaPage").css("background",'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(' + bkgndArray[chosenBkgnd] + ') fixed no-repeat center');
});

importArticles({
    type: 'script',
    article: 'u:maxigamertest:MediaWiki:YoutubePlayer/code.js',
});

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    importScript('MediaWiki:Common.js/LinkImagePopup.js');
}

//InactiveUser
window.InactiveUsers = { months: 1 };

// Auto-refresh
window.ajaxRefresh = 30000;
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';