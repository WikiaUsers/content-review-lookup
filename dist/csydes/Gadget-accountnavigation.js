// <nowiki>
//Add extra AccountNav options
/*
 */
;(function() {
    if (navLinks) return;
    var user = mw.util.wikiUrlencode(mw.config.get('wgUserName')),
        links = {
        blogs: {
            text: 'My Blogs',
            url: '/wiki/User_blog:' + user
        },
        watchlist: {
            text: 'My Watchlist',
            url: '/wiki/Special:Watchlist'
        }
    },
        html = '',
        navLinks = true;
    for (var i in links) {
        html += '<li><a href="' + links[i].url + '" class="wds-global-navigation__dropdown-link">' + links[i].text + '</a></li>';
    }
    document.querySelector('.wds-global-navigation__user-menu .wds-list > li:nth-child(2)').insertAdjacentHTML('afterEnd', html);
})();
//
// </nowiki>