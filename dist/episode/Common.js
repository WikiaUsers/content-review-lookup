//message block config
var MessageBlock = {
  title : 'Blockage',
  message : '{{Blocked boilerplate|$2|$1}}',
  autocheck : true
};

//ajax rc config
window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
//script imports
window.importArticles( {
    type: 'script',
    articles: [
 
 
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MessageBlock/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:AjaxRC/code.js',
        'u:admintools:MediaWiki:Common.js/SvgToPng.js',
    ]
} );