/* Ajax Auto-Refresh (courtesy pcj) */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
/* Ajax Auto-Refresh (courtesy pcj) */
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';

function randomBack () {
    var opts = [
        'https://i.imgur.com/9vf0Pki.jpg',
        'https://i.imgur.com/3jiqzwU.jpg',
        'https://i.imgur.com/lc0dY5j.jpg',
        'https://i.imgur.com/6k8XXPk.jpg',
        'https://i.imgur.com/IKxietN.jpg',
        'https://i.imgur.com/9vf0Pki.jpg',
        'https://i.imgur.com/04dy11B.jpg',
        ];
 
    if (wgPageName=='Main_Page') {
        $('body').css('background-image','url(' + opts[0] + ')');
        $('body').css('background-size','105%'); //for the DS3 background to look better
    }
    else
        $('body').css('background-image','url(' + opts[Math.floor((opts.length-1)*Math.random()+1)] + ')'); //remove +1 to include first element of the array
}
 
randomBack();