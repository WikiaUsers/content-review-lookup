/*****************************************************************************/
/****Any JavaScript here will be loaded for all users on every page load. ****/
/*****************************************************************************/


/*-------------- Import scripts ----------------*/
importArticles({
    type: 'script',
    articles: [ 
    "u:dev:Standard_Edit_Summary/code.js",  //edit summary drop down
    "w:c:dev:BackToTopButton/code.js",      //back to top button
    "w:c:dev:DisplayClock/code.js",         //display clock at top left corner
    "w:c:dev:ShowHide/code.js",             //collapsible table
    "MediaWiki:SoundManager2.js",
]});

/*----------------- Scrolling left/right ---------------------*/
$('.Left').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll-500},500);
});
$('.Right').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll+500},1000);
});