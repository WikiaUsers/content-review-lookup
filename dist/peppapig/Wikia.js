/* Auto-refreshing recent changes */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.UserTagsJS = {
    tags: {
        a: { u: 'Editor of the Month', order: 1 },
        b: { order: 2, link: 'Project:Bureaucrats' },
        c: { order: 3, link: 'Project:Administrators' },
        d: { order: 4 },
        e: { order: 5 },
        f: { order: 6 },
        g: { order: 7 },
        h: { u: 'Banned from visiting Peppa', order: 8 },
        i: { u: 'JavaScript', order: 100 },
        j: { u: 'CSS', order: 101 },
        k: { u: 'Templates', order: 102 }
    },
    oasisPlaceBefore: '> h1'
};